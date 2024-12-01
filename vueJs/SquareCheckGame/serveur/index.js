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
    '1': { id: '1', name: 'Partie 1', status: 'waiting', players: [], nombre: 3 },
    '2': { id: '2', name: 'Partie 2', status: 'playing', players: [],nombre: 3 },
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
        const maxPlayers = 10; // Limite globale pour éviter les abus
        games[gameId] = {
            id: gameId,
            name: data.name || `Partie ${gameId}`,
            status: 'waiting',
            players: [socket.id],
            nombre: Math.min(Math.max(data.nombre || 3, 1), maxPlayers), // Limite entre 1 et maxPlayers
        };
    
        socket.join(gameId);
        console.log(`Partie créée : ${gameId}`, games[gameId]);
        io.emit('update-games', Object.values(games)); // Notifie tous les clients
        socket.emit('game-created', games[gameId]); // Notifie le créateur
    });

    // Rejoindre une partie
    socket.on('join-game', (gameId) => {
        const game = games[gameId];
    
        if (game) {
            if (game.players.length < game.nombre) {
                game.players.push(socket.id);
    
                if (game.players.length === game.nombre) {
                    game.status = 'playing'; // Change le statut si la partie est complète
                }
    
                socket.join(gameId);
                io.to(gameId).emit('game-start', game); // Notifie les joueurs de la partie
                io.emit('update-games', Object.values(games)); // Met à jour la liste des parties
            } else {
                socket.emit('error', `La partie ${game.name} est pleine.`);
            }
        } else {
            socket.emit('error', `La partie avec l'ID ${gameId} n'existe pas.`);
        }
    });

    socket.on('disconnect', () => {
        Object.keys(games).forEach((gameId) => {
            const game = games[gameId];
            game.players = game.players.filter((player) => player !== socket.id);
    
            if (game.players.length === 0) {
                delete games[gameId]; // Supprime la partie si aucun joueur n'est présent
            } else {
                game.status = 'waiting'; // Retour à "en attente" si la partie n'est plus complète
            }
        });
    
        io.emit('update-games', Object.values(games)); // Notifie tous les clients
        console.log(`Utilisateur déconnecté : ${socket.id}`);
    });
});

server.listen(3000, () => {
    console.log('Serveur en écoute sur http://localhost:3000');
});
