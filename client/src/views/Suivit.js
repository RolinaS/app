import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

function Suivit() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les données de l'API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/suivit');
        console.log(response.data); // Vérifiez les données ici
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
        <h1>Suivi Hebdomadaire</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Jour</th>
              <th>Petit-déjeuner</th>
              <th>Déjeuner</th>
              <th>Collation</th>
              <th>Dîner</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((day, index) => (
                <tr key={index}>
                    <td>{jours[day.jour - 1]}</td>
                    <td>
                        <Link to={`/recette/${encodeURIComponent(day.petitDejeuner)}`}>{day.petitDejeuner || 'N/A'}</Link>
                    </td>
                    <td>                  
                        <Link to={`/recette/${encodeURIComponent(day.déjeuner)}`}>{day.déjeuner || 'N/A'}</Link>
                    </td>
                    <td>
                        <Link to={`/recette/${encodeURIComponent(day.collation)}`}>{day.collation || 'N/A'}</Link>
                    </td>
                    <td>
                        <Link to={`/recette/${encodeURIComponent(day.diner)}`}>{day.diner || 'N/A'}</Link>
                    </td>
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

export default Suivit;
