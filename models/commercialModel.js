const sql = require('mssql');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// Configuration de connexion à SQL Server
const config = {
  user: 'SA',
  password: 'Mdpsecurise12.',
  server: 'localhost',
  port: 1433,
  database: 'Cesiveroo',
  encrypt: false,
};

// Modèle SQL pour les comptes commerciaux
const Commercial = {
  tableName: 'ServiceCommercial',
  columns: ['CommercialID', 'name', 'email', 'hashedPassword'],
};

// Fonction pour insérer un nouveau compte commercial dans la base de données
Commercial.create = async (commercialData) => {
  try {
    // Hasher le mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(commercialData.password, 10);
    const commercialId = uuidv4();
    const { name, email, phone, companyName } = commercialData;
    const pool = await sql.connect(config);
    const request = pool.request();
    // Préparer la requête SQL avec les paramètres
    await request.input('commercialId', sql.UniqueIdentifier, commercialId);
    await request.input('name', sql.NVarChar, name);
    await request.input('email', sql.NVarChar, email);
    await request.input('hashedPassword', sql.NVarChar, hashedPassword);
    const query = `INSERT INTO ${Commercial.tableName} (CommercialID, name, email, hashedPassword) 
                   VALUES (@commercialId, @name, @email, @hashedPassword)`;
    // Exécuter la requête SQL
    await request.query(query);
  } catch (err) {
    throw new Error(err.message);
  }
};

// Fonction pour récupérer un compte commercial par son email depuis la base de données
Commercial.getByEmail = async (email) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().input('email', sql.NVarChar, email).query(`SELECT * FROM ${Commercial.tableName} WHERE email = @email`);
    return result.recordset[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

// Fonction pour vérifier le mot de passe d'un compte commercial
Commercial.verifyPassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    throw new Error(err.message);
  }
};

// Export du modèle
module.exports = Commercial;
