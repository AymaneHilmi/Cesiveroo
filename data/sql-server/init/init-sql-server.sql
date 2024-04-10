-- Check if the database exists and create it if it doesn't
IF NOT EXISTS(SELECT name FROM master.sys.databases WHERE name = 'Cesiveroo')
BEGIN
    CREATE DATABASE Cesiveroo;
    PRINT 'La base de données Cesiveroo a été créée.';
END
ELSE
BEGIN
    PRINT 'La base de données Cesiveroo existe déjà.';
END
GO

USE Cesiveroo
GO

-- Création de la table Service Commercial
IF OBJECT_ID('ServiceCommercial', 'U') IS NULL
BEGIN
    CREATE TABLE ServiceCommercial (
        CommercialID NVARCHAR(36) PRIMARY KEY,
        name NVARCHAR(100),
        email NVARCHAR(100),
        hashedPassword NVARCHAR(255)
    );
    PRINT 'La table ServiceCommercial a été créée avec succès.';
END
-- Création de la table Clients avec détail d'adresse
IF OBJECT_ID('Clients', 'U') IS NULL
BEGIN
    CREATE TABLE Clients (
        -- ClientID is an UUID
        ClientID NVARCHAR(36) PRIMARY KEY,
        name NVARCHAR(100),
        email NVARCHAR(100),
        phone NVARCHAR(50),
        streetNumber NVARCHAR(10),
        streetName NVARCHAR(255),
        city NVARCHAR(100),
        postalCode NVARCHAR(20),
        hashedPassword NVARCHAR(255), 
        imgPath NVARCHAR(255),
        status NVARCHAR(20)
    );
    PRINT 'La table Clients a été créée avec succès.';
END
GO

-- Création de la table Livreurs avec détail d'adresse
IF OBJECT_ID('Livreurs', 'U') IS NULL
BEGIN
    CREATE TABLE Livreurs (
        LivreurID NVARCHAR(36) PRIMARY KEY,
        name NVARCHAR(100),
        email NVARCHAR(100),
        phone NVARCHAR(50),
        streetNumber NVARCHAR(10),
        streetName NVARCHAR(255),
        city NVARCHAR(100),
        postalCode NVARCHAR(20),
        bankInfo NVARCHAR(255),
        hashedPassword NVARCHAR(255)
    );
    PRINT 'La table Livreurs a été créée avec succès.';
END
GO

-- Création de la table Restaurants avec détail d'adresse et informations bancaires
IF OBJECT_ID('Restaurants', 'U') IS NULL
BEGIN
    CREATE TABLE Restaurants (
        RestaurantID NVARCHAR(36) PRIMARY KEY,
        name NVARCHAR(100),
        email NVARCHAR(100),
        phone NVARCHAR(50),
        streetNumber NVARCHAR(10),
        streetName NVARCHAR(255),
        city NVARCHAR(100),
        postalCode NVARCHAR(20),
        bankInfo NVARCHAR(255),
        hashedPassword NVARCHAR(255)
    );
    PRINT 'La table Restaurants a été créée avec succès.';
END
GO

-- Création de la table Articles
IF OBJECT_ID('Articles', 'U') IS NULL
BEGIN
    CREATE TABLE Articles (
        ArticleID INT PRIMARY KEY IDENTITY(1,1), -- Définit la colonne ArticleID comme auto-increment
        RestaurantID NVARCHAR(36),
        Name NVARCHAR(100),
        Ingredients NVARCHAR(255),
        Price DECIMAL(10, 2),
        FOREIGN KEY (RestaurantID) REFERENCES Restaurants(RestaurantID)
    );
    PRINT 'La table Articles a été créée avec succès.';
END

-- Création de la table Commandes
IF OBJECT_ID('Commandes', 'U') IS NULL
BEGIN
    CREATE TABLE Commandes (
        CommandeID INT PRIMARY KEY IDENTITY(1,1),
        ClientID NVARCHAR(36),
        LivreurID NVARCHAR(36),
        status NVARCHAR(50),
        orderDate DATETIME,
        deliveryDate DATETIME,
        price DECIMAL(10, 2),
        FOREIGN KEY (ClientID) REFERENCES Clients(ClientID),
        FOREIGN KEY (LivreurID) REFERENCES Livreurs(LivreurID)
    );
    PRINT 'La table Commandes a été créée avec succès.';
END
GO

-- Création de la table Menus
IF OBJECT_ID('Menus', 'U') IS NULL
BEGIN
    CREATE TABLE Menus (
        MenuID INT PRIMARY KEY IDENTITY(1,1),
        RestaurantID NVARCHAR(36),
        name NVARCHAR(100),
        price DECIMAL(10, 2),
    );
    PRINT 'La table Menus a été créée avec succès.';
END
GO

-- Création de la table ArticlesMenus pour gérer les associations entre les menus et les articles
IF OBJECT_ID('ArticlesMenus', 'U') IS NULL
BEGIN
    CREATE TABLE ArticlesMenus (
        MenuID INT,
        ArticleID INT,
        PRIMARY KEY (MenuID, ArticleID),
        FOREIGN KEY (MenuID) REFERENCES Menus(MenuID),
        FOREIGN KEY (ArticleID) REFERENCES Articles(ArticleID)
    );
    PRINT 'La table ArticlesMenus a été créée avec succès.';
END
GO

-- Création de la table CommandeArticles pour associer les articles aux commandes
IF OBJECT_ID('CommandeArticles', 'U') IS NULL
BEGIN
    CREATE TABLE CommandeArticles (
        CommandeArticleID INT PRIMARY KEY IDENTITY(1,1),
        CommandeID NVARCHAR(36),
        ArticleID INT,
        Quantity INT,
        FOREIGN KEY (CommandeID) REFERENCES Commandes(CommandeID),
        FOREIGN KEY (ArticleID) REFERENCES Articles(ArticleID)
    );
    PRINT 'La table CommandeArticles a été créée avec succès.';
END
GO

-- Création de la table CommandeMenus pour associer les menus aux commandes
IF OBJECT_ID('CommandeMenus', 'U') IS NULL
BEGIN
    CREATE TABLE CommandeMenus (
        CommandeMenuID INT PRIMARY KEY IDENTITY(1,1),
        CommandeID NVARCHAR(36),
        MenuID INT,
        Quantity INT,
        FOREIGN KEY (CommandeID) REFERENCES Commandes(CommandeID),
        FOREIGN KEY (MenuID) REFERENCES Menus(MenuID)
    );
    PRINT 'La table CommandeMenus a été créée avec succès.';
END
GO