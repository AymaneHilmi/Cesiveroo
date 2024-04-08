const jwt = require('jsonwebtoken');
const secret = require('./secret');
// Middleware d'authentification pour les clients et les commerciaux et les livreurs
exports.authenticate = (req, res, next) => {
  // Récupérer le token d'authentification
  const token = req.headers.authorization;
  // Si la route est login ou register, passer à la prochaine fonction middleware
  if (req.path === '/register' || req.path === '/login') {
      return next();
  }
  // Vérifier si le token a été fourni et si c'est une requête POST ou d'inscription de client pour ne pas bloquer l'accès
  if (!token && req.method !== 'POST') {
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
    if (err) {
      return res.status(401).json({ message: 'Invalid token', error: err});
    }
    // Ajouter les informations du client à la requête
    req.client = decoded;
    req.client.id = decoded.id;
    console.log(req.client.id)
    // Ajouter le rôle du client à la requête
    req.role = decoded.role;
    next();
  });
};

// Middleware d'autorisation pour les livreurs
exports.authorizeLivreur = (req, res, next) => {
  // Si la route est login ou register, passer à la prochaine fonction middleware
  if (req.path === '/register' || req.path === '/login') {
    return next();
    // Vérifier si le livreur est le bon et souhaite accéder à ses propres données
  } else if (req.path === ('/' + req.client.id) && req.role === 'livreur'){
    return next(); 
  } else {
    return res.status(403).json({ message: 'Unauthorized' });
  }
};

// Middleware d'autorisation pour les clients
exports.authorizeClient = (req, res, next) => {
  // Si la route est login ou register, passer à la prochaine fonction middleware
  console.log(req.path)
  console.log(req.client.id)
  console.log(req.role)
  if (req.path === '/register' || req.path === '/login') {
    return next();
    // Vérifier si le client est le bon et souhaite accéder à ses propres données
  } else if (req.path === ('/' + req.client.id) && req.role === 'client'){
    return next(); 
  } else if (req.role === 'commercial') {
    next();
  } else {
    return res.status(403).json({ message: 'Unauthorized' });
  }
};

// Middleware d'autorisation pour les commerciaux
exports.authorizeCommercial = (req, res, next) => {
  // Si la route est login ou register, passer à la prochaine fonction middleware
  if (req.path === '/register' || req.path === '/login') {
    return next();
    // Vérifier si le commercial est le bon et souhaite accéder à ses propres données
  } else if (req.path === ('/' + req.client.id) && req.role === 'commercial'){
    return next(); 
  } else {
    return res.status(403).json({ message: 'Unauthorized' });
  }
};