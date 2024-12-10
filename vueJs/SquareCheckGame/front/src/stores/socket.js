import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { io } from 'socket.io-client'; // Import correct


export const usesocketStore = defineStore('socket', () => {
  const socket = io('http://ricardonunesemilio.fr:3001', { //http://10.0.2.15:3001/
    withCredentials: true,
    transports: ['websocket'], // Utilisez WebSocket directement si disponible
  });

  const state = ref({
    allserver: [], 
  });

  // Log pour vérifier la connexion
  socket.on('connect', () => {
    console.log('Connecté au serveur Socket.IO');
  });

  function update() {
    console.log("La méthode update() a été appelée");
    return new Promise((resolve, reject) => {
      socket.once('update-games', (games) => {
        console.log("Données reçues via l'événement 'update-games':", games);
        if (games) {
          resolve(games);
        } else {
          reject(new Error("Aucun jeu reçu"));
        }
      });
  
      console.log("Émission de l'événement 'request-games'");
      socket.emit('request-games');
    });
  }

  function join(gameId) {
    const pseudo = "test";
    console.log(`Tentative de rejoindre la partie ${gameId}`);
    return new Promise((resolve, reject) => {
      // Écoute la confirmation du serveur
      socket.once('player-joined', (player) => {
        console.log(`Vous avez rejoint la partie ${gameId} :`, player);
        resolve(player);
      });

      socket.once('error', (error) => {
        console.error(`Erreur lors de la tentative de rejoindre la partie : ${error}`);
        reject(new Error(error));
      });

      // Émet l'événement pour rejoindre une partie
      socket.emit('join-game', gameId, pseudo);
    });
  }

  function updateStatePlayer(gameId) {
    console.log(`Changement du statut dans la partie ${gameId}`);
    return new Promise((resolve, reject) => {
      // Écoute la confirmation du serveur pour le changement de statut
      socket.once('player-status-updated', (player) => {
        console.log(`Statut mis à jour pour le joueur ${player.playerId} : ${player.etats}`);
        resolve(player);
      });
  
      // Écoute les erreurs envoyées par le serveur
      socket.once('error', (error) => {
        console.error(`Erreur lors du changement de statut : ${error}`);
        reject(new Error(error));
      });
  
      // Émet l'événement pour demander le changement de statut
      socket.emit('updateState-player', gameId);
    });
  }
  
  // Déconnexion d'une partie
  function disconnect(gameId) {
    console.log(`Tentative de déconnexion de la partie ${gameId}`);
    return new Promise((resolve, reject) => {
      // Écoute la confirmation de déconnexion
      socket.once('player-disconnected', (response) => {
        console.log(`Déconnexion réussie de la partie ${gameId}`);
        resolve(response);
      });

      socket.once('error', (error) => {
        console.error(`Erreur lors de la tentative de déconnexion : ${error}`);
        reject(new Error(error));
      });

      // Émet l'événement pour se déconnecter d'une partie
      socket.emit('disconnect-game', gameId);
    });
  }

  function create(data) {
    console.log("Création d'une nouvelle partie");
    return new Promise((resolve, reject) => {
      // Écoute la confirmation du serveur pour la création
      socket.once('game-created', (game) => {
        console.log(`Partie créée avec succès : ${game.id}`);
        resolve(game);
      });
  
      socket.once('error', (error) => {
        console.error(`Erreur lors de la création de la partie : ${error}`);
        reject(new Error(error));
      });
  
      // Émet l'événement pour créer une nouvelle partie
      socket.emit('create-game', data);
    });
  }

  function startGame(gameId) {
    console.log(`Lancement de la partie ${gameId}`);
    return new Promise((resolve, reject) => {
      // Écoute la confirmation du serveur pour le démarrage de la partie
      socket.once('game-started', (game) => {
        console.log(`La partie ${game.id} a démarré`);
        resolve(game);
      });
  
      socket.once('error', (error) => {
        console.error(`Erreur lors du lancement de la partie : ${error}`);
        reject(new Error(error));
      });
  
      // Émet l'événement pour demander le démarrage de la partie
      socket.emit('start-game', gameId);
    });
  }
  //Ecoute evenement 

  // Événement : mise à jour globale de la liste des serveurs
  socket.on('update-games', (games) => {
    state.value.allserver = games;
  });

  // 🔥 Écouter l'événement 'player-joined' et mettre à jour la partie correspondante
  socket.on('player-joined', (game) => {
    console.log(`Un joueur a rejoint la partie :`, game);
    
    // Trouver la partie mise à jour
    const index = state.value.allserver.findIndex((g) => g.id === game.id);
    if (index !== -1) {
      state.value.allserver[index] = game; // Met à jour la partie avec les nouvelles données
    }
  });
  
  socket.on('updateState-player', (game) => {
    console.log(`Un changement de status à étais fais `, game);
    
    // Trouver la partie mise à jour
    const index = state.value.allserver.findIndex((g) => g.id === game.id);
    if (index !== -1) {
      state.value.allserver[index] = game; // Met à jour la partie avec les nouvelles données
    }
  });

  socket.on('update-game-details', (updatedGame) => {
    console.log('Mise à jour des détails de la partie :', updatedGame);
    const index = state.value.allserver.findIndex(game => game.id === updatedGame.id);
    if (index !== -1) {
      state.value.allserver[index] = updatedGame; // Met à jour l'état de la partie dans la liste
    } else {
      state.value.allserver.push(updatedGame); // Si la partie n'existe pas, on l'ajoute
    }
  });

  return { create, update, join,disconnect, updateStatePlayer, startGame ,state, socket };

});


