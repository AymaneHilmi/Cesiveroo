const jwt = require('jsonwebtoken');
const secret = require('./secret');
// Middleware d'authentification pour les clients
exports.authenticateClient = (req, res, next) => {
  // Récupérer le token d'authentification
  const token = req.headers.authorization;
  // Vérifier si le token a été fourni et si c'est une requête POST ou d'inscription de client pour ne pas bloquer l'accès
  if (!token && req.method !== 'POST' && req.path !== '/api/clients/register') {
    return res.status(401).json({ message: 'No token provided' });
  }
  // Si le token n'est pas fourni, passer à la prochaine fonction middleware
  if (!token) {
    return next();
  }
  // Extraire le token de la chaîne 'Bearer token'
  const bearer = token.split(' ')[1];
  // Vérifier et décoder le token
  jwt.verify(bearer, secret, (err, decoded) => {
    if (err && req.method !== 'POST' && req.path !== '/api/clients/register') {
      return res.status(401).json({ message: 'Invalid token', error: err});
    }
    req.client = decoded;
    next();
  });
};

// Middleware d'autorisation pour les commerciaux
exports.authorizeCommercial = (req, res, next) => {
  // Vérifier si le client est un commercial ou si le client est le bon et souhaite accéder à ses propres données
  if (req.client.role === 'commercial' || req.client.id === req.params.id) {
    next(); 
  } else {
    return res.status(403).json({ message: 'Unauthorized' });
  }
};

