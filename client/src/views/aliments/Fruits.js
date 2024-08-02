import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

function Fruits() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les données de l'API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/aliments/fruits');
        setData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
        setError('Erreur lors de la récupération des données.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fruits (100g)</h1>
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
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.nom}</td>
                  <td>{item.proteines}</td> {/* Assurez-vous que les noms des propriétés correspondent */}
                  <td>{item.glucides}</td>
                  <td>{item.lipides}</td>
                  <td>{item.kcal}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Aucune donnée disponible</td>
              </tr>
            )}
          </tbody>
        </Table>
      </header>
    </div>
  );
}

export default Fruits;
