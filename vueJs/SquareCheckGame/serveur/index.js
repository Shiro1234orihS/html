class Player{
    constructor( id, pseudo ,etats,privat ,password ){
        this.idPlayer = id;
        this.pseudo = pseudo;
        this.etats = etats;
        this.private = privat;
        this.password = password;
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
        nombreMaxJoueur: 3 ,
        private : true,
        password : "1234"
    },
    '2': { 
        id: '2', 
        name: 'Partie 2', 
        status: 'playing', 
        players: [], 
        nombreMaxJoueur: 3 ,
        private : false,
        password : null
    },
};

io.on('connection', (socket) => {
    //console.log('Un utilisateur s\'est connecté :', socket.id);

    // Convertir les parties en tableau et les envoyer
    const gamesArray = Object.values(games); // Conversion de l'objet `games` en tableau
    //console.log('Envoi des jeux actuels :', gamesArray); // Log pour vérifier les données
    socket.emit('update-games', gamesArray);

    socket.on('request-games', () => {
        //console.log('Demande de mise à jour des parties reçue');
        // socket.emit('update-games', Object.values(games)); // Envoie l'état actuel des parties
    });
    
    // Création d'une nouvelle partie
    socket.on('create-game', (data) => {
        const gameId = `game-${gameIdCounter++}`;
        if (games[gameId]) return; // Évite la recréation d'une partie existante
        
        games[gameId] = {
          id: gameId, // **Assurez-vous que l'ID est correctement défini ici**
          name: data.name || `Partie ${gameId}`,
          status: 'waiting',
          players: [],
          nombreMaxJoueur: data.nombre || 3,
        };
        console.log(`Partie créée : ${gameId}`, games[gameId]);
        // On envoie bien l'objet contenant l'id de la partie
        socket.emit('game-created', games[gameId]); // Notifie uniquement le créateur
        io.emit('update-games', Object.values(games)); // Notifie tous les clients
    });

    // Rejoindre une partie
    socket.on('join-game', (gameId, pseudo) => {
        const game = games[gameId]; 
        if (!game) return socket.emit('error', `La partie avec l'ID ${gameId} n'existe pas.`);
        
        if (game.players.length >= game.nombreMaxJoueur) return socket.emit('error', `La partie ${game.name} est pleine.`);
        
        const newPlayer = new Player(socket.id, pseudo || `Joueur-${socket.id}`, "Pas prêt");
        game.players.push(newPlayer);
        
        if (game.players.length === game.nombreMaxJoueur) {
          game.status = 'playing'; 
        }
        
        socket.join(gameId);
        
        // 🔥 Correction : notifier TOUS les joueurs de la salle, y compris joueur A et B
        io.to(gameId).emit('player-joined', game); // Envoie toute la partie (y compris la liste des joueurs)
        io.emit('update-games', Object.values(games)); // Met à jour la liste des parties sur l'accueil
        console.log(`Joueur ${newPlayer.pseudo} a rejoint la partie ${gameId}`);
    });

    socket.on('updateState-player', (gameId) => {
        const game = games[gameId];
        if (!game) {
          return socket.emit('error', `La partie avec l'ID ${gameId} n'existe pas.`);
        }
      
        const playerIndex = game.players.findIndex((p) => p.idPlayer === socket.id);
      
        if (playerIndex === -1) {
          return socket.emit('error', `Le joueur avec l'ID ${socket.id} n'est pas dans cette partie.`);
        }
      
        const player = game.players[playerIndex];
        player.etats = player.etats === "Pas prêt" ? "Prêt !" : "Pas prêt";
      
        io.to(gameId).emit('updateState-player', game);
        console.log(`Statut mis à jour pour le joueur ${player.idPlayer} : ${player.etats}`);
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
        console.log( game.players);

        // Vérifier le statut de la partie
        if (game.players.length < game.nombreMaxJoueur) {
            game.status = 'waiting'; // Change le statut si la partie n'est plus complète
        }
    
        socket.leave(gameId); // Le joueur quitte la salle
        io.to(gameId).emit('player-left', { gameId, playerId: socket.id }); // Notifie les joueurs dans la salle
        io.emit('update-games', Object.values(games)); // Met à jour la liste des parties
        //console.log(`Joueur ${socket.id} a quitté la partie ${gameId}`);
        
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
        //console.log(`Le statut du joueur ${socket.id} a été mis à jour : ${etats}`);
    });

    // socket.on('disconnect', () => {
    //     Object.keys(games).forEach((gameId) => {
    //         const game = games[gameId];
    //         game.players = game.players.filter((player) => player !== socket.id);
    
    //         if (game.players.length === 0) {
    //             delete games[gameId]; // Supprime la partie si aucun joueur n'est présent
    //         } else {
    //             game.status = 'waiting'; // Retour à "en attente" si la partie n'est plus complète
    //         }
    //     });
    
    //     // io.emit('update-games', Object.values(games)); // Notifie tous les clients
    //     //console.log(`Utilisateur déconnecté : ${socket.id}`);
    // });

    socket.on('start-game', (gameId) => {
        const game = games[gameId];
        if (!game) {
          return socket.emit('error', `La partie avec l'ID ${gameId} n'existe pas.`);
        }
    
        // Vérifier que le joueur est le premier dans la liste
        const firstPlayer = game.players[0];
        if (!firstPlayer || firstPlayer.idPlayer !== socket.id) {
          return socket.emit('error', 'Seul le premier joueur peut lancer la partie.');
        }
    
        // Vérifier que tous les joueurs sont "Prêt !"
        const allPlayersReady = game.players.every(player => player.etats === 'Prêt !');
        if (!allPlayersReady) {
          return socket.emit('error', 'Tous les joueurs doivent être prêts pour lancer la partie.');
        }
    
        // Changer le statut de la partie à "playing"
        game.status = 'playing';
        console.log(`La partie ${gameId} a démarré !`);
    
        // Notifie tous les joueurs de la salle que la partie a commencé
        io.to(gameId).emit('game-started', game);
        io.emit('update-games', Object.values(games)); // Met à jour la liste des parties
    });
});

server.listen(3002, () => {
    //console.log('Serveur en écoute sur http://localhost:3000');
});



