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

// Route pour récupérer les données des différents fruits
app.get('/api/fruits', (req, res) => {
  const sql = 'SELECT * FROM Fruits'; // Remplacez 'your_table' par le nom de votre table
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des données');
      return;
    }
    res.json(result);
  });
});

// Route pour récupérer les données des différents légumes
app.get('/api/legumes', (req, res) => {
      const sql = 'SELECT * FROM Légumes'; // Remplacez 'your_table' par le nom de votre table
      db.query(sql, (err, result) => {
        if (err) {
          res.status(500).send('Erreur lors de la récupération des données');
          return;
        }
        res.json(result);
      });
    });

// Route pour récupérer les données des différentes viandes
app.get('/api/viandes', (req, res) => {
      const sql = 'SELECT * FROM Viandes'; // Remplacez 'your_table' par le nom de votre table
      db.query(sql, (err, result) => {
        if (err) {
          res.status(500).send('Erreur lors de la récupération des données');
          return;
        }
        res.json(result);
      });
    });

// Route pour récupérer les données des différents poissons
app.get('/api/poissons', (req, res) => {
      const sql = 'SELECT * FROM Poissons'; // Remplacez 'your_table' par le nom de votre table
      db.query(sql, (err, result) => {
        if (err) {
          res.status(500).send('Erreur lors de la récupération des données');
          return;
        }
        res.json(result);
      });
    });

// Route pour récupérer les données des différentes noix
app.get('/api/noix', (req, res) => {
      const sql = 'SELECT * FROM Noix'; // Remplacez 'your_table' par le nom de votre table
      db.query(sql, (err, result) => {
        if (err) {
          res.status(500).send('Erreur lors de la récupération des données');
          return;
        }
        res.json(result);
      });
    });

// Route pour récupérer les données des oeufs
app.get('/api/oeufs', (req, res) => {
      const sql = 'SELECT * FROM Oeufs'; // Remplacez 'your_table' par le nom de votre table
      db.query(sql, (err, result) => {
        if (err) {
          res.status(500).send('Erreur lors de la récupération des données');
          return;
        }
        res.json(result);
      });
    });

// Route pour récupérer les données des différents produits laitiers
app.get('/api/laitiers', (req, res) => {
      const sql = 'SELECT * FROM Laitiers'; // Remplacez 'your_table' par le nom de votre table
      db.query(sql, (err, result) => {
        if (err) {
          res.status(500).send('Erreur lors de la récupération des données');
          return;
        }
        res.json(result);
      });
    });


app.listen(3000, () => {
  console.log('Serveur à l\'écoute sur le port 3000');
});
