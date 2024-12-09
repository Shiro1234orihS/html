<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import './assets/main.css';
</script>

<template>
  <!-- <header>
    <div class="wrapper"> 
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
  </header> -->

  <div id="separateur">
    <!-- Sidebar -->
    <!-- <div class="silladbar">
      <p @click="navigateTo('profil')">Profil</p>
      <p @click="navigateTo('ami')">Ami</p>
      <p @click="navigateTo('accueil')">Accueil</p>
    </div> -->
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