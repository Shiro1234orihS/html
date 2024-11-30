const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Créez une application Express
const app = express();
const server = http.createServer(app);

// Initialisez Socket.IO
const io = new Server(server);

// Servir des fichiers statiques (optionnel)
app.use(express.static('public'));

// Quand un client se connecte
io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    // Écouter un événement
    socket.on('message', (data) => {
        console.log(`Message reçu : ${data}`);
        // Diffuser le message à tous les autres clients
        io.emit('message', data);
    });

    // Quand un client se déconnecte
    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

// Démarrer le serveur
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
