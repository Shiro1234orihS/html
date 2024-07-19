<template>
  <td>
    <div class="placement-logo" :id="`app-name-${app.IDAPP}`">
      <p>{{ app.NOMAPP }}</p>
      <img src="./../assets/img/copie.webp" alt="copie" @click="copierTexte(`app-name-${app.IDAPP}`)" class="image">
    </div>
  </td>
  <td>
    <div class="placement-logo" :id="`app-user-${app.IDAPP}`">
      <p>{{ app.UTILISATEURAPP }}</p>
      <img src="./../assets/img/copie.webp" alt="copie" @click="copierTexte(`app-user-${app.IDAPP}`)" class="image">
    </div>
  </td>
  <td>
    <div class="placement-logo" :id="`app-password-${app.IDAPP}`">
      <p>{{ app.MOTPASSAPP }}</p>
      <img src="./../assets/img/copie.webp" alt="copie" @click="copierTexte(`app-password-${app.IDAPP}`)" class="image">
    </div>
  </td>
  <td>
    <div class="placement-logo" :id="`app-comment-${app.IDAPP}`">
      <p>{{ app.COMMENTAIRE || 'N/A' }}</p>
      <img src="./../assets/img/copie.webp" alt="copie" @click="copierTexte(`app-comment-${app.IDAPP}`)" class="image">
    </div>
  </td>
  <td>
    <div class="placement-logo">
      <img src="./../assets/img/supIcone.webp" alt="supprimer" class="image" @click="suppIcone">
      <img src="./../assets/img/removeIcone.webp" alt="supprimer" class="image" @click="updateIcone">
    </div>
  </td>

  <div v-show="hiddenButtonsVisible" id="hidden-pass-delete">
    <label>Voulez-vous vraiment supprimer votre mot de passe ?</label>
    <button @click="deleteApp">OUI</button>
    <button @click="annulerDelete">Non</button>
  </div>
  <div v-show="hiddenButtonsVisible2" id="hidden-pass-update">
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
    <button @click="updateApp">Modifier le mot de passe</button>
  </div>
  <div v-show="hiddenButtonsVisible2" class="overlay"></div>
  <div v-show="hiddenButtonsVisible" class="overlay"></div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Clipboard from 'clipboard';
import { useAppStore } from './../stores/app';
import { useRouter } from 'vue-router';
import { useDossierStore } from '@/stores/dossier';

export default {
  props: {
    app: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const hiddenButtonsVisible = ref(false);
    const hiddenButtonsVisible2 = ref(false);
    const appStore = useAppStore();
    const router = useRouter();
    const selectedDossier = ref(null);

    const linkApp = ref("");
    const userApp = ref("");
    const passApp = ref("");
    const commentApp = ref("");
    const nombredelettre = ref(12);
    const includeSpecialChars = ref(false);
    const includeUppercase = ref(false);
    const includeNumbers = ref(false);
    const dossierStore = useDossierStore();

    const suppIcone = () => {
      hiddenButtonsVisible.value = !hiddenButtonsVisible.value;
    };
    
    const updateIcone = () => {
      hiddenButtonsVisible2.value = !hiddenButtonsVisible2.value;
    };

    const deleteApp = () => {
      appStore.delectepass(props.app.IDAPP, () => {
        hiddenButtonsVisible.value = false;
        router.push({ name: 'loader' });
      });
    };

    const annulerDelete = () => {
      hiddenButtonsVisible.value = false;
    };

    const annulerUpdate = () => {
      hiddenButtonsVisible2.value = false;
    };

    const toggleHiddenButtons = () => {
      hiddenButtonsVisible2.value = !hiddenButtonsVisible2.value;
    }

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
      passApp.value = generatePassword();
    };

    const updateApp = () => {
      const dossierId = selectedDossier.value ? selectedDossier.value.IDDOSSIER : null;
      const payload = {
        IDAPP: props.app.IDAPP,
        IDDOSSIER: dossierId,
        NOMAPP: linkApp.value,
        UTILISATEURAPP: userApp.value,
        COMMENTAIRE: commentApp.value,
        MOTPASSAPP: passApp.value
      };
      appStore.updateApp(payload, () => {
        alert('Mot de passe mis à jour !');
        hiddenButtonsVisible2.value = false;
        router.push({ name: 'loader' });
      });
    };

    onMounted(() => {
      new Clipboard('.image', {
        target: function(trigger) {
          return trigger.previousElementSibling;
        }
      });
    });

    return {
      hiddenButtonsVisible,
      hiddenButtonsVisible2,
      linkApp,
      userApp,
      passApp,
      commentApp,
      nombredelettre,
      includeSpecialChars,
      includeUppercase,
      includeNumbers,
      toggleHiddenButtons,
      generatePassword,
      setPassword,
      suppIcone,
      updateIcone,
      deleteApp,
      updateApp,
      annulerDelete,
      annulerUpdate,
      selectedDossier,
      dossierStore
    };
  },
  methods: {
    copierTexte(id) {
      const texteElement = document.querySelector(`#${id} p`);
      const texte = texteElement.innerText;
    
      const textarea = document.createElement("textarea");
      textarea.value = texte;
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        document.execCommand("copy");
        alert('Texte copié avec succès!');
      } catch (err) {
        console.error('Erreur lors de la copie du texte : ', err);
        alert('Erreur lors de la copie du texte.');
      }
    
      document.body.removeChild(textarea);
    }
  }
}
</script>

<style scoped>
p {
  color: rgb(0, 0, 0);
}

.placement-logo {
  display: flex;
  align-items: center;
}

.image {
  height: 50px;
  cursor: pointer;
}

table, th, td {
  border: 1px solid rgb(0, 0, 0);
  border-collapse: collapse;
}

#hidden-pass-delete, #hidden-pass-update {
  position: fixed;
  text-align: center;
  top: 0%;
  left: 25%;
  width: 50%;
  background-color: rgba(52, 152, 219, 0.84); /* Bleu clair */
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrer horizontalement les éléments */
  z-index: 2;
  padding: 20px;
  border-radius: 10px;
}

/* Overlay Styles */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
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
