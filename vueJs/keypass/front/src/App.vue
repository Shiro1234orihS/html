<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

const route = useRoute();
const hiddenButtonsVisible = ref(false);

const isConnexionView = computed(() => {
  return !(route.name === 'connexion' || route.name === 'accountcreation');
});
</script>


<template>
  <div>
    <header v-if="isConnexionView">
        <nav>
            <button class="profile-button">Profil</button>
        </nav>
    </header>
    <RouterView/>
  </div>
  <div v-show="hiddenButtonsVisible" class="overlay"></div>
</template>
 

<style scoped>
/* Global Styles */
header {
  background: #2C3E50; /* Bleu Foncé */
  height: 75px;
  position: relative;
}

/* Navigation Styles */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

/* Profile Button Styles */
.profile-button {
  width: 60px;
  height: 60px;
  margin-right: 20px;
  border-radius: 100%;
  border: 2px solid #E74C3C; /* Rouge */
}

</style>
