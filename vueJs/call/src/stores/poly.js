import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const polyStore = defineStore('poly', () => {
  const apiKey = '4JoXvRoJGqkmzriveyO3hBVWkLn3sgWr';
  const ticker = 'NVIDIA';  // Remplacer par le symbole boursier de l'entreprise
  const url = `https://api.polygon.io/v3/reference/tickers?search=${ticker}&active=true&sort=ticker&order=asc&limit=10&apiKey=${apiKey}`;

  const marketData = ref(null);  // Utilisez cette référence pour stocker les données du marché récupérées

  function fetchMarketData() {
    axios.get(url).then(response => {
      marketData.value = response.data;  // Stockez les données du marché dans la référence Vue
      console.log("Données du marché récupérées avec succès:", marketData.value);
    }).catch(error => {
      console.error("Erreur lors de la récupération des données du marché:", error);
    });
  }

  function research(name){
    
    axios.get(`https://api.polygon.io/v3/reference/tickers?search=${name}&active=true&sort=ticker&order=asc&limit=10&apiKey=${apiKey}`).then(response => {
      marketData.value = response.data;  // Stockez les données du marché dans la référence Vue
      console.log("Données du marché récupérées avec succès:", marketData.value);
    }).catch(error => {
      console.error("Erreur lors de la récupération des données du marché:", error);
    });
  }

  return { marketData, fetchMarketData, research }
});
