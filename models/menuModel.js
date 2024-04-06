const sql = require('mssql');
// Connexion à SQL Server
const config = {
  user: 'SA', // Nom d'utilisateur de la base de données
  password: 'Mdpsecurise12.', // Mot de passe de la base de données
  server: 'localhost', // Adresse du serveur SQL
  port: 1433, // Port de la base de données
  database: 'Cesiveroo', // Nom de la base de données
  encrypt: false, // Désactivation du cryptage, à adapter en fonction de vos besoins de sécurité
};
// Définition du schéma du Menu
const menuSchema = {
  restaurantId: {
    type: sql.NVarChar,
    required: true
  },
  name: {
    type: sql.NVarChar,
    required: true
  },
  price: {
    type: sql.Decimal(10, 2),
    required: true
  },
};

// Définition du modèle SQL
const Menu = {
  tableName: 'Menus',
  columns: Object.keys(menuSchema).join(','),
};

// Fonction pour insérer un menu dans la base de données
Menu.create = async ({ restaurantId, name, price }) => {
  try {
    // Create a new connection pool
    const pool = await sql.connect(config);

    // Create a new request
    const request = pool.request();

    // Add input parameters to the request
    request.input('restaurantId', sql.NVarChar, restaurantId);
    request.input('name', sql.NVarChar, name);
    request.input('price', sql.Decimal(10, 2), price);

    // Execute the insert query using template literals
    const result = await request.query(`
            INSERT INTO ${Menu.tableName} (RestaurantID, Name, Price)
            OUTPUT Inserted.MenuID, Inserted.RestaurantID, Inserted.Name, Inserted.Price
            VALUES (@restaurantId, @name, @price)
        `);

    // Return the inserted menu with the new MenuID
    return result.recordset[0];
  } catch (err) {
    throw new Error(err.message);
  } finally {
    sql.close();
  }
};

Menu.addArticleToMenu = async (menuId, articleId) => {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();

    // Vérifiez d'abord que le MenuID et l'ArticleID appartiennent au même restaurant
    const checkQuery = `
      SELECT m.RestaurantID AS MenuRestaurantID, a.RestaurantID AS ArticleRestaurantID
      FROM Menus m
      INNER JOIN Articles a ON m.RestaurantID = a.RestaurantID
      WHERE m.MenuID = @menuId AND a.ArticleID = @articleId
    `;

    // Ajoutez les paramètres d'entrée pour la vérification
    request.input('menuId', sql.Int, menuId);
    request.input('articleId', sql.Int, articleId);

    // Exécutez la vérification
    const checkResult = await request.query(checkQuery);

    // Si aucun résultat n'est retourné ou si les IDs de restaurant ne correspondent pas, interrompez l'opération
    if (!checkResult.recordset.length || checkResult.recordset[0].MenuRestaurantID !== checkResult.recordset[0].ArticleRestaurantID) {
      return false; // ou lancez une exception ou retournez une erreur spécifique
    }

    // Exécutez la requête d'insertion uniquement si la vérification est passée
    const insertQuery = `
      INSERT INTO ArticlesMenus (MenuID, ArticleID)
      VALUES (@menuId, @articleId)
    `;

    const insertResult = await request.query(insertQuery);

    // Si l'insertion est réussie, retournez true ou l'objet résultant
    return insertResult.rowsAffected[0] > 0;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    sql.close();
  }
};


Menu.getArticlesOfMenu = async (menuId) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT a.* FROM Articles a INNER JOIN ArticlesMenus am ON a.ArticleID = am.ArticleID WHERE am.MenuID = ${menuId}`;
    return result.recordset; // Retourne tous les articles correspondant
  } catch (err) {
    throw new Error(err.message);
  }
};

// Export du modèle
module.exports = Menu;