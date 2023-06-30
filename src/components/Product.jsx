import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, TextField, Button } from '@material-ui/core';
// Import de l'icône de suppression de Material-UI
import DeleteIcon from '@material-ui/icons/Delete';
// Import de l'icône de modification de Material-UI
import EditIcon from '@material-ui/icons/Edit';
import '../assets/styles/product.css'

export default function Product() {
    // État pour stocker la liste des produits
    const [products, setProducts] = useState([]);
    // État pour stocker les informations d'un nouveau produit à ajouter
    const [newProduct, setNewProduct] = useState({
        name: '',
        quantity: '',
        price: '',
        image: ''
    });
    // État pour stocker les informations du produit en cours de modification
    const [editedProduct, setEditedProduct] = useState(null);

    // Effectue une requête pour récupérer la liste des produits lors du chargement du composant
    useEffect(() => {
        fetchProducts();
    }, []);

    // Fonction pour récupérer la liste des produits depuis le serveur
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits :', error);
        }
    };

    // Gestionnaire de changement des champs du formulaire d'ajout d'un produit
    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    // Gestionnaire de changement de l'image du nouveau produit
    const handleNewProductImageChange = (e) => {
        const file = e.target.files[0];
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            image: '', // Set it to an empty string
        }));
    };

    // Gestionnaire de soumission du formulaire d'ajout d'un produit
    const handleAddProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/product', newProduct);

            if (response.status === 200) {
                console.log('Produit ajouté avec succès');
                // Actualiser la liste des produits après l'ajout d'un nouvel produit
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

    // Fonction pour supprimer un produit
    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:4000/product/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error('Erreur lors de la suppression d\'un produit :', error);
        }
    };

    // Fonction pour démarrer la modification d'un produit
    const editProduct = (productId) => {
        const productToEdit = products.find((product) => product._id === productId);
        setEditedProduct(productToEdit);
    };

    // Gestionnaire de changement des champs du formulaire de modification d'un produit
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    // Gestionnaire de soumission du formulaire de modification d'un produit
    const handleEditProductSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:4000/product/${editedProduct._id}`,
                editedProduct
            );
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === editedProduct._id ? editedProduct : product
                )
            );
            setEditedProduct(null);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Fonction pour gérer le changement de l'image du produit en cours de modification
    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            image: '', // Set it to an empty string
        }));
    };

    return (
        <div>
            {!editedProduct && (
                <div>
                    {/* Formulaire d'ajout d'un produit */}
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
                            type="file"
                            name="image"
                            value={newProduct.image}
                            onChange={handleNewProductChange}
                            alt="Product Image"
                            className="edit-input"
                            label="Image"
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
                {/* Formulaire d'édition d'un produit */}
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                            {editedProduct && editedProduct._id === product._id ? (
                                <React.Fragment>
                                    <TableCell>
                                        <form onSubmit={handleEditProductSubmit}>
                                            <input
                                                type="text"
                                                name="name"
                                                value={editedProduct.name}
                                                onChange={handleEditInputChange}
                                                className="edit-input"
                                            />
                                        </form>
                                    </TableCell>
                                    <TableCell>
                                        <form onSubmit={handleEditProductSubmit}>
                                            <input
                                                type="file"
                                                name="image"
                                                value={editedProduct.image}
                                                onChange={handleEditImageChange}
                                                className="edit-input"
                                            />
                                        </form>
                                    </TableCell>
                                    <TableCell>
                                        <form onSubmit={handleEditProductSubmit}>
                                            <input
                                                type="number"
                                                name="quantite"
                                                value={editedProduct.quantity}
                                                onChange={handleEditInputChange}
                                                className="edit-input"
                                            />
                                        </form>
                                    </TableCell>
                                    <TableCell>
                                        <form onSubmit={handleEditProductSubmit}>
                                            <input
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
                                            <button type="submit" className="save-button">Save</button>
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
