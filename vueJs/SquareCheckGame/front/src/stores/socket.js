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

  return { update };
});
