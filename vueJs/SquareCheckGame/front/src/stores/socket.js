import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { io } from 'socket.io-client'; // Import correct

export const usesocketStore = defineStore('socket', () => {
  const socket = io('http://ricardonunesemilio.fr:3000', {
    withCredentials: true,
    transports: ['websocket'], // Utilisez WebSocket directement si disponible
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
    console.log(`Tentative de rejoindre la partie ${gameId}`);
    return new Promise((resolve, reject) => {
      // Écoute le début de la partie (confirmation du serveur)
      socket.once('game-start', (game) => {
        console.log(`Vous avez rejoint la partie ${game.id}`);
        resolve(game);
      });
  
      // Écoute les erreurs envoyées par le serveur
      socket.once('error', (error) => {
        console.error(`Erreur : ${error}`);
        reject(new Error(error));
      });
  
      // Émet l'événement pour rejoindre une partie
      socket.emit('join-game', gameId);
    });
  }

  function disconnect(gameId, idPlayer){
    
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

  

  return { create, update, join };

});
