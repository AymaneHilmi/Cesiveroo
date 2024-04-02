IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'DataBase')
  BEGIN
    CREATE DATABASE MaBaseDeDonnees
END
--    GO
--       USE [DataBase]
--    GO

---- Vérifie l'existence de la base de données et la crée si nécessaire
--IF DB_ID(N'MaBaseDeDonnees') IS NULL
--BEGIN
--    PRINT 'La base de données MaBaseDeDonnees n''existe pas. Création en cours...';
--    CREATE DATABASE MaBaseDeDonnees;
--    PRINT 'La base de données MaBaseDeDonnees a été créée.';
--END
--ELSE
--BEGIN
--    PRINT 'La base de données MaBaseDeDonnees existe déjà.';
--END
--GO -- Le GO ici termine le lot
--
---- Sélectionne la base de données pour les opérations suivantes
--USE MaBaseDeDonnees;
--GO -- Le GO ici commence un nouveau lot
--
---- Vérifie l'existence de la table et la crée si nécessaire
--IF OBJECT_ID(N'dbo.MaTableDeTest', 'U') IS NULL
--BEGIN
--    PRINT 'La table dbo.MaTableDeTest n''existe pas. Création en cours...';
--    CREATE TABLE dbo.MaTableDeTest (
--        ID INT PRIMARY KEY IDENTITY(1,1),
--        ColonneTest NVARCHAR(100)
--    );
--    PRINT 'La table dbo.MaTableDeTest a été créée avec succès.';
--END
--ELSE
--BEGIN
--    PRINT 'La table dbo.MaTableDeTest existe déjà.';
--END
--GO -- Le GO ici termine le lot
