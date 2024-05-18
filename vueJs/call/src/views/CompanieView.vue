<script setup>
import { usePolyStore } from '@/stores/poly';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {companiesStore} from '@/stores/ companies'
import { ref, computed, watch  } from 'vue'

const router = useRouter();
const campanie = companiesStore();
const { oneData, fetchCompanyByTicker } = usePolyStore();

const ticket = ref("")
const iduser = localStorage.getItem('userId')

onMounted(() => {
  setTimeout(() => {
    const ticker = localStorage.getItem('Idticker');
    if (ticker) {
      fetchCompanyByTicker(ticker).catch(error => {
        console.error('Fetch error:', error);
      });
    } else {
      console.error('No ticker found in localStorage');
    }
  }, 1000);  // Ajustez le délai si nécessaire
});


campanie.addcompagnies({
    ticket: ticket.value,
    iduser: iduser
  }, () => {
    router.push({ name: 'home' }); // Redirection après la connexion
  });

</script>

<template>
  <div v-if="oneData">
    <p>{{ oneData.name   }}</p>
    <p>{{ oneData.listdate }}</p>
  </div>
  <p v-else>No data available yet.</p>

  <button @click="ajouter" class="button">Ajouter</button>
</template>

<style scoped>
p {
  color: aliceblue;
}

.button{
  background-color: #212121;
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  padding: 10px 20px; /* Plus de padding pour un meilleur visuel */
  font-size: 16px; /* Harmonisation de la taille de texte avec l'input */
  cursor: pointer; /* Indique que le bouton est cliquable */
  margin-left: 20px;
}

.button:hover {
  box-shadow: 0px 0px 15px rgb(0, 255, 255);
  transition: box-shadow 0.3s ease-in-out;
}
</style>
