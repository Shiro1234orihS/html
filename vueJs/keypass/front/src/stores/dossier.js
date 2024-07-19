import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useDossierStore = defineStore('dossier', () => {
  const url = "http://ricardonunesemilio.fr:8005/";
  const dossiers = ref([]);

  async function addNewDossier(dossierData) {
    try {
      const response = await axios.post(url + "adddossier", dossierData);
      if (response.data) {
        console.log("Dossier ajouté avec succès:", response.data);
        dossiers.value.push(response.data); // Ajouter le nouveau dossier à la liste
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du dossier", error);
    }
  }

  return { dossiers, addNewDossier };
});
