import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Legend, Tooltip } from 'chart.js';

// Enregistrez les composants nécessaires dans Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Legend, Tooltip);

function Graphique() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/suivit');
        const suiviData = response.data;

        console.log("Data received from API:", suiviData);

        const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        const totaux = {
          proteines: Array(7).fill(0),
          glucides: Array(7).fill(0),
          lipides: Array(7).fill(0),
          kcal: Array(7).fill(0),
        };

        const mockAliments = {
          "Riz dinde brocoli": [
            { proteines: 25, glucides: 60, lipides: 10, kcal: 400 },
          ]
        };

        suiviData.forEach((day) => {
          const repas = {
            petitDejeuner: mockAliments[day.petitDejeuner] || [],
            déjeuner: mockAliments[day.déjeuner] || [],
            diner: mockAliments[day.diner] || [],
            collation: mockAliments[day.collation] || [],
          };

          Object.values(repas).forEach(rep => {
            rep.forEach(aliment => {
              totaux.proteines[day.jour - 1] += aliment.proteines || 0;
              totaux.glucides[day.jour - 1] += aliment.glucides || 0;
              totaux.lipides[day.jour - 1] += aliment.lipides || 0;
              totaux.kcal[day.jour - 1] += aliment.kcal || 0;
            });
          });
        });

        setData({
          labels: jours,
          datasets: [
            {
              label: 'Protéines (g)',
              data: totaux.proteines,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.4)',
              fill: true,
            },
            {
              label: 'Glucides (g)',
              data: totaux.glucides,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.4)',
              fill: true,
            },
            {
              label: 'Lipides (g)',
              data: totaux.lipides,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.4)',
              fill: true,
            },
            {
              label: 'Kcal',
              data: totaux.kcal,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.4)',
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
        setError('Erreur lors de la récupération des données');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="graph-container">
      <h2>Suivi Hebdomadaire des Nutriments</h2>
      {data ? (
        <Line 
          data={data} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: 'rgb(255, 255, 255)',
                  boxWidth: 20,
                  padding: 15,
                  usePointStyle: true,
                },
              },
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw} ${tooltipItem.dataset.label.includes('Kcal') ? 'kcal' : 'g'}`;
                  }
                }
              }
            },
            scales: {
              x: {
                stacked: true,
                ticks: {
                  color: 'rgb(255, 255, 255)', // Couleur des étiquettes de l'axe X
                },
                title: {
                  display: true,
                  text: 'Jours de la semaine',
                  color: 'rgb(255, 255, 255)',
                  padding: { top: 20, bottom: 10 }
                }
              },
              y: {
                stacked: true,
                ticks: {
                  color: 'rgb(255, 255, 255)', // Couleur des étiquettes de l'axe Y
                  callback: function(value) {
                    return value + ' g'; // Ajouter ' g' aux valeurs de l'axe Y
                  }
                },
                title: {
                  display: true,
                  text: 'Quantité',
                  color: 'rgb(255, 255, 255)',
                  padding: { top: 20, bottom: 10 }
                }
              }
            }
          }} 
        />
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

export default Graphique;
