import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, IconButton } from '@material-ui/core';
// Import de l'icône de suppression de Material-UI
import DeleteIcon from '@material-ui/icons/Delete';
// Import de l'icône de modification de Material-UI
import EditIcon from '@material-ui/icons/Edit';

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
            image: file,
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

    return (
        <div>
            <h1>Products </h1>
            <List>
                {products.map((product) => (
                    // Formulaire d'édition d'un product
                    <ListItem key={product._id}>
                        {editedProduct && editedProduct._id === product._id && (
                            <form onSubmit={handleEditProductSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    value={editedProduct.name}
                                    onChange={handleEditInputChange}
                                />
                                <input
                                    type="image"
                                    name="image"
                                    value={editedProduct.image}
                                    onChange={handleEditInputChange}
                                    alt="Product Image"
                                    className="edit-input"
                                />
                                <input
                                    type="number"
                                    name="quantity"
                                    value={parseInt(editedProduct.quantity)}
                                    onChange={handleEditInputChange}
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    value={editedProduct.price}
                                    onChange={handleEditInputChange}
                                />
                                <button type="submit">Save</button>
                            </form>
                        )}
                        <ListItemText primary={product.name} />
                        <ListItemText>
                            <img src={product.image} alt={product.name} style={{ width: '100px', height: '100px' }} />
                        </ListItemText>
                        <ListItemText primary={product.quantity} />
                        <ListItemText primary={product.price} />
                        <IconButton onClick={() => deleteProduct(product._id)} color="secondary">
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => editProduct(product._id)} color="primary">
                            <EditIcon />
                        </IconButton>
                    </ListItem>
                ))}
                {/* // Formulaire d'ajout d'un product */}
                {!editedProduct && ( // Cache le formulaire si on est en train de modifier un product
                    <ListItem>
                        <form onSubmit={handleAddProductSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={newProduct.name}
                                onChange={handleNewProductChange}
                                placeholder="Name"
                                required
                            />
                            <input
                                type="file"
                                name="image"
                                // Ajouter un gestionnaire de changement d'image
                                onChange={handleNewProductImageChange}
                                required
                            />
                            <input
                                type="number"
                                name="quantity"
                                value={newProduct.quantity}
                                onChange={handleNewProductChange}
                                placeholder="Quantity"
                                required
                            />
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                value={newProduct.price === '' ? '' : parseFloat(newProduct.price)}
                                onChange={handleNewProductChange}
                                placeholder="Price"
                                required
                            />
                            <button type="submit">Add Product</button>
                        </form>
                    </ListItem>
                )}
            </List>
        </div>
    );
}