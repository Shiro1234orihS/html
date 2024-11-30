// Initialisation de Socket.IO
const socket = io();

socket.on('connect', () => {
    console.log('Connecté au serveur Socket.IO');
});

socket.on('disconnect', () => {
    console.log('Déconnecté du serveur Socket.IO');
});
