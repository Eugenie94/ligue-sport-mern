import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Tableau de bord</h1>
      <p>Bienvenue dans le Tableau de bord de Amazone. Cette interface vous permettra, en tant qu'admin, de gérer les éléments de la base de données.</p>
      <div className="dashboard-options">
        <Link to="/admin/users" className="dashboard-option">
          <div className="dashboard-option-icon">Utilisateurs</div>
          <div className="dashboard-option-label">Gérer les utilisateurs</div>
        </Link>
        <Link to="/admin/products" className="dashboard-option">
          <div className="dashboard-option-icon">Produits</div>
          <div className="dashboard-option-label">Gérer les produits</div>
        </Link>
      </div>
    </div>
  );
}