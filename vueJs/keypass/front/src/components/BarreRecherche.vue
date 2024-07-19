<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDossierStore } from '@/stores/dossier';
import { useAppStore } from '@/stores/app';

const route = useRoute();
const hiddenButtonsVisible = ref(false);
const nombredelettre = ref(12);
const includeSpecialChars = ref(false);
const includeUppercase = ref(false);
const includeNumbers = ref(false);
const app = useAppStore();
const router = useRouter();
const dossierStore = useDossierStore();

const linkApp = ref("");
const userApp = ref("");
const passApp = ref("");
const commentApp = ref("");
const selectedDossier = ref(null);

const barreDeRecherche = ref("");

const isConnexionView = computed(() => {
  return !(route.name === 'connexion' || route.name === 'accountcreation');
});

const toggleHiddenButtons = () => {
  hiddenButtonsVisible.value = !hiddenButtonsVisible.value;
};

const generatePassword = () => {
  const length = nombredelettre.value;
  let charset = "abcdefghijklmnopqrstuvwxyz";
  
  if (includeUppercase.value) {
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (includeNumbers.value) {
    charset += "0123456789";
  }
  if (includeSpecialChars.value) {
    charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  }

  let password = "";
  for (let i = 0; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

const setPassword = () => {
  const passwordInput = document.getElementById("input-pass");
  const generatedPassword = generatePassword();
  passwordInput.value = generatedPassword;
  passApp.value = generatedPassword;
};

const newApp = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const dossierId = selectedDossier.value ? selectedDossier.value.IDDOSSIER : null;
  console.log(userId, dossierId, linkApp.value, commentApp.value, userApp.value, passApp.value , token);
  
  app.postapp({
    IDUTILISTEUR: userId,
    IDDOSSIER: dossierId,
    NOMAPP: linkApp.value,
    UTILISATEURAPP: userApp.value,
    COMMENTAIRE: commentApp.value,
    MOTPASSAPP: passApp.value, 
    TOKEN : token,
  });
  
  router.push({ name: 'loader' });
  hiddenButtonsVisible.value = !hiddenButtonsVisible.value;
};

const recherche = () => {
  this.$emit('search', barreDeRecherche.value);
};
</script>

<template>
    <div id="barreRechercheContainer">
        <input v-model="barreDeRecherche" type="text" placeholder="Rechercher votre mots de passe">
        <img class="image" src="./../assets/img/recherche.webp" alt="" @click="recherche">
        <button @click="toggleHiddenButtons">Ajouter un mot de passe</button>   
    </div>

    <div v-show="hiddenButtonsVisible" id="hidden-pass">
        <!-- Formulaire pour ajouter un mot de passe -->
        <button @click="toggleHiddenButtons" id="exit">❌</button>
        <label>
            <input v-model="linkApp" class="input" type="text" placeholder="" required="">
            <span>Lien</span>
        </label>
        <label>
            <input v-model="userApp" class="input" type="text" placeholder="" required="">
            <span>Nom d'utilisateur</span>
        </label>
        <label>
            <input type="password" class="input" v-model="passApp" id="input-pass" placeholder="" required="">
            <span>Mot de passe</span>
        </label>
        <div class="input">
            <div>
                <input type="checkbox" class="check" v-model="includeSpecialChars">
                <p>Caractères spéciaux</p>
            </div>
            <div>
                <input type="checkbox" class="check" v-model="includeUppercase">
                <p>Majuscule</p>
            </div>
            <div>
                <input type="checkbox" class="check" v-model="includeNumbers">
                <p>Nombre</p>
            </div>
            <div>
                <input id="nb" type="number" v-model="nombredelettre">
                <p>Nombre de caractères</p>
            </div>
        </div>
        <button @click="setPassword">Générer un mot de passe</button>
        <label>
            <input type="text" class="input" v-model="commentApp" placeholder="" required="">
            <span>Commentaire</span>
        </label>
        <label>
            <span>Nom de dossier</span>
            <select v-model="selectedDossier">
                <option :value="null">Aucun Fichier</option>
                <option v-for="dossier in dossierStore.dossiers" :key="dossier.IDDOSSIER" :value="dossier">{{ dossier.NOMDOSSIER }}</option>
            </select>
        </label>
        <button @click="newApp">Nouveau mot de passe</button>
    </div>

    <div v-show="hiddenButtonsVisible" class="overlay"></div>
</template>
  
<style scoped>
#barreRechercheContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    background-color: #3498DB; /* Bleu Clair */
    border-radius: 10px;
    border: 1px solid black;
    margin: 5px;
}

#barreRechercheContainer input[type="text"] {
    flex-grow: 1;
    margin: 0 10px;
    padding: 5px;
    border: 1px solid #2C3E50; /* Bleu Foncé */
    border-radius: 5px;
    background-color: #ECF0F1; /* Gris Clair */
    color: #2C3E50; /* Bleu Foncé */
}

#barreRechercheContainer button {
    background-color: #2ECC71; /* Vert */
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

#barreRechercheContainer button:hover {
    background-color: #27ae60;
}

.image {
    height: 50px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.image:hover {
    background-color: #2C3E50; /* Bleu Foncé */
}

/* Hidden Password Section Styles */
#hidden-pass {
  position: fixed;
  text-align: center;
  top: 10%;
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
  margin: 2px;
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
  color: #3498DB; /* Bleu Clair */
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
  color: #E74C3C; /* Rouge */
}
</style>
