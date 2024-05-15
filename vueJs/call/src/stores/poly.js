import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const usePolyStore = defineStore('poly', () => {
  const marketData = ref([]);
  const apiKey = '4JoXvRoJGqkmzriveyO3hBVWkLn3sgWr';
  
  function research(name) {
   
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

  function fetchCompanyByTicker(ticker){
  
    const url = `https://api.polygon.io/v1/meta/symbols/${ticker}/company?apiKey=${apiKey}`;
    console.log(url)
    return axios.get(url)
    .then(response => {
      //console.log(response.data)
      if (response.data || response.data.results) {
        marketData.value = response.data
        console.log(marketData.value);
      } else {
        marketData.value = []; // Gérer le cas où les résultats ne sont pas comme prévu
        console.error("Aucun résultat trouvé");
      }
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des données du marché:", error);
      marketData.value = []; // Réinitialiser en cas d'erreur
    });
}

  return { marketData, research,fetchCompanyByTicker };
});