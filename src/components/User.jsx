import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, TextField, Button } from '@material-ui/core';
// Import de l'icône de suppression de Material-UI
import DeleteIcon from '@material-ui/icons/Delete';
// Import de l'icône de modification de Material-UI
import EditIcon from '@material-ui/icons/Edit';
// Import CSS
import '../assets/styles/user.css'

export default function User() {
    // État pour stocker la liste des utilisateurs
    const [users, setUsers] = useState([]);
    // État pour stocker les informations d'un nouvel utilisateur à ajouter
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    // État pour stocker les informations de l'utilisateur en cours de modification
    const [editedUser, setEditedUser] = useState(null);

    // Effectue une requête pour récupérer la liste des utilisateurs lors du chargement du composant
    useEffect(() => {
        fetchUsers();
    }, []);

    // Fonction pour récupérer la liste des utilisateurs depuis le serveur
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:4000/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
        }
    };

    // Gestionnaire de changement des champs du formulaire d'ajout d'utilisateur
    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Gestionnaire de soumission du formulaire d'ajout d'utilisateur
    const handleAddUserSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/register', newUser);

            if (response.status === 200) {
                console.log('Utilisateur ajouté avec succès');
                // Actualiser la liste des utilisateurs après l'ajout d'un nouvel utilisateur
                fetchUsers();
            } else {
                throw new Error('Erreur lors de l\'ajout de l\'utilisateur');
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        }
    };

    // Fonction pour supprimer un utilisateur
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:4000/user/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        }
    };

    // Fonction pour démarrer la modification d'un utilisateur
    const editUser = (userId) => {
        const userToEdit = users.find((user) => user._id === userId);
        setEditedUser(userToEdit);
    };

    // Gestionnaire de changement des champs du formulaire de modification d'utilisateur
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Gestionnaire de soumission du formulaire de modification d'utilisateur
    const handleEditUserSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:4000/user/${editedUser._id}`,
                editedUser
            );
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === editedUser._id ? editedUser : user
                )
            );
            setEditedUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            {!editedUser && (
                <div>
                    {/* Formulaire d'ajout d'un utilisateur */}
                    <form onSubmit={handleAddUserSubmit}>
                        <TextField
                            type="text"
                            name="firstName"
                            value={newUser.firstName}
                            onChange={handleNewUserChange}
                            label="Prénom"
                            required
                        />
                        <TextField
                            type="text"
                            name="lastName"
                            value={newUser.lastName}
                            onChange={handleNewUserChange}
                            label="Nom"
                            required
                        />
                        <TextField
                            type="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleNewUserChange}
                            label="Email"
                            required
                        />
                        <TextField
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleNewUserChange}
                            label="Mot de passe"
                            required
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Ajouter un utilisateur
                        </Button>
                    </form>
                </div>
            )}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Prénom</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Mot de passe</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                {/* Formulaire d'édition d'un utilisateur */}
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user._id}>
                            {editedUser && editedUser._id === user._id ? (
                                <React.Fragment>
                                    <TableCell>
                                        <form onSubmit={handleEditUserSubmit}>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={editedUser.firstName}
                                                onChange={handleEditInputChange}
                                                className="edit-input"
                                            />
                                        </form>
                                    </TableCell>
                                    <TableCell>
                                        <form onSubmit={handleEditUserSubmit}>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={editedUser.lastName}
                                                onChange={handleEditInputChange}
                                                className="edit-input"
                                            />
                                        </form>
                                    </TableCell>
                                    <TableCell>
                                        <form onSubmit={handleEditUserSubmit}>
                                            <input
                                                type="email"
                                                name="email"
                                                value={editedUser.email}
                                                onChange={handleEditInputChange}
                                                className="edit-input"
                                            />
                                        </form>
                                    </TableCell>
                                    <TableCell>
                                        <form onSubmit={handleEditUserSubmit}>
                                            <input
                                                type="password"
                                                name="password"
                                                value={editedUser.password}
                                                onChange={handleEditInputChange}
                                                className="edit-input"
                                            />
                                        </form>
                                    </TableCell>
                                    <TableCell>
                                        <form onSubmit={handleEditUserSubmit}>
                                            <button type="submit" className="save-button">Save</button>
                                        </form>
                                    </TableCell>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.password}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => deleteUser(user._id)} color="secondary">
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={() => editUser(user._id)} color="primary">
                                            <EditIcon />
                                        </IconButton>
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