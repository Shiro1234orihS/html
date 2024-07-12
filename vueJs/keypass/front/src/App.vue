<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from './stores/app';
import { useRouter } from 'vue-router'

const route = useRoute();
const hiddenButtonsVisible = ref(false);
const nombredelettre = ref(12);
const includeSpecialChars = ref(false);
const includeUppercase = ref(false);
const includeNumbers = ref(false);
const app = useAppStore();
const router = useRouter();


const linkApp = ref("");
const userApp = ref("");
const passApp = ref("");
const commentApp = ref("");
const dossierApp = ref("");




const isConnexionView = computed(() => {
  if(route.name == 'connexion' ||route.name == 'accountcreation')
    return false ;
  else 
    return true
});

const toggleHiddenButtons = () => {
  hiddenButtonsVisible.value = !hiddenButtonsVisible.value;
};

// Function to generate a random password
const generatePassword = () => {
  const length = nombredelettre.value; // Use the reactive variable for length
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
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
};

// Function to set the generated password to the input field
const setPassword = () => {
  const passwordInput = document.getElementById("input-pass");
  passwordInput.value = generatePassword();
  passApp.value = passwordInput.value;
};

function newApp  ()  {
  const yuserId = ref(null)
  yuserId.value = localStorage.getItem('userId');
  console.log( yuserId.value,linkApp.value,commentApp.value,dossierApp.value,passApp.value);
  app.postapp({
    IDUTILISTEUR : localStorage.getItem('userId'),
    NOMAPP: linkApp.value,
    UTILISATEURAPP : userApp.value,
    COMMENTAIRE : commentApp.value,
    Dossier : dossierApp.value,
    MOTPASSAPP : passApp.value
  })
  router.push({ name: 'loader' }); 
  hiddenButtonsVisible.value = !hiddenButtonsVisible.value;
}
</script>

<template>
 <div>
        <header v-if="isConnexionView">
            <nav>
                <button @click="toggleHiddenButtons">Ajouter un mot de passe</button>
                <div class="recherche">
                    <input type="text">
                    <button>Recherche</button>
                </div>
                <button class="profile-button">Profil</button>
            </nav>
        </header>
        <div v-show="hiddenButtonsVisible" id="hidden-pass">
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
                <input type="text" class="input" v-model="dossierApp" placeholder="" required="">
                <span>Nom de dossier</span>
            </label>
            <button @click="newApp">Nouveau mot de passe</button>
        </div>
        <RouterView/>
    </div>
    <div v-show="hiddenButtonsVisible" class="overlay"></div>

</template>

<style scoped>
/* Global Styles */
header {
  background: #2C3E50; /* Bleu Foncé */
  height: 75px;
  position: relative;
}

/* Navigation Styles */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.menu {
  display: flex;
  gap: 20px;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}

/* Profile Button Styles */
.profile-button {
  width: 60px;
  height: 60px;
  margin-right: 20px;
  border-radius: 100%;
  border: 2px solid #E74C3C; /* Rouge */
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
</style>