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

// Définition du modèle SQL
const Article = {
  tableName: 'Articles',
  columns: ['restaurantId', 'name', 'ingredients', 'price'],
};


// Fonction pour insérer un article dans la base de données
Article.create = async (articleData) => {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();
    await request.input('restaurantId', sql.NVarChar, articleData.restaurantId);
    await request.input('name', sql.NVarChar, articleData.name);
    await request.input('ingredients', sql.NVarChar, articleData.ingredients);
    await request.input('price', sql.Decimal(10, 2), articleData.price);
    const query = `INSERT INTO ${Article.tableName} (restaurantId, name, ingredients, price) 
                   VALUES (@restaurantId, @name, @ingredients, @price)`;
    await request.query(query);
  } catch (err) {
    throw new Error('Erreur lors de la création de l\'article : ' + err.message);
  }
};

// Fonction pour récupérer tous les articles depuis la base de données
Article.getAll = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM ${Article.tableName}`);
    return result.recordset;
  } catch (err) {
    throw new Error('Erreur lors de la récupération des articles : ' + err.message);
  }
};

// Fonction pour récupérer un article par son ID depuis la base de données
Article.getById = async (id) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().input('id', sql.Int, id).query(`SELECT * FROM ${Article.tableName} WHERE id = @id`);
    return result.recordset[0];
  } catch (err) {
    throw new Error('Erreur lors de la récupération de l\'article : ' + err.message);
  }
};


// Export du modèle
module.exports = Article;