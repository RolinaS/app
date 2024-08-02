-------------------------
-- CREATION DES TABLES --
-------------------------

CREATE TABLE CategorieAliment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL
);

CREATE TABLE Aliment(
     id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    proteines DECIMAL(5, 2),
    glucides DECIMAL(5, 2),
    lipides DECIMAL(5, 2),
    kcal DECIMAL(5, 2),
    categorie_id INT,
    FOREIGN KEY (categorie_id) REFERENCES CategorieAliment(id)
);

CREATE TABLE Repas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL
);

CREATE TABLE Recette (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE Recette_Repas (
    recette_id INT,
    repas_id INT,
    FOREIGN KEY (recette_id) REFERENCES Recette(id),
    FOREIGN KEY (repas_id) REFERENCES Repas(id),
    PRIMARY KEY (recette_id, repas_id)
);

CREATE TABLE Recette_Aliment (
    recette_id INT,
    aliment_id INT,
    quantite DECIMAL(5, 2),
    FOREIGN KEY (recette_id) REFERENCES Recette(id),
    FOREIGN KEY (aliment_id) REFERENCES Aliment(id),
    PRIMARY KEY (recette_id, aliment_id)
);

---------------------------
-- INSERTION DES DONNEES --
---------------------------

INSERT INTO CategorieAliment (nom) VALUES ('Fruits');
INSERT INTO CategorieAliment (nom) VALUES ('Légumes');
INSERT INTO CategorieAliment (nom) VALUES ('Viandes');
INSERT INTO CategorieAliment (nom) VALUES ('Poissons');
INSERT INTO CategorieAliment (nom) VALUES ('Oeufs');
INSERT INTO CategorieAliment (nom) VALUES ('Féculents');
INSERT INTO CategorieAliment (nom) VALUES ('Noix');
INSERT INTO CategorieAliment (nom) VALUES ('Boissons');
INSERT INTO CategorieAliment (nom) VALUES ('Condiments');
INSERT INTO CategorieAliment (nom) VALUES ('Herbes et épices');
INSERT INTO CategorieAliment (nom) VALUES ('Laitiers');
INSERT INTO CategorieAliment (nom) VALUES ('Céréales');
INSERT INTO CategorieAliment (nom) VALUES ('Autres');

-- Insertion des fruits
INSERT INTO Aliment (nom, proteines, glucides, lipides, kcal, categorie_id) VALUES 
('Kiwi', 1.2, 8.5, 0.6, 59, 1),
('Abricot', 1, 13.7, 0.4, 63, 1),
('Mangue', 0.6, 13.7, 0.31, 64.4, 1),
('Melon', 0.73, 6.57, 0.2, 33, 1),
('Orange', 1.1, 7.92, 0.36, 47, 1),
('Clementine', 0.8, 11.9, 0.2, 52.6, 1),
('Pastèque', 0.62, 7.38, 0.13, 34.9, 1),
('Pêche', 1, 9, 0.3, 42.7, 1),
('Poire', 0.3, 10.4, 0.1, 44, 1),
('Pomme', 0.5, 11.5, 0.5, 53.5, 1),
('Prune', 0.66, 8.83, 0.3, 35, 1),
('Raisin', 0.72, 15.7, 0.16, 66.5, 1),
('Ananas', 0.5, 11, 0.25, 53, 1);

-- Insertion des féculents
INSERT INTO Aliment (nom, proteines, glucides, lipides, kcal, categorie_id) VALUES 
('Pâtes blanches', 11.5, 65.8, 1.8, 336, 6),
('Riz blanc', 7, 78, 0.9, 352, 6),
('Patate', 2.2, 15.2, 0.2, 76.6, 6),
('Patate douce', 1.5, 18.3, 0.15, 86.3, 6),
('Lentilles', 25.4, 50.6, 1.34, 332, 6);

-- Insertion des légumes
INSERT INTO Aliment (nom, proteines, glucides, lipides, kcal, categorie_id) VALUES 
('Tomate', 0.8, 2.25, 0.25, 18.5, 2),
('Brocoli', 4, 1.7, 0.5, 36, 2),
('Avocat', 1.6, 3.7, 16.8, 155, 2),
('Concombre', 0.58, 1.5, 0.2, 11.5, 2),
('Épinard', 2.62, 2.25, 0.5, 28.7, 2),
('Haricot vert', 1.8, 3.85, 0.2, 31, 2),
('Maïs', 3.28, 19.8, 0.78, 105, 2),
('Oignon', 1.1, 6.25, 0.62, 39, 2),
('Petit pois', 5.84, 7, 0.55, 67.3, 2);

-- Insertion des noix
INSERT INTO Aliment (nom, proteines, glucides, lipides, kcal, categorie_id) VALUES 
('Noix', 13.3, 6.9, 67.3, 709, 7),
('Noix de cajou', 15.2, 26.7, 49.5, 632, 7),
('Amandes', 21.1, 8.72, 53.9, 638, 7);

-- Insertion des oeufs
INSERT INTO Aliment (nom, proteines, glucides, lipides, kcal, categorie_id) VALUES 
('Œuf entier', 13.5, 0, 9, 134, 5);

-- Insertion des poissons
INSERT INTO Aliment (nom, proteines, glucides, lipides, kcal, categorie_id) VALUES 
('Saumon', 20.5, 0, 12.4, 194, 4),
('Thon', 24, 0, 5.4, 144, 4),
('Sardine', 19.5, 0, 5.4, 163, 4);

-- Insertion des viandes
INSERT INTO Aliment (nom, proteines, glucides, lipides, kcal, categorie_id) VALUES 
('Steak haché 5%', 21.9, 0.3, 4.6, 130, 3),
('Poulet poitrine', 23.5, 0.45, 1.35, 108, 3),
('Dinde escalope', 24.1, 0.5, 1.22, 109, 3);

INSERT INTO Repas (nom) VALUES
('Petit-déjeuner'),
('Déjeuner'),
('Dîner'),
('Collation');


