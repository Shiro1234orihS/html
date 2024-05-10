<script setup>
import { usePolyStore } from '@/stores/poly';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const polyStore = usePolyStore();
const { marketData, fetchCompanyByTicker } = polyStore;

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
  });  // Adjust the delay as needed
});
</script>

<template>
  <ul v-if="marketData && marketData.length > 0">
    <Entreprise v-for="entreprise in marketData" :key="entreprise.ticker" :entreprise="entreprise" />
  </ul>
  <p v-else>No data available yet.</p>
</template>

<style scoped>

</style>
