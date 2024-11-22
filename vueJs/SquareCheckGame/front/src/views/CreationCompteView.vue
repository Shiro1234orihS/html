<script setup>
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

        if (emailRegex.test(emailInput.value)) {
            emailError.style.display = 'none';
            alert('Email valide');
        } else {
            emailError.style.display = 'block';
            emailInput.style.borderColor = 'red'
        }
    }
</script>


<template>
    <div id="contraint-connection">
        <h1>Création du compte</h1>
        <div class="contraint-input">
            <input type="text" id="email" placeholder=" ">
            <label class="floating-label" for="email">E-mail *</label>
            <p id="email-error" style="color: red; display: none;">Veuillez entrer un email valide.</p>
        </div>

        <div class="contraint-input">
            <input type="text" id="username" placeholder=" ">
            <label class="floating-label" for="username">Nom utilisateur *</label>
        </div>

        <div class="contraint-input">
            <input type="password" id="password" placeholder=" ">
            <label class="floating-label" for="password">Mot de passe *</label>
        </div>
        <button onclick="validateEmail">Création du compte</button>
        <p>Les champs avec une $ sont obligatoire</p>
    </div>
</template>
  
<style>

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
  