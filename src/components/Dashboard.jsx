import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-options">
        <Link to="/admin/users" className="dashboard-option">
          <div className="dashboard-option-icon">User</div>
          <div className="dashboard-option-label">Manage Users</div>
        </Link>
        <Link to="/admin/products" className="dashboard-option">
          <div className="dashboard-option-icon">Product</div>
          <div className="dashboard-option-label">Manage Products</div>
        </Link>
      </div>
    </div>
  );
}
