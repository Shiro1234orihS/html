<script setup>
const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
});

// Vous pouvez ajouter des fonctions pour chaque mode de jeu ici
const selectMode = (mode) => {
  console.log(`Mode sélectionné : ${mode}`);
};
</script>

<template>
  <div id="menu">
    <div id="containt-button">
      <button class="selectionMode" @click="selectMode('1VS1 Bot')">1VS1 (Bot)</button>
      <button class="selectionMode" @click="selectMode('1VS1 Local')">1VS1 (Local)</button>
      <button class="selectionMode" @click="selectMode('1VS1 Multi')">1VS1 (Multi Joueur)</button>
    </div>
  </div>
</template>

<style scoped>
#menu {
  position: absolute;
  background-color: green;
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#containt-button {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
}

.selectionMode {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 25px;
}
</style>
