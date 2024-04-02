-- Check if the database exists and create it if it doesn't
IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = N'Cesiveroo')
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

-- Création de la table Client avec détail d'adresse
IF OBJECT_ID('Client', 'U') IS NULL
BEGIN
    CREATE TABLE Client (
        ClientID INT PRIMARY KEY IDENTITY(1,1),
        Nom NVARCHAR(100),
        Prenom NVARCHAR(100),
        StreetNumber NVARCHAR(10),
        StreetName NVARCHAR(255),
        City NVARCHAR(100),
        PostalCode NVARCHAR(20),
        Email NVARCHAR(100),
        Numero NVARCHAR(50)
    );
    PRINT 'La table Client a été créée avec succès.';
END
GO

-- Création de la table Livreur avec détail d'adresse
IF OBJECT_ID('Livreur', 'U') IS NULL
BEGIN
    CREATE TABLE Livreur (
        LivreurID INT PRIMARY KEY IDENTITY(1,1),
        Nom NVARCHAR(100),
        Prenom NVARCHAR(100),
        StreetNumber NVARCHAR(10),
        StreetName NVARCHAR(255),
        City NVARCHAR(100),
        PostalCode NVARCHAR(20),
        Email NVARCHAR(100),
        Numero NVARCHAR(50),
        BankInfo NVARCHAR(255)
    );
    PRINT 'La table Livreur a été créée avec succès.';
END
GO

-- Création de la table Restaurant avec détail d'adresse
IF OBJECT_ID('Restaurant', 'U') IS NULL
BEGIN
    CREATE TABLE Restaurant (
        RestaurantID INT PRIMARY KEY IDENTITY(1,1),
        Nom NVARCHAR(100),
        StreetNumber NVARCHAR(10),
        StreetName NVARCHAR(255),
        City NVARCHAR(100),
        PostalCode NVARCHAR(20),
        Email NVARCHAR(100),
        Numero NVARCHAR(50),
        Bank NVARCHAR(255)
    );
    PRINT 'La table Restaurant a été créée avec succès.';
END
GO

-- Création de la table Articles
IF OBJECT_ID('Articles', 'U') IS NULL
BEGIN
    CREATE TABLE Articles (
        ArticlesID INT PRIMARY KEY IDENTITY(1,1),
        RestaurantID INT,
        Nom NVARCHAR(100),
        Ingredients NVARCHAR(255),
        Prix DECIMAL(10, 2),
        FOREIGN KEY (RestaurantID) REFERENCES Restaurant(RestaurantID)
    );
    PRINT 'La table Articles a été créée avec succès.';
END
GO

-- Création de la table Commande
IF OBJECT_ID('Commande', 'U') IS NULL
BEGIN
    CREATE TABLE Commande (
        CommandeID INT PRIMARY KEY IDENTITY(1,1),
        ClientID INT,
        LivreurID INT,
        ArticlesID INT,
        DateCommande DATETIME,
        DateLivraison DATETIME,
        Prix DECIMAL(10, 2),
        FOREIGN KEY (ClientID) REFERENCES Client(ClientID),
        FOREIGN KEY (LivreurID) REFERENCES Livreur(LivreurID),
        FOREIGN KEY (ArticlesID) REFERENCES Articles(ArticlesID)
    );
    PRINT 'La table Commande a été créée avec succès.';
END
GO


---- SEE THE DATABASE TABLES IN TERMINAL
--SELECT name FROM master.sys.databases;
--GO
--
---- SEE THE TABLES NAMES IN TERMINAL
--SELECT TABLE_NAME
--FROM INFORMATION_SCHEMA.TABLES
--WHERE TABLE_TYPE = 'BASE TABLE';
--GO