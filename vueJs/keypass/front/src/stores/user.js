import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'  // Importez useRouter de Vue Router


export const userStore = defineStore('user', () => {

  const router = useRouter()  // Créez une instance de useRouter
  const user = ref(null)
  const url = "http://ricardonunesemilio.fr:8005/"


  function login(auth, onSuccess) {
    axios.post(url + "login", auth).then(response => {
        if (response.data && response.data.length > 0) {
            const userData = response.data[0]; // Récupérer le premier (et unique) objet utilisateur
            user.value = userData;
            console.log("Connexion réussie", user.value);
            localStorage.setItem('userId', userData.IDUTILISTEUR); // Stocker l'ID de l'utilisateur
            console.log(localStorage.getItem('userId'));
            if (onSuccess) onSuccess();
        }
    }).catch(error => {
        console.error("Erreur de connexion", error);
    });
}




 

  return {  user, login }
})
