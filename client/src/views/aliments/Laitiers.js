import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

function Laitiers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les données de l'API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/aliments/laitiers');
        setData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Produits laitiers (100g)</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Protéines (g)</th>
              <th>Glucides (g)</th>
              <th>Lipides (g)</th>
              <th>Kcal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.nom}</td>
                <td>{item.protéines}</td>
                <td>{item.glucides}</td>
                <td>{item.lipides}</td>
                <td>{item.Kcal}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </header>
    </div>
  );
}

export default Laitiers;
