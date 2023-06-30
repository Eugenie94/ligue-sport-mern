import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cart');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const removeFromCart = (itemId) => {
    const updatedCart = [...cartItems];
    const itemIndex = updatedCart.findIndex((item) => item.id === itemId);
    if (itemIndex > -1) {
      updatedCart.splice(itemIndex, 1);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce((accumulator, item) => accumulator + item.price, 0);
    return totalPrice.toFixed(2);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <h2>Votre panier</h2>

        {cartItems.length === 0 ? (
          <p>Votre panier est vide</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prix</th>
                <th>Image</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price} €</td>
                  <td>
                    <img src={item.image} alt={item.name} style={{ width: '15%' }} />
                  </td>
                  <td>
                    <Button color="inherit" startIcon={<DeleteIcon />} onClick={() => removeFromCart(item.id)}></Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" style={{ textAlign: 'right' }}>
                  Total:
                </td>
                <td>{getTotalPrice()} €</td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
};

export default Cart;
