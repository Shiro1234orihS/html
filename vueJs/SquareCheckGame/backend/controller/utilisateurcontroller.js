// Charge le module MySQL pour Node.js

const mysql = require('mysql');
const express = require('express');

// Définit les options de connexion à la base de données MySQL
// Utilise les variables d'environnement si disponibles, sinon utilise les valeurs par défaut
var connectionOptions = {
   host:  '127.0.0.1',
   port:  '3306',
   user:  'root',
   password:  'bsRt(bP)*h5yTB!A',
   database: 'squareechec'
};

// Fonction de connexion
function login(req, res) {
   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `utilisateur` WHERE `pseudo` = ? AND `motDePasse` = ?';

   connection.connect();   
   connection.query(queryStr, [req.body.speudo, req.body.motDePasse], function (error, results, fields) {
      if (error) {
         console.error('Une erreur est survenue lors de la requête à la base de données:', error);
         res.status(500).json({ error: "Une erreur interne est survenue" });
         return;
      }    
      if (results.length == 0) {
         res.status(404).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
         return;
      }    
      // Peut-être afficher le résultat pour le débogage, mais soyez prudent avec les informations sensibles
      console.log('Résultat de la requête:', results); 
      res.status(200).json(results);
   });

   connection.end();
}

// Fonction d'inscription
async function register(req, res) {
   const connection = mysql.createConnection(connectionOptions);
   
   const token = methodecrypto.generateToken();
   let encryptedPassword;
   
   try {
      encryptedPassword = await methodecrypto.cryptageMotsPasseUsers(req.body.MOTPASSUTILISATEUR);
   } catch (error) {
      console.error('Erreur lors du cryptage du mot de passe:', error);
      res.status(500).json({ error: "Une erreur interne est survenue lors du cryptage du mot de passe" });
      return;
   }
   
   console.log('Mot de passe crypté:', encryptedPassword);
   console.log('Token généré:', token);
   
   const queryStr = 'INSERT INTO `UTILISATEUR` (`NOMUTILISATEUR`, `MOTPASSUTILISATEUR`, `TOKEN`) VALUES (?,?,?)';

   connection.connect((err) => {
       if (err) {
           console.error('Erreur de connexion à la base de données:', err);
           res.status(500).json({ error: "Erreur de connexion à la base de données" });
           return;
       }

       connection.query(queryStr, [req.body.NOMUTILISATEUR, encryptedPassword, token], function (error, results, fields) {
           if (error) {
               console.error('Une erreur est survenue lors de la requête à la base de données:', error);
               res.status(500).json({ error: "Une erreur interne est survenue" });
               return;
           }

           console.log('Résultats de la requête:', results);
           res.status(200).json({ message: "UTILISATEUR enregistré avec succès", token: token });
       });

       connection.end((err) => {
           if (err) {
               console.error('Erreur lors de la fermeture de la connexion à la base de données:', err);
           }
       });
   });
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