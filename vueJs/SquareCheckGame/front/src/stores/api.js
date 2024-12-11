import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useApiStore = defineStore('api', () => {
   
    const lienApi = "http://ricardonunesemilio.fr:8004/";
    const user = ref(null);
   
    function login(auth, onSuccess) {
        axios.post(lienApi + "login", auth).then(response => {
            if (response.data && response.data.length > 0) {
                const userData = response.data[0]; // Récupérer le premier (et unique) objet utilisateur
                user.value = userData;
                localStorage.setItem('id', userData.id); // Stocker l'ID de l'utilisateur
                if (onSuccess) onSuccess();
            }
        }).catch(error => {
            console.error("Erreur de connexion", error);
        });   
    }

    return { login, user }
})
