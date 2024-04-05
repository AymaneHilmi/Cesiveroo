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
// Définition du schéma du Article
const articleSchema = {
  restaurantId: {
    type: sql.NVarChar,
    required: true
  },
  name: {
    type: sql.NVarChar,
    required: true
  },
  ingredients: {
    type: sql.NVarChar,
    required: true
  },
  price: {
    type: sql.Decimal(10, 2),
    required: true
  },
};

// Définition du modèle SQL
const Article = {
  tableName: 'Articles',
  columns: Object.keys(articleSchema).join(','),
};

// Fonction pour insérer un article dans la base de données
Article.create = async (articleData) => {
  try {
    const keys = Object.keys(articleData).join(',');
    const values = Object.values(articleData).map(val => typeof val === 'string' ? `'${val}'` : val).join(',');
    const query = `INSERT INTO ${Article.tableName} (${keys}) VALUES (${values})`;
    const pool = await sql.connect(config);
    await pool.request().query(query);
  } catch (err) {
    throw new Error(err.message);
  }
};

// Fonction pour récupérer un Article par son email depuis la base de données
Article.getByEmail = async (email) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM ${Article.tableName} WHERE email = '${email}'`);
    return result.recordset[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

// Export du modèle
module.exports = Article;