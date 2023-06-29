import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Alert from '@mui/material/Alert';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error);
    }
  };

  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {showAlert && (
        <Alert severity="success" onClose={() => setShowAlert(false)} sx={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          Produit ajouté au panier
        </Alert>
      )}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Item>
              <img src={product.image} alt={product.name} style={{ width: '30%' }} />
              <h3>{product.name}</h3>
              <Button startIcon={<ShoppingCartIcon />} variant="contained" onClick={() => addToCart(product)}>
                Ajouter au panier
              </Button>
              <h1>{product.price} €</h1>
              <h2>Quantité disponible: {product.quantity}</h2>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
