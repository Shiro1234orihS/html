<script setup>
import { usePolyStore } from '@/stores/poly';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { oneData, fetchCompanyByTicker } = usePolyStore();

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
</script>

<template>
  <div v-if="oneData">
    <p>{{ oneData.listdate }}</p>
  </div>
  <p v-else>No data available yet.</p>
</template>

<style scoped>
p {
  color: aliceblue;
}
</style>
