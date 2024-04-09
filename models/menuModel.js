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


// Définition du modèle SQL
const Menu = {
  tableName: 'Menus',
  columns: ['MenuID', 'RestaurantID', 'Name', 'Price'],
};


// Fonction pour insérer un menu dans la base de données
Menu.create = async (menuData) => {
  try {
    const menuId = uuidv4();
    const { restaurantId, name, price } = menuData;
    const pool = await sql.connect(config);
    const request = pool.request();
    await request.input('MenuID', sql.UniqueIdentifier, menuId);
    await request.input('RestaurantID', sql.NVarChar, restaurantId);
    await request.input('Name', sql.NVarChar, name);
    await request.input('Price', sql.Decimal(10, 2), price);
    const query = `INSERT INTO ${Menu.tableName} (MenuID, RestaurantID, Name, Price)
                    VALUES (@MenuID, @RestaurantID, @Name, @Price)`;
    await request.query(query);
  } catch (err) {
    throw new Error(err.message);
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