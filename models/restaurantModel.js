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

// Définition du schéma du Restaurant
const restaurantSchema = {
  name: {
    type: sql.NVarChar,
    required: true
  },
  email: {
    type: sql.NVarChar,
    required: true
  },
  phone: {
    type: sql.NVarChar,
    required: true
  },
  address: {
    streetNumber: {
      type: sql.NVarChar,
      required: true,
    },
    streetName: {
      type: sql.NVarChar,
      required: true,
    },
    city: {
      type: sql.NVarChar,
      required: true,
    },
    postalCode: {
      type: sql.NVarChar,
      required: true,
    },
  },
    bankInfo: {
      type: sql.NVarChar,
      required: true,
    },
    password: {
      type: sql.NVarChar,
      required: true
    }
};

// Définition du modèle SQL
const Restaurant = {
  tableName: 'Restaurants',
  columns: Object.keys(restaurantSchema).join(','),
};

// Fonction pour insérer un client dans la base de données
Restaurant.create = async (restaurantData) => {
  try {
    const keys = Object.keys(restaurantData).join(',');
    const values = Object.values(restaurantData).map(val => typeof val === 'string' ? `'${val}'` : val).join(',');
    const query = `INSERT INTO ${Restaurant.tableName} (${keys}) VALUES (${values})`;
    const pool = await sql.connect(config);
    await pool.request().query(query);
  } catch (err) {
    throw new Error(err.message);
  }
};

// Fonction pour récupérer un client par son email depuis la base de données
Restaurant.getByEmail = async (email) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM ${Restaurant.tableName} WHERE email = '${email}'`);
    return result.recordset[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

// Export du modèle
module.exports = Restaurant;
