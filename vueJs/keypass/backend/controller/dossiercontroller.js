// Charge le module MySQL pour Node.js
var mysql = require('mysql');

// Définit les options de connexion à la base de données MySQL
var connectionOptions = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'bsRt(bP)*h5yTB!A',
    database: 'keypass'
};

// Création d'un pool de connexions MySQL pour une meilleure gestion des ressources.
const pool = mysql.createPool(connectionOptions);

// Fonction pour obtenir toutes les applications
function getdossier(req, res) {
    var query = 'SELECT * FROM `DOSSIER`';

    pool.query(query, function (error, results, fields) {
        if (error) {
            console.error('Une erreur est survenue lors de la requête à la base de données:', error);
            res.status(500).json({ error: "Une erreur interne est survenue" });
            return;
        } else if (results.length === 0) {
            res.status(404).json({ message: "Aucune application trouvée" });
        } else {
            res.status(200).json(results);
        }
    });
}

// Fonction pour obtenir une application par ID utilisateur
function getdossierid(req, res) {
    var query = 'SELECT ap.IDDOSSIER ,NOMDOSSIER FROM `DOSSIER`  ap  JOIN `DETIENT` dt ON ap.IDDOSSIER = dt.IDDOSSIER JOIN `UTILISATEUR`  ut ON ut.IDUTILISTEUR = dt.IDUTILISTEUR WHERE ut.IDUTILISTEUR = ?';
    var userId = req.params.id; 

    pool.query(query,[userId], function (error, results, fields) {
        if (error) {
            console.error('Une erreur est survenue lors de la requête à la base de données:', error);
            res.status(500).json({ error: "Une erreur interne est survenue" });
            return;
        } else if (results.length === 0) {
            res.status(404).json({ message: "Aucune application trouvée" });
        } else {
            res.status(200).json(results);
        }
    });
}

// Fonction d'ajout d'application
function adddossier(req, res) {
    const queryStr1 = 'INSERT INTO `DOSSIER` (`NOMDOSSIER`, `IDPAREND`) VALUES (?, ?)';
    const queryStr2 = 'SELECT IDDOSSIER FROM DOSSIER WHERE NOMDOSSIER = ?';
    const queryStr3 = 'INSERT INTO `DETIENT` (`IDDOSSIER`, `IDUTILISTEUR`) VALUES (?, ?)';

    pool.query(queryStr1, [req.body.NOMDOSSIER, req.body.IDPAREND], function(error, results, fields) {
        if (error) {
            console.error('Une erreur est survenue lors de la requête à la base de données:', error);
            res.status(500).json({ error: "Une erreur interne est survenue" });
            return;
        }

        // Récupérer l'ID du dossier nouvellement créé
        pool.query(queryStr2, [req.body.NOMDOSSIER], function(error, results, fields) {
            if (error) {
                console.error('Une erreur est survenue lors de la requête à la base de données:', error);
                res.status(500).json({ error: "Une erreur interne est survenue" });
                return;
            }

            const iddossierBaseDonnes = results[0].IDDOSSIER;

            // Insérer dans la table DETIENT
            pool.query(queryStr3, [iddossierBaseDonnes, req.body.IDUTILISATEUR], function(error, results, fields) {
                if (error) {
                    console.error('Une erreur est survenue lors de la requête à la base de données:', error);
                    res.status(500).json({ error: "Une erreur interne est survenue" });
                    return;
                }

                res.status(200).json({ message: "Dossier ajouté avec succès" });
            });
        });
    });
}






// Fonction de suppression d'application
function delectepass(req, res) {
    var appId = req.params.id; // Supposant que l'ID de l'application est passé en paramètre de la requête
    var query = 'DELETE FROM `APP` WHERE `IDAPP` = ?';

    pool.query(query, [appId], function (error, results, fields) {
        if (error) {
            console.error('Une erreur est survenue lors de la requête à la base de données:', error);
            res.status(500).json({ error: "Une erreur interne est survenue" });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: "Aucune application trouvée à supprimer" });
        } else {
            res.status(200).json({ message: "Application supprimée avec succès" });
        }
        console.log(query)
    });
}

// Fonction de mise à jour d'application
function updateApp(req, res) {
    
    const { NOMDOSSIER, IDPAREND} = req.body;

    if (!NOMDOSSIER || !IDPAREND ) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    var queryStr = 'UPDATE `DOSSIER` SET `NOMDOSSIER` = ?, `IDPAREND` = ?';
    
    pool.query(queryStr, [NOMDOSSIER, IDPAREND], function (error, results, fields) {
        
        if (error) {
            console.error('Une erreur est survenue lors de la requête à la base de données:', error);
            res.status(500).json({ error: "Une erreur interne est survenue" });
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).json({ message: "Aucune application trouvée pour mise à jour" });
        } else {
            res.status(200).json({ message: "Application mise à jour avec succès" });
        }
    });
}

// Exporte les fonctions pour qu'elles puissent être utilisées dans d'autres fichiers du projet
module.exports = { getdossier , getdossierid ,adddossier};
