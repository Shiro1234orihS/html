<script setup>
import { useApiStore } from '@/stores/api.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const api = useApiStore()
const router = useRouter();

const name = ref("")
const password = ref("")

const nameError = ref("")
const passwordError = ref("")
const confirmPasswordError = ref("")

function validateForm() {
  let isValid = true

  if (name.value.trim() === "") {
    nameError.value = "Le nom d'utilisateur est requis."
    isValid = false
  } else {
    nameError.value = ""
  }

  if (password.value.trim() === "") {
    passwordError.value = "Le mot de passe est requis."
    isValid = false
  } else {
    passwordError.value = ""
  }

  return isValid
}

function login() {
  if (validateForm()) {
    api.login({
      speudo: name.value,
      motDePasse: password.value
    }, () => {
      console.log("test");
      router.push({ name: 'home' }); // Redirection après la connexion
    });
  }
}

function logout() {
    api.logout();
}
</script>

<template>
    <div class="page-flex">
        <div id="contraint-connection">
            <span v-if="nameError" class="error">{{ nameError }}</span>
            <div class="contraint-input">
                <input  v-model="name" type="text" id="username" placeholder=" " required>
                <label class="floating-label" for="username">Nom utilisateur</label>
            </div>

            <div class="contraint-input">
                <input v-model="password" type="password" id="password" placeholder=" " required>
                <label class="floating-label" for="password">Mot de passe</label>
            </div>
            <span v-if="passwordError" class="error">{{ passwordError }}</span>
            <div class="div-flex">
                <input type="checkbox" id="remember-me">
                <label for="remember-me">Souvenir mot de passe</label>
            </div>
        
            <button @click="login" >Connexion</button>
            <div class="forgot-password">
                <button>Mot de passe oublié</button>
            </div>
        </div>
    </div>
   
</template>

<style scoped>



#contraint-connection {
    background-color: var(--color-surface);
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.contraint-input {
    position: relative;
    margin-bottom: 20px;
}

.floating-label {
    position: absolute;
    left: 10px;
    top: 12px;
    color: var(--color-text-secondary);
    font-size: 16px;
    transition: all 0.3s ease;
    pointer-events: none;
}

.contraint-input input {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--color-input-border);
    border-radius: 5px;
    background-color: var(--color-input-bg);
    color: var(--color-text-primary);
    font-size: 16px;
}

.contraint-input input:focus {
    outline: none;
    border-color: var(--color-primary);
}

.contraint-input input:focus + .floating-label,
.contraint-input input:not(:placeholder-shown) + .floating-label {
    top: -15px;
    left: 5px;
    font-size: 12px;
    color: var(--color-primary);
}

button {
    width: 100%;
    padding: 10px;
    background-color: var(--color-primary);
    color: var(--color-text-primary);
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: var(--color-secondary);
}

.forgot-password button {
    background-color: transparent;
    color: var(--color-primary);
    font-size: 14px;
    border: none;
    cursor: pointer;
    text-decoration: underline;
}

.forgot-password button:hover {
    color: var(--color-secondary);
}
</style>
