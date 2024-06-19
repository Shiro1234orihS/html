import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useAppStore = defineStore('app', () => {
  const router = useRouter();
  const iduser = localStorage.getItem('userId');
  const url = "http://ricardonunesemilio.fr:8005/";
  const app = ref([]);

  async function getappbyuser() {
    try {
      const response = await axios.get(url + "getappid/" + iduser);
      if (response.data) {
        console.log(response.data);
        app.value = response.data; // Correctement mettre à jour la valeur réactive
        console.log(app.value);
      }
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  }
  function postapp(auth, onSuccess){
    const response =  axios.post(url+"addapp",auth).then(response =>{
      if (response.data) {
        console.log("création réussie");
        if (onSuccess) onSuccess();
      }
    }).catch(error => {
        console.error("Erreur de connexion", error);
      });
  }
  
  return { app, getappbyuser,postapp  };
});
