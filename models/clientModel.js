const sql = require('mssql');

// Définition du schéma du client
const clientSchema = {
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
};

// Définition du modèle SQL
const Client = {
  tableName: 'Clients',
  columns: Object.keys(clientSchema).join(','),
};

// Fonction pour insérer un client dans la base de données
Client.create = async (clientData) => {
  try {
    const keys = Object.keys(clientData).join(',');
    const values = Object.values(clientData).map(val => typeof val === 'string' ? `'${val}'` : val).join(',');
    const query = `INSERT INTO ${Client.tableName} (${keys}) VALUES (${values})`;
    const pool = await sql.connect(config);
    await pool.request().query(query);
  } catch (err) {
    throw new Error(err.message);
  }
};

// Export du modèle
module.exports = Client;
