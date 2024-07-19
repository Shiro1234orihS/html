// cryptage.js
const crypto = require('crypto');
const bcrypt = require('bcrypt')

const saltRounds = 10;

function cryptageMotsPasseUsers(motsDePASSE) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(motsDePASSE, saltRounds, function(err, hash) {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

function comparaition(plainPasswordSaisi, storedHash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPasswordSaisi, storedHash, function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                
                resolve(result);
            }
        });
    });
}


function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

function encrypt(data, key) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv);

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();

    return iv.toString('hex') + ':' + tag.toString('hex') + ':' + encrypted;
}

function decrypt(encryptedData, key) {
    const parts = encryptedData.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const tag = Buffer.from(parts[1], 'hex');
    const encryptedText = Buffer.from(parts[2], 'hex');

    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv);
    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}


function register(req, res) {
    const connection = mysql.createConnection(connectionOptions);

    const token = methodecrypto.generateToken()
    const encryptedPassword = methodecrypto.encrypt(req.body.MOTPASSUTILISATEUR, token);
    console.log(encryptedPassword)
    console.log(methodecrypto.decrypt(encryptedPassword,token) )
    const queryStr = 'INSERT INTO `UTILISATEUR` (`NOMUTILISATEUR`, `MOTPASSUTILISATEUR`, `TOKEN`) VALUES (?,?,?)';

    connection.connect();

    connection.query(queryStr, [req.body.NOMUTILISATEUR, encryptedPassword, token], function (error, results, fields) {
        if (error) {
            console.error('Une erreur est survenue lors de la requête à la base de données:', error);
            res.status(500).json({ error: "Une erreur interne est survenue" });
            return;
        }
        res.status(200).json({ message: "UTILISATEUR enregistré avec succès", token: token });
    });

    connection.end();
}


module.exports = {
    generateToken,
    encrypt,
    decrypt, 
    cryptageMotsPasseUsers,
    comparaition,
 
};
