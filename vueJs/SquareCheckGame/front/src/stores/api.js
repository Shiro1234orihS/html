import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useApiStore = defineStore('api', () => {
   
    const lienApi = "http://127.0.0.1:8000/";
    const user = ref(null);
    const usertoken =  ref(null);
    const CSRFtoken = ref(null); // Déclarez CSRFtoken avec ref()
    
    /**
     * Fonction de connexion
     * @param {Object} auth - Objet contenant speudo et motDePasse
     * @param {Function} onSuccess - Callback pour redirection ou actions à la connexion réussie
     */
    async function login(auth, onSuccess) {
        console.log(auth);
        try {
            // 1️⃣ Obtenez le cookie CSRF avant d'envoyer la requête POST
            const response = await axios.get('/sanctum/csrf-cookie');
            console.log('✅ CSRF token récupéré avec succès');
            
            // 2️⃣ Mettez à jour la valeur de CSRFtoken
            CSRFtoken.value = response.data; // Met à jour la valeur de CSRFtoken

            // 3️⃣ Envoyez la requête POST à /login
            const loginResponse = await axios.post(lienApi + "login", auth);
            
            if (loginResponse.data && loginResponse.data.user) {
                const userData = loginResponse.data.user; // Accéder à l'utilisateur
                user.value = userData;
                
                // 4️⃣ Stockez les informations utilisateur et token
                localStorage.setItem('userId', userData.IDUTILISTEUR); 
                localStorage.setItem('token', userData.TOKEN);
                usertoken.value = userData.TOKEN;

                // 5️⃣ Appelez le callback (onSuccess) si défini
                if (onSuccess) onSuccess();
            } else {
                console.warn('Aucun utilisateur trouvé dans la réponse', loginResponse.data);
            }
        } catch (error) {
            console.error("❌ Erreur de connexion", error.response || error);
        }
    }

    return { login, user, usertoken, CSRFtoken }
})
