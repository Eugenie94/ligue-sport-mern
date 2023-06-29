import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';

export default function Navbar() {
    const location = useLocation();
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
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My App
                </Typography>
                {isLoggedIn ? (
                    <>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                        {isAdmin && (
                            <Button color="inherit" onClick={() => navigate('/dashboard')}>
                                Dashboard
                            </Button>
                        )}
                    </>
                ) : (
                    <Button color="inherit" onClick={() => navigate('/signin')}>
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
