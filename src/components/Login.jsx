import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';

export default function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté lors du chargement de la page
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
  
    try {
      // Faire la requête de connexion
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });
      console.log(response.data);
  
      // Récupérer les informations de l'utilisateur depuis la réponse
      const { user } = response.data;
  
      // Stocker l'état de connexion et les informations de l'utilisateur dans le localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(user));
  
      console.log(user.admin)
      if (user.admin) {
        // Stocker également l'état d'administrateur dans le localStorage
        localStorage.setItem('isAdmin', 'true');
      } else {
        // Supprimer l'état d'administrateur du localStorage s'il existe
        localStorage.removeItem('isAdmin');
      }
  
      // Mettre à jour les états isLoggedIn et isAdmin dans le composant SignIn
      setIsLoggedIn(true);
      setIsAdmin(!!user.admin);
  
      // Redirection vers la page souhaitée après une connexion réussie
      window.location.reload()
      navigate('/');
    
    } catch (error) {
      console.error(error);
      // Affichage du message d'erreur
      setError("Échec de la connexion. Veuillez vérifier vos informations d'identification.");
  
      // Effacement de l'erreur après 5 secondes
      setTimeout(() => {
        setError('');
      }, 2500);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {error && (
            <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Se connecter
          </Button>

          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Tu n'as pas de compte ? Inscris-toi"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
