import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'  // Importez useRouter de Vue Router


export const userStore = defineStore('twitter', () => {

  const router = useRouter()  // Créez une instance de useRouter
  const user = ref(null)
  const tweets = ref([])
  const url = "http://ricardonunesemilio.fr:8005/"


  function login(auth, onSuccess) {
    axios.post(url + "login", auth).then(response => {
      if (response.data) {
        const userData = response.data[0];
        user.value = response.data;
        console.log("Connexion réussie", user.value);
        localStorage.setItem('userId', userData.IDCONNCTION); // Stocker l'ID de l'utilisateur
        console.log(localStorage.getItem('userId'));
        if (onSuccess) onSuccess();
      }
    }).catch(error => {
      console.error("Erreur de connexion", error);
    });
  }


  function post(content) {
    // Vérifier les données
    // -> pour l'ergonomie
    let newTweet = {
      content: content,
      user: "Luc",
      timestamp: Date.now()
    }
    axios.post(url+"post", newTweet).then( response => {
      tweets.value.splice(0,0,newTweet)
    })
  }

 

  return { tweets, post, user, login }
})
