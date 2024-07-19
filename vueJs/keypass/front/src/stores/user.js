import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'  // Importez useRouter de Vue Router


export const userStore = defineStore('user', () => {

  const router = useRouter()  // Créez une instance de useRouter
  let usertoken =  ref(null);
  const user = ref(null)
  const url = "http://ricardonunesemilio.fr:8005/"


  function login(auth, onSuccess) {
    axios.post(url + "login", auth).then(response => {
        if (response.data && response.data.length > 0) {
            const userData = response.data[0]; // Récupérer le premier (et unique) objet utilisateur
            user.value = userData;
            localStorage.setItem('userId', userData.IDUTILISTEUR); // Stocker l'ID de l'utilisateur
            localStorage.setItem('token', userData.TOKEN);
            if (onSuccess) onSuccess();
        }
    }).catch(error => {
        console.error("Erreur de connexion", error);
    });   
  }

  function register(auth, onSuccess) {
    axios.post(url + "register", auth).then(response => {
      console.log("Réponse de l'API d'inscription :", response.data);
      if (response.data && response.data.token) {
        if (onSuccess) return onSuccess();
      } 
    }).catch(error => {
      console.error("Erreur d'inscription", error);
    });
  }



 

  return {  user,usertoken, login , register }
})
