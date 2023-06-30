import {Navigate} from 'react-router-dom'

export const AdminRoute = ({ component }) => {
    const token = window.localStorage.getItem('isAdmin');
    return token ? component : <Navigate to="/" />;
  };