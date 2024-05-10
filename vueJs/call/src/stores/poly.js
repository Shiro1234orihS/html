import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const usePolyStore = defineStore('poly', () => {
  const marketData = ref([]);

  function research(name) {
    const apiKey = '4JoXvRoJGqkmzriveyO3hBVWkLn3sgWr';
    const url = `https://api.polygon.io/v3/reference/tickers?search=${name}&active=true&sort=ticker&order=asc&limit=10&apiKey=${apiKey}`;
    
    return axios.get(url)
      .then(response => {
        marketData.value = response.data.results.map(ticker => ({
          ...ticker,
          logo: `https://logo.clearbit.com/${ticker.ticker.toLowerCase()}.com`  // Exemple d'utilisation de Clearbit pour obtenir le logo
        }));
        console.log(marketData.value);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données du marché:", error);
        marketData.value = [];  // Réinitialiser en cas d'erreur
      });
  }

  return { marketData, research };
});