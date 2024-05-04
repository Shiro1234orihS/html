// Importation des modules nécessaires
var mysql = require('mysql');
const express = require('express');


// Initialisation d'Express
const app = express();

app.use(express.json()); // Permet de parser les requêtes en JSON. C'est un middleware pour Express.

// Importation des contrôleurs. 
const Utilisateurcontroller = require('./controller/utilisateurcontroller'); 


// Configuration pour éviter les erreurs CORS en autorisant les requêtes de n'importe quelle origine.
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Credentials', true);
   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
   next();
});

// Définition du port.
const port = 8005;

// Paramètres de connexion à la base de données MySQL. 
const mysqlHost =  'localhost';
const mysqlUser =  'root';
const mysqlPass =  'root';
const mysqlDB = 'call';

// Options de connexion à la base de données MySQL
const  connectionOptions = {
   host: mysqlHost,
   user: mysqlUser,
   password: mysqlPass,
   database: mysqlDB
};

var con = mysql.createConnection({
   host: mysqlHost,
   user: mysqlUser,
   password: mysqlPass,
   database: mysqlDB
 });

// Route racine envoyant le fichier index.html.
app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

//------------------------------------------------------------//
//--------------Création des différentes routes --------------//
//------------------------------------------------------------//


// Routes pour la gestion des utilisateurs
app.post('/login', Utilisateurcontroller.login); // Authentification d'un utilisateur
app.post('/register', Utilisateurcontroller.register); // Enregistrement d'un nouvel utilisateur
app.get('/users', Utilisateurcontroller.getutilisateur); // Récupération de la liste des utilisateurs
app.get('/users/:id', Utilisateurcontroller.getuserById); // Récupération de la liste des utilisateurs



// Démarrage du serveur sur le port spécifié
app.listen(port, function () {
   console.log('Sample mySQL app listening on port ' + port);
   
});