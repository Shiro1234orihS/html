// Charge le module MySQL pour Node.js
var mysql = require('mysql');

// Définit les options de connexion à la base de données MySQL
// Utilise les variables d'environnement si disponibles, sinon utilise les valeurs par défaut
var connectionOptions = {
    host:  'localhost',
    port:  '3306',
    user:  'root',
    password:  'bsRt(bP)*h5yTB!A',
    database: 'keypass'
};

// Fonction de connexion
function login(req, res) {
   
   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `UTILISATEUR` WHERE `NOMUTILISATEUR` = ? AND `MOTPASSUTILISATEUR` = ?';
   connection.connect();   
   connection.query(queryStr, [req.body.name, req.body.password], function (error, results, fields) {
      if (error) {
        console.error('Une erreur est survenue lors de la requête à la base de données:', error);
        res.status(500).json({ error: "Une erreur interne est survenue" });
        return;
      }    
      if (results.length == 0) {
         res.status(404).json({ message: "Nom d'UTILISATEUR ou mot de passe incorrect" });
         return;
      }    
      // Peut-être afficher le résultat pour le débogage, mais soyez prudent avec les informations sensibles
      console.log('Résultat de la requête:', results); 
      res.status(200).json(results);
   });
   connection.end();
}

// Fonction d'inscription
function register(req, res) {
    var connection = mysql.createConnection(connectionOptions);

    console.log(req.body)

    
    var queryStr = 'INSERT INTO `UTILISATEUR` (`NOMUTILISATEUR`, `MOTPASSUTILISATEUR`) VALUES (?,?)';
    
    connection.connect();
    
    connection.query(queryStr, [ req.body.NOMUTILISATEUR, req.body.MOTPASSUTILISATEUR], function (error, results, fields) {
       if (error) {
          console.error('Une erreur est survenue lors de la requête à la base de données:', error);
          res.status(500).json({ error: "Une erreur interne est survenue" });
          return;
       }
       console.log(results)
       res.status(200).json({ message: "UTILISATEUR enregistré avec succès" });
    });
   
    connection.end();
}

// Fonction pour récupérer les UTILISATEUR de la base de données
function getutilisateur(req, res) {
   console.log("etst")
   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `UTILISATEUR`';

   connection.connect();

   connection.query(queryStr, function (error, results, fields) {
 
   if (error) {
      console.error('Une erreur est survenue lors de la requête à la base de données:', error);
      res.status(500).json({ error: "Une erreur interne est survenue" });
      return;
   }
   if (results.length == 0) {
      res.status(404).json({ message: "Aucun UTILISATEUR trouvé" });
      return;
   }
 
      res.status(200).json(results);
   });
 
   connection.end();
}

function getuserById(req, res) {
   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `UTILISATEUR` WHERE UTILISATEURID = ?';

   connection.connect();   
   connection.query(queryStr, [req.params.id], function (error, results, fields) {
   
      if (error) {
         console.error('Une erreur est survenue lors de la requête à la base de données:', error);
         res.status(500).json({ error: "Une erreur interne est survenue" });
         return;
      }    
      if (results.length == 0) {
         res.status(404).json({ message: "Attention probléme de ID" });
         return;
      }    
      // Peut-être afficher le résultat pour le débogage, mais soyez prudent avec les informations sensibles
      console.log('Résultat de la requête:', results); 
      res.status(200).json(results);
   });
   
   connection.end();
}


// Exporte les fonctions pour qu'elles puissent être utilisées dans d'autres fichiers du projet
module.exports = { login, register,getutilisateur,getuserById };