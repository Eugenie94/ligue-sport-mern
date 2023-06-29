import {Routes, Route} from 'react-router-dom'
import './App.css';

import Navbar from "./components/layouts/Navbar";
import Home from "./components/Home"
import Dashboard from './components/Dashboard';
import User from './components/User';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        {/* Affiche les produits l'accueil */}
        <Route path="/" element={<Home />}></Route>
        {/* Affiche back office */}
        <Route path="/admin" element={<Dashboard />}></Route>
        {/* Affiche les users back office*/}
        <Route path="/admin/users" element={<User />}></Route>
        {/* Affiche les products back office
        <Route path="/admin/users" element={<User />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
