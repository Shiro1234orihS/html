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

<template >
  <main >
    <div id="bar">
      <input placeholder="Enter your text..." class="input" name="text" type="text" v-model="cherche">
      <button @click="recherche" class="button">Cherche</button>
    </div>
    
    <ul v-if="marketData && marketData.length > 0">
      <li v-for="company in marketData" :key="company.ticker">
        {{ company.name }}//// ({{ company.ticker }}) - Exchange: {{ company.primary_exchange }}
      </li>
    </ul>
    <p v-else>No data available yet.</p>
    
    <Entreprise v-for="entreprise in marketData" :key="entreprise.ticker" :entreprise="entreprise" />
    
  </main>
</template>

<style scoped>
#bar{
 
  left : 40%
}

.input {
  background-color: #212121;
  max-width: 500px;
  height: 20px;
  width:300px;
  padding: 10px;
  /* text-align: center; */
  border: 2px solid white;
  border-radius: 5px;
  /* box-shadow: 3px 3px 2px rgb(249, 255, 85); */
}

.input:focus {
  color: rgb(0, 255, 255);
  background-color: #212121;
  outline-color: rgb(0, 255, 255);
  box-shadow: -3px -3px 15px rgb(0, 255, 255);
  transition: .1s;
  transition-property: box-shadow;
}

.button{
  background-color: #212121;
  color: white;
  margin-left: 10px;
  height:40px;
  padding: 10px;

  border: 2px solid white;
  border-radius: 5px;
}

.button:hover {
  color: rgb(0, 255, 255);
  background-color: #212121;
  outline-color: rgb(0, 255, 255);
  box-shadow: -3px -3px 15px rgb(0, 255, 255);
  transition: .1s;
  transition-property: box-shadow;
}
li {
  color: white;
  background-color: #212121;
}
p {
  color: white;
  background-color: #212121;
}
</style>
