import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, TextField, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import '../assets/styles/product.css';

export default function Product() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        quantity: '',
        price: '',
        image: ''
    });
    const [editedProduct, setEditedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
        }
    };

    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleAddProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/product', newProduct);

            if (response.status === 200) {
                console.log('Produit ajouté avec succès');
                fetchProducts();
                setNewProduct({
                    name: '',
                    quantity: '',
                    price: '',
                    image: ''
                });
            } else {
                throw new Error('Erreur lors de l\'ajout du produit');
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit:', error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:4000/product/${productId}`);
            setProducts(products.filter((product) => product._id !== productId));
        } catch (error) {
            console.error('Erreur lors de la suppression d\'un produit:', error);
        }
    };

    const editProduct = (productId) => {
        const productToEdit = products.find((product) => product._id === productId);
        setEditedProduct(productToEdit);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleEditProductSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/product/${editedProduct._id}`, editedProduct);
            setProducts((prevProducts) =>
                prevProducts.map((product) => (product._id === editedProduct._id ? editedProduct : product))
            );
            setEditedProduct(null);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit:', error);
        }
    };

    return (
        <div>
            <h1>Gestionnaire des produits</h1>
            {!editedProduct && (
                <div>
                    <form onSubmit={handleAddProductSubmit}>
                        <TextField
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleNewProductChange}
                            label="Nom du produit"
                            required
                        />
                        <TextField
                            type="text"
                            name="image"
                            value={newProduct.image}
                            onChange={handleNewProductChange}
                            label="URL de l'image"
                            required
                        />
                        <TextField
                            type="number"
                            name="quantity"
                            value={newProduct.quantity}
                            onChange={handleNewProductChange}
                            label="Quantité"
                            required
                        />
                        <TextField
                            type="float"
                            step="0.01"
                            name="price"
                            value={newProduct.price}
                            onChange={handleNewProductChange}
                            label="Prix"
                            required
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Ajouter un produit
                        </Button>
                    </form>
                </div>
            )}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Quantité</TableCell>
                        <TableCell>Prix</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                            {editedProduct && editedProduct._id === product._id ? (
                                <React.Fragment>
                                    <TableCell>
                                        <form onSubmit={handleEditProductSubmit}>
                                            <TextField
                                                type="text"
                                                name="name"
                                                value={editedProduct.name}
                                                onChange={handleEditInputChange}
                                                className="edit-input"
                                            />
                                        </form>
                                    </TableCell>
                                    <TableCell>{editedProduct.image}</TableCell>
                                    <TableCell>
                                        <form onSubmit={handleEditProductSubmit}>
                                            <TextField
                                                type="number"
                                                name="quantity"
                                                value={editedProduct.quantity}
                                                onChange={handleEditInputChange}
                                                className="edit-input"
                                            />
                                        </form>
                                    </TableCell>
                                    <TableCell>
                                        <form onSubmit={handleEditProductSubmit}>
                                            <TextField
                                                type="float"
                                                name="price"
                                                value={editedProduct.price}
                                                onChange={handleEditInputChange}
                                                className="edit-input"
                                            />
                                        </form>
                                    </TableCell>
                                    <TableCell>
                                        <form onSubmit={handleEditProductSubmit}>
                                            <Button type="submit" className="save-button">
                                                Save
                                            </Button>
                                        </form>
                                    </TableCell>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.image}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>
                                        <div className="action-buttons">
                                            <IconButton onClick={() => deleteProduct(product._id)} color="secondary">
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton onClick={() => editProduct(product._id)} color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </React.Fragment>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
