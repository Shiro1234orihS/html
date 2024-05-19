<script setup>
import { usePolyStore } from '@/stores/poly';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { companiesStore } from '@/stores/companies';
import { ref } from 'vue';

const router = useRouter();
const companyStore = companiesStore();
const { oneData, fetchCompanyByTicker } = usePolyStore();

const ticket = ref("");
const iduser = localStorage.getItem('userId');
const img = oneData.logo;

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
  }, 1000);
});

function addCompanies() {
  companyStore.addCompanies({
    iduser: iduser,
    nameCompanies: oneData.name,
    ticket: localStorage.getItem('Idticker'),
  }, () => {
    router.push({ name: 'home' });
  });
}
</script>

<template>
  <div v-if="oneData" class="company-card">
    <img :src="img" alt="logo" class="company-logo">
    <h1 class="company-name">{{ oneData.name }}</h1>
    <h2 class="company-ceo">CEO: {{ oneData.ceo }}</h2>
    <p class="company-description">{{ oneData.description }}</p>
    <p class="company-employees">Nombre d'employés: {{ oneData.employees }}</p>
    <button @click="addCompanies" class="button">Ajouter</button>
  </div>
  <p v-else>No data available yet.</p>
</template>

<style scoped>
.company-card {
  background-color: #333;
  color: aliceblue;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.company-logo {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.company-name {
  font-size: 24px;
  margin: 10px 0;
}

.company-ceo {
  font-size: 18px;
  margin: 10px 0;
}

.company-description {
  font-size: 16px;
  margin: 10px 0;
}

.company-employees {
  font-size: 16px;
  margin: 10px 0;
}

.button {
  background-color: #212121;
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
}

.button:hover {
  box-shadow: 0px 0px 15px rgb(0, 255, 255);
}
</style>
