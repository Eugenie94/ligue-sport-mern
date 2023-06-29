import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';


export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Vérifier l'état de connexion lors du chargement de la page
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const isAdmin = localStorage.getItem('isAdmin');
    setIsLoggedIn(!!isLoggedIn);
    setIsAdmin(!!isAdmin);
  }, []);

  const handleLogout = () => {
    // Déconnexion : supprimer les données du localStorage et rediriger vers la page de connexion
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/signin');
  };

  return (
    <AppBar position="static" sx={{ marginBottom: '20px' }}>
      <Toolbar>
        <SportsBasketballIcon onClick={() => navigate('/')} sx={{ marginLeft: 'auto' }} />
        <Typography onClick={() => navigate('/')} variant="h6" component="div" sx={{ flexGrow: 1 }}>
        </Typography>
        {isLoggedIn ? (
          <>
            {isAdmin && (
              <Button color="inherit" startIcon={<DashboardIcon/>} onClick={() => navigate('/admin')}>
                Dashboard
              </Button>
            )}
            <Button color="inherit" startIcon={<LogoutIcon/>} onClick={handleLogout}>
            </Button>


            <Button color="inherit" startIcon={<ShoppingCartIcon />} onClick={() => navigate('/cart')}></Button>
          </>
        ) : (
          <Button color="inherit" startIcon={<LoginIcon/>} onClick={() => navigate('/signin')}>
          </Button>
        )}
        <br></br>
      </Toolbar>
    </AppBar>
  );
}
