class Player{
    constructor( id, pseudo ,etats ){
        this.idPlayer = id;
        this.pseudo = pseudo;
        this.etats = etats;
    }


}

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
    '1': { 
        id: '1', 
        name: 'Partie 1', 
        status: 'waiting', 
        players: [new Player(1, "RIRI", "Pas prêt"), new Player(2, "Evan", "Prêt")], 
        nombreMaxJoueur: 3 
    },
    '2': { 
        id: '2', 
        name: 'Partie 2', 
        status: 'playing', 
        players: [], 
        nombreMaxJoueur: 3 
    },
};

io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté :', socket.id);

    // Convertir les parties en tableau et les envoyer
    const gamesArray = Object.values(games); // Conversion de l'objet `games` en tableau
    console.log('Envoi des jeux actuels :', gamesArray); // Log pour vérifier les données
    socket.emit('update-games', gamesArray);

    socket.on('request-games', () => {
        console.log('Demande de mise à jour des parties reçue');
        // socket.emit('update-games', Object.values(games)); // Envoie l'état actuel des parties
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
    socket.on('join-game', (gameId, pseudo) => {
        const game = games[gameId]; // Récupérer la partie par ID
        if (!game) {
            return socket.emit('error', `La partie avec l'ID ${gameId} n'existe pas.`);
        }
    
        if (game.players.length >= game.nombreMaxJoueur) {
            return socket.emit('error', `La partie ${game.name} est pleine.`);
        }
    
        // Ajouter le joueur comme instance de `Player`
        const newPlayer = new Player(socket.id, pseudo || `Joueur-${socket.id}`, "Pas prêt");
        game.players.push(newPlayer);
    
        // Vérifier si la partie est complète
        if (game.players.length === game.nombreMaxJoueur) {
            game.status = 'playing'; // Change le statut si la partie est complète
        }
    
        socket.join(gameId); // Le joueur rejoint la salle
        io.to(gameId).emit('game-start', game); // Notifie les joueurs dans la salle
        io.emit('update-games', Object.values(games)); // Met à jour la liste des parties
        console.log(`Joueur ${socket.id} a rejoint la partie ${gameId}`);
    });

    socket.on('disconnect-game', (gameId) => {
        const game = games[gameId]; // Récupérer la partie par ID
        if (!game) {
            return socket.emit('error', `La partie avec l'ID ${gameId} n'existe pas.`);
        }
    
        // Trouver le joueur à supprimer
        const playerIndex = game.players.findIndex((p) => p.idPlayer === socket.id);
    
        if (playerIndex === -1) {
            return socket.emit('error', `Le joueur avec l'ID ${socket.id} n'est pas dans cette partie.`);
        }
    
        // Supprimer le joueur
        game.players.splice(playerIndex, 1);
    
        // Vérifier le statut de la partie
        if (game.players.length < game.nombreMaxJoueur) {
            game.status = 'waiting'; // Change le statut si la partie n'est plus complète
        }
    
        socket.leave(gameId); // Le joueur quitte la salle
        io.to(gameId).emit('player-left', { gameId, playerId: socket.id }); // Notifie les joueurs dans la salle
        io.emit('update-games', Object.values(games)); // Met à jour la liste des parties
        console.log(`Joueur ${socket.id} a quitté la partie ${gameId}`);
    });

    socket.on('update-status', (gameId, etats) => {
        const game = games[gameId];
        if (!game) {
            return socket.emit('error', `La partie avec l'ID ${gameId} n'existe pas.`);
        }
    
        const player = game.players.find((p) => p.idPlayer === socket.id);
        if (!player) {
            return socket.emit('error', `Le joueur n'est pas dans cette partie.`);
        }
    
        // Met à jour le statut du joueur
        player.etats = etats;
        io.to(gameId).emit('player-status-updated', { playerId: socket.id, etats });
        io.emit('update-games', Object.values(games)); // Met à jour la liste des parties
        console.log(`Le statut du joueur ${socket.id} a été mis à jour : ${etats}`);
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
    
        // io.emit('update-games', Object.values(games)); // Notifie tous les clients
        console.log(`Utilisateur déconnecté : ${socket.id}`);
    });
});

server.listen(3000, () => {
    console.log('Serveur en écoute sur http://localhost:3000');
});



