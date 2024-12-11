<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
});

// Vous pouvez ajouter des fonctions pour chaque mode de jeu ici
const selectMode = (mode) => {
  if(mode === "1VS1 Bot"){
    router.push('/');
  } 
  else if(mode === "1VS1 Local"){
    router.push('/');
  } else {
    router.push('/allServer');
  }
};
</script>

<template>
  <div id="menu">
    <h1 class="menu-title">Choisissez un mode de jeu</h1>
    <div id="containt-button">
      <button class="selectionMode" @click="selectMode('1VS1 Bot')">1VS1 (Bot)</button>
      <button class="selectionMode" @click="selectMode('1VS1 Local')">1VS1 (Local)</button>
      <button class="selectionMode" @click="selectMode('1VS1 Multi')">1VS1 (Multi Joueur)</button>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: var(--color-background);
  color: var(--color-text-primary);
}

#menu {
  position: absolute;
  background-color: var(--color-surface);
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2em;
  overflow: hidden;
}

.menu-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5em;
  color: var(--color-text-primary);
}

#containt-button {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.selectionMode {
  padding: 15px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  border: none;
  transition: background-color 0.3s, transform 0.2s;
  text-align: center;
  width: 100%;
}

.selectionMode:hover {
  background-color: var(--color-secondary);
  transform: translateY(-3px);
}

.selectionMode:active {
  transform: translateY(0);
}

.selectionMode:focus {
  outline: 2px solid var(--color-primary);
}
</style>
