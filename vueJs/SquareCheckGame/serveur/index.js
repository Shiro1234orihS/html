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
        players: [socket.id],
        nombreMaxJoueur: data.nombre || 3,
      };
     
      socket.join(gameId);
      console.log(`Partie créée : ${gameId}`, games[gameId]);
     
      // On envoie bien l'objet contenant l'id de la partie
      socket.emit('game-created', games[gameId]); // Notifie uniquement le créateur
      io.emit('update-games', Object.values(games)); // Notifie tous les clients
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
    
        // Créer une instance de Player pour le joueur qui rejoint
        const newPlayer = new Player(socket.id, pseudo || `Joueur-${socket.id}`, "Pas prêt");
    
        // Ajouter le joueur à la partie
        game.players.push(newPlayer);
        //console.log('liste de jouer :' , newPlayer)
        // Vérifier si la partie est complète
        if (game.players.length === game.nombreMaxJoueur) {
            game.status = 'playing'; // Change le statut si la partie est complète
        }
    
        socket.join(gameId); // Le joueur rejoint la salle
        io.to(gameId).emit('player-joined', newPlayer); // Notifie les joueurs de la salle qu'un nouveau joueur a rejoint
        io.emit('update-games', Object.values(games)); // Met à jour la liste des parties pour tous les clients
        //console.log(`Joueur ${newPlayer.pseudo} a rejoint la partie ${gameId}`);
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
  
      io.to(gameId).emit('player-status-updated', { playerId: player.idPlayer, etats: player.etats });
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
});

server.listen(3002, () => {
    //console.log('Serveur en écoute sur http://localhost:3000');
});



