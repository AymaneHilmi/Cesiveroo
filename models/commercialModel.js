const sql = require('mssql');

// Connexion à SQL Server
const config
    = {
        user: 'SA', // Nom d'utilisateur de la base de données
        password : 'Mdpsecurise12.', // Mot de passe de la base de données
        server : 'localhost', // Adresse du serveur SQL
        port : 1433, // Port de la base de données
        database : 'Cesiveroo', // Nom de la base de données
        encrypt : false, // Désactivation du cryptage, à adapter en fonction de vos besoins de sécurité
    };

// Définition du schéma du service commercial
const commercialSchema = {
    name : {
        type : sql.NVarChar,
        required : true,
    },
    email : {
        type : sql.NVarChar,
        required : true,
    },
    phone : {
        type : sql.NVarChar,
        required : true,
    },
    password : {
        type : sql.NVarChar,
        required : true,
    },
};

// Définition du modèle SQL
const Commercial = {
    tableName : 'Commercials',
    columns : Object.keys(commercialSchema).join(','),
};

// Fonction pour insérer un service commercial dans la base de données
Commercial.create = async (commercialData) => {
    try {
        const keys = Object.keys(commercialData).join(',');
        const values = Object.values(commercialData).map(val => typeof val === 'string' ? `'${val}'` : val).join(',');
        const query = `INSERT INTO ${Commercial.tableName} (${keys}) VALUES (${values})`;

        await sql.query(query);
    } catch (err) {
        console.error('Error creating commercial:', err);
    }
};

// Fonction pour récuperer un client dans la base de données
Commercial.get = async (id) => {
    try {
        const query = `SELECT * FROM ${Client.tableName} WHERE id = ${id}`;
        const result = await sql.query(query);

        return result.recordset[0];
    } catch (err) {
        console.error('Error getting commercial:', err);
    }
};

module.exports = Commercial;
