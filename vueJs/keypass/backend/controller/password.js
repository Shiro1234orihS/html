// Charge le module MySQL pour Node.js
var mysql = require('mysql');

// Définit les options de connexion à la base de données MySQL
// Utilise les variables d'environnement si disponibles, sinon utilise les valeurs par défaut
var connectionOptions = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'keypass'
};

// Fonction d'inscription
function addapp(req, res) {
    var connection = mysql.createConnection(connectionOptions);

    console.log(req.body);

    var queryStr = 'INSERT INTO `APP` (`IDUTILISTEUR`, `NOMAPP`,`UTILISATEURAPP`, `COMMENTAIRE`, `MOTPASSAPP`) VALUES (?,?, ?, ?, ?)';

    connection.query(queryStr, [req.body.IDUTILISTEUR, req.body.NOMAPP,req.body.UTILISATEURAPP, req.body.COMMENTAIRE, req.body.MOTPASSAPP], function (error, results, fields) {
        if (error) {
            console.error('Une erreur est survenue lors de la requête à la base de données:', error);
            res.status(500).json({ error: "Une erreur interne est survenue" });
            return;
        }

        res.status(200).json({ message: "Utilisateur enregistré avec succès" });
    });

    connection.end();
}

// Fonction pour obtenir toutes les applications
function getapp(req, res) {
    var connection = mysql.createConnection(connectionOptions);

    var query = 'SELECT * FROM `APP`';

    connection.connect(error => {
        if (error) {
            console.error('Une erreur est survenue lors de la connexion à la base de données:', error);
            res.status(500).json({ error: "Une erreur interne est survenue" });
            return;
        }

        connection.query(query, function (error, results, fields) {
            if (error) {
                console.error('Une erreur est survenue lors de la requête à la base de données:', error);
                res.status(500).json({ error: "Une erreur interne est survenue" });
            } else if (results.length === 0) {
                res.status(404).json({ message: "Aucun APP trouvé" });
            } else {
                res.status(200).json(results);
            }

            connection.end(err => {
                if (err) {
                    console.error('Une erreur est survenue lors de la fermeture de la connexion:', err);
                }
            });
        });
    });
}

// Fonction pour obtenir une application par ID utilisateur
function getappid(req, res) {
    var connect = mysql.createConnection(connectionOptions);

    var userId = req.params.id; // Supposant que l'ID utilisateur est passé en paramètre de la requête
    var query = 'SELECT * FROM `APP` WHERE `IDUTILISTEUR` = ?';

    connect.connect(error => {
        if (error) {
            console.error('Une erreur est survenue lors de la connexion à la base de données:', error);
            res.status(500).json({ error: "Une erreur interne est survenue" });
            return;
        }

        connect.query(query, [userId], function (error, results, fields) {
            if (error) {
                console.error('Une erreur est survenue lors de la requête à la base de données:', error);
                res.status(500).json({ error: "Une erreur interne est survenue" });
            } else if (results.length === 0) {
                res.status(404).json({ message: "Aucun APP trouvé" });
            } else {
                res.status(200).json(results);
            }

            connect.end(err => {
                if (err) {
                    console.error('Une erreur est survenue lors de la fermeture de la connexion:', err);
                }
            });
        });
    });
}

// Exporte les fonctions pour qu'elles puissent être utilisées dans d'autres fichiers du projet
module.exports = { addapp, getapp, getappid };
