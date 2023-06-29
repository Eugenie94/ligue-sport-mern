import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';

import Navbar from "./components/layouts/Navbar";
import Home from "./components/Home"
import Login from "./components/Login"
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import User from './components/User';
import Product from './components/Product';
import { AdminRoute } from './AdminRoute';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/admin"
          element={
            <AdminRoute component={<Dashboard/>}>
            </AdminRoute>}
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute component={<User/>}>
            </AdminRoute>}
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute component={<Product/>}>
            </AdminRoute>}
        />
      </Routes>
    </div>
  );
}

export default App;
