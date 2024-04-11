const sql = require('mssql');

const config = {
  user: 'SA',
  password: 'Mdpsecurise12.',
  server: 'localhost',
  database: 'Cesiveroo',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

const commandeSchema = {
  CommandeID: sql.UniqueIdentifier,
  ClientID: sql.NVarChar(36),
  LivreurID: sql.NVarChar(36),
  RestaurantID: sql.NVarChar(36),
  status: sql.NVarChar(50),
  orderDate: sql.DateTime,
  deliveryDate: sql.DateTime,
  adressDelivery: sql.NVarChar(50),
  price: sql.Decimal(10, 2)
};

const Commande = {
  tableName: 'Commandes',
  columns: Object.keys(commandeSchema).map(key => commandeSchema[key])
};

// Insérer une nouvelle commande
Commande.createCommande = async (commandeData) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('ClientID', sql.NVarChar, commandeData.ClientID)
      .input('RestaurantID', sql.NVarChar, commandeData.RestaurantID)
      .input('status', sql.NVarChar, "Waiting for validation")
      .input('orderDate', sql.DateTime, new Date())
      .input('deliveryDate', sql.DateTime, null)
      .input('adressDelivery', sql.NVarChar, commandeData.adressDelivery)
      .input('price', sql.Decimal, commandeData.price)
      .query(`INSERT INTO ${Commande.tableName} (ClientID, RestaurantID, status, orderDate, deliveryDate, adressDelivery, price) 
                    VALUES (@ClientID, @RestaurantID, @status, @orderDate, @deliveryDate, @adressDelivery, @price); 
                    SELECT SCOPE_IDENTITY() as CommandeID;`);
    return { CommandeID: result.recordset[0].CommandeID, ...commandeData };
  } catch (err) {
    console.error(err);
    throw err;
  }
};


// Récupérer toutes les commandes
Commande.getAllCommandes = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM ${Commande.tableName}`);
    return result.recordset;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Ajouter un article à une commande
Commande.addArticleToCommande = async (CommandeID, ArticleID, Quantity) => {
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('CommandeID', sql.UniqueIdentifier, CommandeID)
      .input('ArticleID', sql.Int, ArticleID)
      .input('Quantity', sql.Int, Quantity)
      .query(`INSERT INTO CommandeArticles (CommandeID, ArticleID, Quantity) VALUES (@CommandeID, @ArticleID, @Quantity)`);
    return { success: true };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Ajouter un menu à une commande
Commande.addMenuToCommande = async (CommandeID, MenuID, Quantity) => {
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('CommandeID', sql.UniqueIdentifier, CommandeID)
      .input('MenuID', sql.Int, MenuID)
      .input('Quantity', sql.Int, Quantity)
      .query(`INSERT INTO CommandeMenus (CommandeID, MenuID, Quantity) VALUES (@CommandeID, @MenuID, @Quantity)`);
    return { success: true };
  } catch (err) {
    console.error(err);
    throw err;
  }
};



module.exports = Commande;
