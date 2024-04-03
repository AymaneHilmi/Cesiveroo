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

// Fonction pour exécuter les requêtes SQL
async function executeQuery(query) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Récupérer tous les clients
exports.getAllClients = async (req, res) => {
  try {
    const query = 'SELECT * FROM Clients';
    const clients = await executeQuery(query);
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un client par son ID
exports.getClientById = async (req, res) => {
  try {
    const query = `SELECT * FROM Clients WHERE ClientID = ${req.params.id}`;
    const client = await executeQuery(query);
    if (!client[0]) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json(client[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un nouveau client
exports.createClient = async (req, res) => {
  try {
    const { name, email, phone, streetNumber, streetName, city, postalCode } = req.body;
    const query = `
      INSERT INTO Clients (name, email, phone, streetNumber, streetName, city, postalCode) 
      OUTPUT INSERTED.ClientID
      VALUES ('${name}', '${email}', '${phone}', '${streetNumber}', '${streetName}', '${city}', '${postalCode}')`;
    const result = await executeQuery(query);
    const newClientId = result[0].ClientID; // Récupère l'identifiant d'insertion à partir de la première ligne du résultat
    res.status(201).json({ id: newClientId, name, email, phone, address: { streetNumber, streetName, city, postalCode } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// Mettre à jour un client
exports.updateClient = async (req, res) => {
  try {
    const { name, email, phone, streetNumber, streetName, city, postalCode } = req.body;
    const query = `
      UPDATE Clients
      SET name = '${name}', email = '${email}', phone = '${phone}', 
          streetNumber = '${streetNumber}', streetName = '${streetName}', city = '${city}', postalCode = '${postalCode}' 
      WHERE ClientID = ${req.params.id}`;
    await executeQuery(query);
    res.status(200).json({ id: req.params.id, name, email, phone, address: { streetNumber, streetName, city, postalCode } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un client
exports.deleteClient = async (req, res) => {
  try {
    const query = `DELETE FROM Clients WHERE ClientID = ${req.params.id}`;
    await executeQuery(query);
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};