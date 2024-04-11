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
const ArticlesMenus = {
    tableName: 'ArticlesMenus',
    columns: ['ArticleID', 'MenuID'],
};

ArticlesMenus.create = async (articleMenuData) => {
    try {
        const pool = await sql.connect(config);
        const request = pool.request();
        // Incrémenter automatiquement pour la valeur de ArticleID
        await request.input('ArticleID', sql.Int, articleMenuData.ArticleID);
        await request.input('MenuID', sql.Int, articleMenuData.MenuID);
        await request.query(`INSERT INTO ${ArticlesMenus.tableName} (ArticleID, MenuID) VALUES (@ArticleID, @MenuID)`);
    }
    catch (err) {
        throw new Error('Erreur lors de la création de l\'article : ' + err.message);
    }
}

// Récupérer tous les articles associés à un menu
exports.getArticlesByMenu = async (menuId) => {
    try {
        const pool = await sql.connect(config);
        const articles = await pool.request()
            .input('menuId', sql.Int, menuId)
            .query(`SELECT * FROM ${ArticlesMenus.tableName} WHERE MenuID = @menuId`);
        return articles.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Créer une nouvelle association entre un article et un menu
exports.createArticlesMenus = async (articleId, menuId) => {
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('articleId', sql.Int, articleId)
            .input('menuId', sql.Int, menuId)
            .query(`INSERT INTO ${ArticlesMenus.tableName} (ArticleID, MenuID) VALUES (@articleId, @menuId)`);
        return true;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Supprimer une association entre un article et un menu
exports.deleteArticlesMenus = async (articleId, menuId) => {
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('articleId', sql.Int, articleId)
            .input('menuId', sql.Int, menuId)
            .query(`DELETE FROM ${ArticlesMenus.tableName} WHERE ArticleID = @articleId AND MenuID = @menuId`);
        return true;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Mettre à jour une association entre un article et un menu
exports.updateArticlesMenus = async (articleId, menuId, newData) => {
    try {
        const pool = await sql.connect(config);
        const query = `UPDATE ${ArticlesMenus.tableName} SET ${newData} WHERE ArticleID = ${articleId} AND MenuID = ${menuId}`;
        await pool.request().query(query);
        return true;
    } catch (err) {
        throw new Error(err.message);
    }
};
