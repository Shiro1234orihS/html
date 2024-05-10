<script setup>
import { ref } from 'vue'
import { usePolyStore  } from '@/stores/poly'
import Entreprise from '@/components/Entreprise.vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const { marketData, research } = usePolyStore ()
const cherche = ref("")
const refreshKey = ref(0)  // Définir componentKey ici

function recherche() {
  research(cherche.value)
    .then(() => {
      // Recharge la page après que les données ont été chargées avec succès
      router.push({ name: 'companysearchView' }); // Redirection après la connexion
    })
    .catch(error => {
      console.error("Erreur lors de la recherche :", error);
    });
}
</script>

<template>
  <main>
    <div id="bar" class="search-bar">
      <input placeholder="Entrez votre texte..." class="input" name="text" type="text" v-model="cherche">
      <button @click="recherche" class="button">Chercher</button>
    </div>

    
    <ul v-if="marketData && marketData.length > 0">
      <Entreprise v-if="marketData" v-for="entreprise in marketData" :key="entreprise.ticker" :entreprise="entreprise" />
      
    </ul>
    <p v-else>No data available yet.</p>
    
   
  </main>
</template>

<style scoped>
.search-bar{
  display: flex;
  justify-content: center; /* Centrer horizontalement les éléments */
  align-items: center; /* Centrer verticalement les éléments */
  padding: 20px; /* Espacement autour de la barre pour l'aération */
}

.input {
  background-color: #212121;
  max-width: 500px;
  height: 40px; /* Augmentation de la hauteur pour correspondre au bouton */
  padding: 10px 15px; /* Ajustement pour un meilleur visuel */
  border: 2px solid white;
  border-radius: 5px;
  color: white; /* Assurer que le texte est blanc */
  font-size: 16px; /* Taille de police plus grande pour une meilleure lisibilité */
}

.input:focus {
  outline-color: rgb(0, 255, 255);
  box-shadow: 0px 0px 15px rgb(0, 255, 255);
  transition: box-shadow 0.3s ease-in-out;
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
