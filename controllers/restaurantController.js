const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');
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
exports.getAllRestaurants = async (req, res) => {
  try {
    const query = 'SELECT * FROM Restaurants';
    const clients = await executeQuery(query);
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un client par son ID
exports.getRestaurantById = async (req, res) => {
  try {
    const query = `SELECT * FROM Restaurants WHERE RestaurantID = ${req.params.id}`;
    const client = await executeQuery(query);
    if (!client[0]) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(client[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un nouveau restaurant avec UUID
exports.createRestaurant = async (req, res) => {
  try {
    const { name, email, phone, streetNumber, streetName, city, postalCode, bankInfo } = req.body;
    const RestaurantID = uuidv4();
    const query = `
      INSERT INTO Restaurants (RestaurantID, name, email, phone, streetNumber, streetName, city, postalCode, bankInfo) 
      VALUES ('${RestaurantID}', '${name}', '${email}', '${phone}', '${streetNumber}', '${streetName}', '${city}', '${postalCode}', '${bankInfo}')`;
    await executeQuery(query);
    res.status(201).json({ id: RestaurantID, name, email, phone, address: { streetNumber, streetName, city, postalCode } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Mettre à jour un client
exports.updateRestaurant = async (req, res) => {
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
exports.deleteRestaurant = async (req, res) => {
  try {
    const query = `DELETE FROM Clients WHERE ClientID = ${req.params.id}`;
    await executeQuery(query);
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};