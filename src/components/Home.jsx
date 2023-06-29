import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ProductGrid() {
  const [products, setProducts] = useState([]);

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


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Item>
              <img src={product.image} alt={product.name} style={{ width: '30%' }} /> {/* Ajuster la valeur de width */}
              <h3>{product.name}</h3>
              <Button startIcon={<ShoppingCartIcon />} variant="contained">Ajouter au panier</Button>
              <h1>{product.price} €</h1>
              <h2>
                {product.quantity === 0 ? 'Stock Vide' : `Quantité disponible: ${product.quantity}`}
              </h2>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
