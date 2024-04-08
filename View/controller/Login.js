import axios from 'axios';

const Login = async (email, password) => {
  try {
    // Envoyer une requête POST au backend avec les informations de connexion
    console.log('Logging in...');
    console.log(email);
    console.log(password);


    // Connexion à l'API
    const response = await axios.post("http://localhost:3000/api/clients/login", {
      email: email,
      password: password
    });

    // Vérifier si la connexion a réussi
    if (response.data.token) {
      console.log('Login successful');
      console.log(response.data.token);
      // Rediriger l'utilisateur vers la page d'accueil
    } else {
      console.log('Login failed');
      // Gérer l'échec de connexion
    }
  } catch (error) {
    console.log('An error occurred:', error);
    // Gérer les erreurs
  }
};

export default Login;
