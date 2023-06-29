import {Navigate} from 'react-router-dom'
import './App.css';

export const AdminRoute = ({ component }) => {
    const token = window.localStorage.getItem('isAdmin');
    return token ? component : <Navigate to="/" />;
  };
  