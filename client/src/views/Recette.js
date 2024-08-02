import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import axios from 'axios';

function Recette() {
  const { nom } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/recettes/${encodeURIComponent(nom)}`);
        setData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
        setError('Erreur lors de la récupération des données.');
      }
    };

    fetchData();
  }, [nom]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{data.nom}</h1>
        <p>{data.description}</p>
        <h4>Ingrédients (100g)</h4>
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
            {data.aliments.map((item, index) => (
              <tr key={index}>
                <td>{item.nom}</td>
                <td>{item.proteines}</td>
                <td>{item.glucides}</td>
                <td>{item.lipides}</td>
                <td>{item.kcal}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </header>
    </div>
  );
}

export default Recette;
