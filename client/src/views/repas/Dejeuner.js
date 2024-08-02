import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dejeuner() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les données de l'API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/repas/Déjeuner');
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
        <h1>Déjeuner</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <Link to={`/recette/${encodeURIComponent(item.nom)}`}>{item.nom}</Link>
                  <td>{item.description}</td> {/* Assurez-vous que les noms des propriétés correspondent */}
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

export default Dejeuner;
