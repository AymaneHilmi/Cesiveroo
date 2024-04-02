// init-sql-server.sql

// Connect to the specific database (la création de la DB est implicite lors de la première insertion)
db = db.getSiblingDB('maNouvelleDB');

// Crée la collection si elle n'existe pas et insère des documents
db.maCollection.insertMany([
    { nom: "Item1", description: "Description de l'item 1", prix: 10.99 },
    { nom: "Item2", description: "Description de l'item 2", prix: 12.99 },
    { nom: "Item3", description: "Description de l'item 3", prix: 9.99 }
]);

print('Initialisation de la collection "maCollection" terminée.');
