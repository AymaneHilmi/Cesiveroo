# Utiliser une image de Node.js pour le backend
FROM node:current

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application Node.js s'exécute
EXPOSE 3000

# Commande par défaut pour démarrer l'application
CMD ["npm", "start"]
