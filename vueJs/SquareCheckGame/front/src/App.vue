<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

const route = useRoute();

const isConnexionView = computed(() => {
  return !(route.name === 'connection' || route.name === 'creation');
});
</script>

<template>
 

  <div id="separateur">
    <!-- Sidebar -->
    <div class="silladbar"v-if="isConnexionView">
      <p @click="navigateTo('profil')">Profil</p>
      <p @click="navigateTo('ami')">Ami</p>
      <p @click="navigateTo('accueil')">Accueil</p>
    </div>
    <div>
      <RouterView />
    </div>
  </div>

  
</template>

<style scoped>
#separateur {
  display: flex;
  width: 100%;
  height: 100vh;
}

.silladbar {
  background-color: var(--color-surface);
  width: 20%;
  padding: 1em;
  color: var(--color-text-secondary);
}

.silladbar p {
  margin: 1em 0;
  cursor: pointer;
  color: var(--color-text-primary);
}
</style>