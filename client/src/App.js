import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import Fruits from './views/aliments/Fruits';
import Legumes from './views/aliments/Légumes';
import Laitiers from './views/aliments/Laitiers';
import Féculents from './views/aliments/Féculents';
import Viandes from './views/aliments/Viandes';
import Oeufs from './views/aliments/Oeufs';
import Poissons from './views/aliments/Poissons';
import Noix from './views/aliments/Noix';
import Dejeuner from './views/repas/Dejeuner';
import PetitDejeuner from './views/repas/PetitDejeuner';
import Diner from './views/repas/Diner';
import Colation from './views/repas/Collation';
import Recette from './views/Recette';
import Suivit from './views/Suivit';
import Graphique from './components/Graphique';

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/fruits" element={<Fruits />} />
          <Route path="/viandes" element={<Viandes />} />
          <Route path="/legumes" element={<Legumes />} />
          <Route path="/laitiers" element={<Laitiers />} />
          <Route path="/feculents" element={<Féculents />} />
          <Route path="/poissons" element={<Poissons />} />
          <Route path="/oeufs" element={<Oeufs />} />
          <Route path="/noix" element={<Noix />} />
          <Route path="/dejeuner" element={<Dejeuner />} />
          <Route path="/petit-dejeuner" element={<PetitDejeuner />} />
          <Route path="/diner" element={<Diner />} />
          <Route path="/colation" element={<Colation />} />
          <Route path="/recette/:nom" element={<Recette />} />
          <Route path="/suivit" element={<Suivit />} />
          <Route path="/" element={<Graphique />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
