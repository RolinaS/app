import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import Fruits from './views/aliments/Fruits';
import Legumes from './views/aliments/Légumes';
import Viandes from './views/aliments/Viandes';
import Poissons from './views/aliments/Poissons';
import Noix from './views/aliments/Noix';
import Dejeuner from './views/repas/Dejeuner';
import PetitDejeuner from './views/repas/PetitDejeuner';
import Diner from './views/repas/Diner';
import Colation from './views/repas/Collation';
import Suivit from './views/Suivit';

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/fruits" element={<Fruits />} />
          <Route path="/viandes" element={<Viandes />} />
          <Route path="/legumes" element={<Legumes />} />
          <Route path="/poissons" element={<Poissons />} />
          <Route path="/noix" element={<Noix />} />
           <Route path="/dejeuner" element={<Dejeuner />} />
          <Route path="/petit-dejeuner" element={<PetitDejeuner />} />
          <Route path="/diner" element={<Diner />} />
          <Route path="/colation" element={<Colation />} />
          <Route path="/suivit" element={<Suivit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
