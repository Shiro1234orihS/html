const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://ricardonunesemilio.fr'],// Autorise les domaines spécifiques
        methods: ['GET', 'POST'], // Autorise ces méthodes HTTP
    },
});

app.use(express.static('public'));

// let games = {}; // Stocker les parties
let gameIdCounter = 1;
const games = {
    '1': { id: '1', name: 'Partie 1', status: 'waiting', players: [] },
    '2': { id: '2', name: 'Partie 2', status: 'playing', players: [] },
};

io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté :', socket.id);

    // Convertir les parties en tableau et les envoyer
    const gamesArray = Object.values(games); // Conversion de l'objet `games` en tableau
    console.log('Envoi des jeux actuels :', gamesArray); // Log pour vérifier les données
    socket.emit('update-games', gamesArray);

    socket.on('request-games', () => {
        console.log('Demande de mise à jour des parties reçue');
        socket.emit('update-games', Object.values(games)); // Envoie l'état actuel des parties
    });
    
    // Création d'une nouvelle partie
    socket.on('create-game', (data) => {
        const gameId = `game-${gameIdCounter++}`;
        games[gameId] = {
            id: gameId,
            name: data.name || `Partie ${gameId}`,
            status: 'waiting', // 'waiting' = En attente de joueurs, 'playing' = En cours
            players: [socket.id], // Le créateur de la partie
        };
        socket.join(gameId);
        console.log(`Partie créée : ${gameId}`);
        io.emit('update-games', games); // Notifie tous les clients de la mise à jour des parties
        socket.emit('game-created', games[gameId]); // Notifie le créateur de la partie
    });

    // Rejoindre une partie
    socket.on('join-game', (gameId) => {
        const game = games[gameId];
        if (game && game.players.length < 2) {
            game.players.push(socket.id);
            game.status = 'playing'; // La partie commence si deux joueurs sont présents
            socket.join(gameId);
            io.to(gameId).emit('game-start', game); // Notifie tous les joueurs de la partie qu'elle a démarré
            io.emit('update-games', games); // Met à jour la liste des parties
        } else {
            socket.emit('error', 'Impossible de rejoindre la partie.');
        }
    });

    // Déconnexion d'un joueur
    socket.on('disconnect', () => {
        Object.keys(games).forEach((gameId) => {
            const game = games[gameId];
            game.players = game.players.filter((player) => player !== socket.id);
            if (game.players.length === 0) {
                delete games[gameId]; // Supprime la partie si aucun joueur n'est présent
            } else if (game.players.length === 1) {
                game.status = 'waiting'; // Retour à "en attente"
            }
        });
        io.emit('update-games', games); // Notifie tous les clients
        console.log(`Utilisateur déconnecté : ${socket.id}`);
    });
});

server.listen(3000, () => {
    console.log('Serveur en écoute sur http://localhost:3000');
});
