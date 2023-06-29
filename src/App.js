import {Routes, Route} from 'react-router-dom'
import './App.css';

import Navbar from "./components/layouts/Navbar";
import Home from "./components/Home"
import Login from "./components/Login"

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
