const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

app.use(cors());

// Configuration de la connexion MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Vérification de la connexion à la base de données
db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Route pour récupérer les aliments en fonction de leur catégorie
app.get('/api/aliments/:aliment', (req, res) => {
  const aliment = req.params.aliment;
  console.log(`Requête pour la catégorie : ${aliment}`);

  const sql = `
    SELECT Aliment.*
    FROM Aliment
    INNER JOIN CategorieAliment ON CategorieAliment.id = Aliment.categorie_id
    WHERE CategorieAliment.nom = ?
  `;

  db.query(sql, [aliment], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des données:', err);
      res.status(500).send('Erreur lors de la récupération des données');
      return;
    }
    if (result.length === 0) {
      console.log(`Aucun aliment trouvé pour la catégorie : ${aliment}`);
      res.status(404).send(`Aucun aliment trouvé pour la catégorie : ${aliment}`);
    } else {
      res.json(result);
    }
  });
});

// Route pour récupérer les aliments en fonction de leur catégorie
app.get('/api/repas/:lunch', (req, res) => {
  const lunch = req.params.lunch;
  console.log(`Requête pour la catégorie : ${lunch}`);

  const sql = `
    SELECT Recette.*
    FROM Recette 
    INNER JOIN Recette_Repas  ON Recette_Repas.recette_id = Recette.id
    INNER JOIN Repas ON Repas.id = Recette_Repas.repas_id
    WHERE Repas.nom = ?
  `;

  db.query(sql, [lunch], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des données:', err);
      res.status(500).send('Erreur lors de la récupération des données');
      return;
    }
    if (result.length === 0) {
      console.log(`Aucun aliment trouvé pour la catégorie : ${lunch}`);
      res.status(404).send(`Aucun aliment trouvé pour la catégorie : ${lunch}`);
    } else {
      res.json(result);
    }
  });
});

app.get('/api/recettes/:nom', (req, res) => {
  const recetteNom = decodeURIComponent(req.params.nom); // Décodage de l'URL
  console.log(`Requête pour la recette : ${recetteNom}`);

  const sql = `
    SELECT Recette.nom, Recette.description, Aliment.nom as aliment_nom, Aliment.proteines, Aliment.glucides, Aliment.lipides, Aliment.kcal
    FROM Recette
    JOIN Recette_Aliment ON Recette.id = Recette_Aliment.recette_id
    JOIN Aliment ON Recette_Aliment.aliment_id = Aliment.id
    WHERE Recette.nom = ?
  `;

  db.query(sql, [recetteNom], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données:', err);
      res.status(500).send('Erreur lors de la récupération des données');
      return;
    }

    if (results.length === 0) {
      res.status(404).send(`Aucune recette trouvée pour le nom : ${recetteNom}`);
      return;
    }

    const recette = {
      nom: results[0].nom,
      description: results[0].description,
      aliments: results.map(row => ({
        nom: row.aliment_nom,
        proteines: row.proteines,
        glucides: row.glucides,
        lipides: row.lipides,
        kcal: row.kcal
      }))
    };

    res.json(recette);
  });
});

app.get('/api/suivit', (req, res) => {
  const sql = `
    SELECT Recette.nom AS recette_nom, Repas.nom AS repas_nom, Recette_Repas.jour
    FROM Recette_Repas
    JOIN Recette ON Recette_Repas.recette_id = Recette.id
    JOIN Repas ON Recette_Repas.repas_id = Repas.id
    ORDER BY Recette_Repas.jour, Repas.nom
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données:', err);
      res.status(500).send('Erreur lors de la récupération des données');
      return;
    }

    // Regrouper les résultats par jour
    const suivit = results.reduce((acc, row) => {
      const jour = row.jour;
      if (!acc[jour]) {
        acc[jour] = {
          jour,
          petitDejeuner: null,
          dejeuner: null,
          diner: null,
          collation: null,
        };
      }

      acc[jour][row.repas_nom.toLowerCase()] = row.recette_nom;

      return acc;
    }, {});

    // Convertir l'objet en tableau
    res.json(Object.values(suivit));
  });
});



app.listen(3000, () => {
  console.log('Serveur à l\'écoute sur le port 3000');
});
