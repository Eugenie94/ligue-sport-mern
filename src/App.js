import {Routes, Route} from 'react-router-dom'
import './App.css';

import Navbar from "./components/layouts/Navbar";
import Home from "./components/Home"

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
