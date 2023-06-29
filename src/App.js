import {Routes, Route} from 'react-router-dom'
import './App.css';

import Navbar from "./components/layouts/Navbar";
import Home from "./components/Home"
import Login from "./components/Login"
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import User from './components/User';



function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/admin" element={<Dashboard />}></Route>
        <Route path="/admin/users" element={<User />}></Route>        
      </Routes>
    </div>
  );
}

export default App;
