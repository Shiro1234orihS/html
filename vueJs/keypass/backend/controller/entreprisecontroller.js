// Charge le module MySQL pour Node.js
var mysql = require('mysql');

// Définit les options de connexion à la base de données MySQL
// Utilise les variables d'environnement si disponibles, sinon utilise les valeurs par défaut
var connectionOptions = {
    host:  'localhost',
    port:  '3306',
    user:  'root',
    password:  'root',
    database: 'call'
};


// Fonction d'inscription
function addentreprises(req, res) {
    var connection = mysql.createConnection(connectionOptions);

    console.log(req.body)
    
   
    
    var queryStr = 'INSERT INTO `ENTREPRISE` ( `NOMENTREPRISE`, `TICKETENTREPRISE`) VALUES ( ?, ?)';
    var queryStr2 = 'INSERT INTO `SUIVRE` (`IDCONNCTION `, `IDENTREPRIS`) VALUES (?, ?)'
    connection.connect();
    
    connection.query(queryStr, [req.body.utilisateurID, req.body.utilisateurPSEUDO, req.body.NOMUTILISATEUR, req.body.utilisateurBIRTHDAY, req.body.utilisateurPASSWORD, req.body.utilisateurROLE, req.body.utilisateurPREMIUM], function (error, results, fields) {
       if (error) {
          console.error('Une erreur est survenue lors de la requête à la base de données:', error);
          res.status(500).json({ error: "Une erreur interne est survenue" });
          return;
       }
      
       res.status(200).json({ message: "Utilisateur enregistré avec succès" });
    });

    connection.query(queryStr, [req.body.utilisateurID, req.body.utilisateurPSEUDO, req.body.NOMUTILISATEUR, req.body.utilisateurBIRTHDAY, req.body.utilisateurPASSWORD, req.body.utilisateurROLE, req.body.utilisateurPREMIUM], function (error, results, fields) {
        if (error) {
           console.error('Une erreur est survenue lors de la requête à la base de données:', error);
           res.status(500).json({ error: "Une erreur interne est survenue" });
           return;
        }
       
        res.status(200).json({ message: "Utilisateur enregistré avec succès" });
     });
   
    connection.end();
}


// Exporte les fonctions pour qu'elles puissent être utilisées dans d'autres fichiers du projet
module.exports = {addentreprises};