<template>
    <div id="infoServer">
        <p>Nom du serveur : {{ server.name }}</p>
        <p>Joueurs : {{ server.players.length }} / 2</p>
        <p>Statut : {{ server.status }}</p>
        <p>Nombre de joueur : {{ server.nombre }}/4</p>
        <button>Rejoindre le serveur</button>
    </div>
</template>

<script setup>
defineProps({
  server: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
#infoServer {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
    border: 1px solid var(--color-secondary);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

#infoServer:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

#infoServer p {
    margin: 5px 0;
    font-size: 16px;
    color: var(--color-text-secondary);
}

#infoServer p:first-child {
    font-weight: bold;
    color: var(--color-text-primary);
}

#infoServer button {
    background-color: var(--color-primary);
    color: var(--color-text-primary);
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
}

#infoServer button:hover {
    background-color: var(--color-secondary);
    transform: translateY(-2px);
}

#infoServer button:active {
    transform: translateY(0);
}
</style>
