import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'  // Importez useRouter de Vue Router


export const companiesStore = defineStore('campanies', () => {

  const router = useRouter()  // Créez une instance de useRouter
 
  const url = "http://ricardonunesemilio.fr:8005/"


  function addcompagnies() {
    axios.post(url + "addentreprises", auth).then(response => {
      if (response.data) {
        console.log("test")
      }
    }).catch(error => {
      console.error("Erreur de connexion", error);
    });
  }



 

  return { addcompagnies }
})
