

<script >
</script>

<template>
    <p>Nom du serveur : {{ server.name }}</p>
    <p>Joueurs : {{ server.players.length }} / 2</p>
    <p>Statut : {{ server.status }}</p>
    <button>Rejoindre le serveur</button>
</template>

<script setup>
defineProps({
  server: {
    type: Object,
    required: true
  }
});
</script>
