<template>
  <div id="Global">
    <div id="gauche">
      <img src="./../assets/img/iconeNewFichier.webp" alt="iconeNewFichier" class="image" @click="toggleHiddenButtons">
      <div id="placement" @click="fetchData">
        <img src="./../assets/img/fichierOuvert.png" alt="fichierOuvert" class="image">
        <p>Tous les mots de passes</p>
      </div>
      <div v-for="dossier in state.dossier" :key="dossier.IDDOSSIER">
        <Fichier :dossier="dossier" @fetch-passwords="fetchPasswords"/>
      </div>
      <div v-if="state.dossier.length === 0">
        <p>Vous avez pas dossier</p>
      </div>
    </div>
    <div id="droite">
      <table>
        <thead>
          <tr>
            <th>Lien</th>
            <th>Nom d'utilisateur</th>
            <th>Mots de passe</th>
            <th>Commentaire</th>
            <th>Gestion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pass in state.app" :key="pass.IDAPP">
            <App :app="pass"/>
          </tr>
          <tr v-if="state.app.length === 0">
            <td colspan="4">Aucune application trouvée.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-show="hiddenButtonsVisible" id="hidden-pass">
    <button @click="toggleHiddenButtons" id="exit">❌</button>

    <label>
      <input v-model="nomNewDossier" class="input" type="text" placeholder="" required="">
      <span>Nom du dossier</span>
    </label>

    <label>
      <input v-model="userApp" class="input" type="text" placeholder="" required="">
      <span>Dossier parent</span>
    </label>
    <button @click="updateApp">Création du dossier</button>
  </div>
  <div v-show="hiddenButtonsVisible" class="overlay"></div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import App from '@/components/App.vue';
import Fichier from '@/components/Fichier.vue';
import { useRouter } from 'vue-router';
import { useDossierStore } from '@/stores/dossier';

export default {
  name: 'AppList',
  components: {
    App,
    Fichier,
  },
  setup() {
    const yuserId = ref(null);
    const state = reactive({
      app: [],
      dossier: [],
    });
    const router = useRouter();
    const hiddenButtonsVisible = ref(false);
    const dossierStore = useDossierStore();
    const nomNewDossier = ref("");
    const userApp = ref("");

    yuserId.value = localStorage.getItem('userId');

    const fetchData = () => {
      if (yuserId.value) {
        axios.get(`http://ricardonunesemilio.fr:8005/getappid/${yuserId.value}`)
          .then(response => {
            state.app = response.data;
          })
          .catch(error => {
            console.error(error);
          });
        axios.get(`http://ricardonunesemilio.fr:8005/getdossierid/${yuserId.value}`)
          .then(response => {
            state.dossier = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.error('yuserId is null');
      }
    };

    const fetchPasswords = (dossierId) => {
      axios.get(`http://ricardonunesemilio.fr:8005/getappiddossier/${dossierId}`)
        .then(response => {
          state.app = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    };

    const updateApp = () => {
      const newDossier = {
        NOMDOSSIER: nomNewDossier.value,
        IDPARENT: 1,
        IDUTILISATEUR: yuserId.value,
      };
      console.log(newDossier)
      dossierStore.addNewDossier(newDossier).then(() => {
        fetchData(); // Actualiser les données après l'ajout
      });
      hiddenButtonsVisible.value = false; // Masquer le formulaire après l'ajout
    };

    onMounted(() => {
      fetchData();
    });

    const toggleHiddenButtons = () => {
      hiddenButtonsVisible.value = !hiddenButtonsVisible.value;
    };

    return {
      state,
      toggleHiddenButtons,
      hiddenButtonsVisible,
      nomNewDossier,
      userApp,
      updateApp,
      fetchPasswords,
      fetchData,
    };
  },
};
</script>



<style scoped>
table {
  border: 1px solid #2C3E50; /* Bleu Foncé */
  border-collapse: collapse;
  width: 100%;
  background-color: #ECF0F1; /* Gris Clair */
  color: #2C3E50; /* Bleu Foncé */
}

th, td {
  border: 1px solid #2C3E50; /* Bleu Foncé */
  padding: 8px;
  text-align: left;
}

th {
  background-color: #3498DB; /* Bleu Clair */
  color: white;
}

#Global {
  width: 100%;
}

#Global #gauche {
  float: left;
  width: 14%;
  background-color: #2C3E50; /* Bleu Foncé */
  color: white;
  padding: 1px;
  margin-top: 1px;
}

#Global #droite {
  margin-left: 15%;
  background-color: #ECF0F1; /* Gris Clair */
  padding: 1px;
  margin-top: 10px;
}

.image {
  height: 50px;
  cursor: pointer;
}

/* Hidden Password Section Styles */
#hidden-pass {
  position: fixed;
  text-align: center;
  top: 0%;
  left: 25%;
  width: 50%;
  background-color: rgba(52, 152, 219, 0.84); /* Bleu Clair */
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrer horizontalement les éléments */
  z-index: 2;
  padding: 20px;
  border-radius: 10px;
}

/* Input and Form Styles */
#input-pass {
  margin: 0;
}

.input {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 2x;
}

.input div {
  display: flex;
  align-items: center;
}

#nb {
  width: 50px;
  height: 30px;
  color: #2C3E50; /* Bleu Foncé */
  background-color: #ECF0F1; /* Gris Clair */
}

/* Checkbox Styles */
.check {
  width: 20px;
  height: 20px;
  border-radius: 2px;
  appearance: none;
  background-color: #bbb;
  transition: all .3s;
}

.check::before {
  content: '';
  position: absolute;
  border: solid #fff;
  display: block;
  width: .3em;
  height: .6em;
  border-width: 0 .2em .2em 0;
  z-index: 1;
  opacity: 0;
  right: calc(50% - .3em);
  top: calc(50% - .6em);
  transform: rotate(0deg);
  transition: all .3s;
  transform-origin: center center;
}

.check:checked {
  animation: a .3s ease-in forwards;
  background-color: #2ECC71; /* Vert */
}

.check:checked::before {
  opacity: 1;
  transform: rotate(405deg);
}

@keyframes a {
  0% {
    opacity: 1;
    transform: scale(1) rotateY(0deg);
  }
  50% {
    opacity: 0;
    transform: scale(.8) rotateY(180deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotateY(360deg);
  }
}

/* CSS pour les inputs actuels */
label {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrer horizontalement les labels */
  width: 100%;
  max-width: 300px; /* Largeur maximale des inputs */
  margin: 10px 0;
}

label .input {
  background-color: #333;
  color: #fff;
  width: 100%;
  padding: 20px 10px 5px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
  box-sizing: border-box;
}

label .input + span {
  color: rgba(255, 255, 255, 0.5);
  position: absolute;
  left: 10px;
  top: 5px;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

label .input:placeholder-shown + span {
  top: 22.5px;
  font-size: 0.9em;
}

label .input:focus + span,
label .input:valid + span {
  color: #00bfff;
  top: 5px;
  font-size: 0.7em;
  font-weight: 600;
}

.input {
  font-size: medium;
}

/* Overlay Styles */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 0;
}

/* Styles pour le bouton de fermeture */
.exit {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 24px; /* Ajustez la taille de la croix */
  color: #ff0000; /* Rouge */
  box-shadow: #ff000000; /* Rouge */
}
#placement {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
