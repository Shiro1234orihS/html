<template>
  
    <!-- Main Content -->
    <div class="separateurRelatif">
      <div id="game">
        <!-- Menu -->
        <div id="menu">
          <h1>Création de Partie</h1>
          <div>
            <button @click="refreshPage">Actualiser la page</button>
            <button @click="toggleHiddenNewServer">Créer une partie multiple</button>
          </div>
        </div>

        <!-- Liste des serveurs -->
        <div id="list-serveur">
          <h1>Les différentes parties disponibles</h1>
          <ul class="serveur">
            <li>Nom du serveur : server.name</li>
            <li>Joueurs : server.players / server.maxPlayers</li>
            <button>Rejoindre le serveur</button>
            <li>Type : server.type</li>
          </ul>
        </div>
      </div>

      <!-- Création de serveur -->
      <div v-show="showNewServer" class="fondNoir">
        <div id="creationServer">
          <button @click="toggleHiddenNewServer">ferme</button>
          <h2>Créer un nouveau serveur</h2>
          <p>Nom du serveur :</p>
          <input type="text" v-model="namServer" placeholder="Entrez le nom du serveur" />
          <p>Nombre de joueurs :</p>
          <input type="number" v-model="playerCount" placeholder="Nombre max de joueurs" />
          <p>Serveur Privé :</p>
          <input type="checkbox" id="privateServer" v-model="isPrivate" />
          <label for="privateServer">Activer</label>
          <button @click="newServer">Créer le serveur</button>
        </div>
      </div>
      <div v-show="showNewServer" class="overlay"></div>
    </div>
  
</template>


<script>
import { ref, onMounted, reactive } from 'vue';

export default {
    name: 'AllServer',
    setup() {
        const showNewServer = ref(false);
        const showNewPassWord = ref(false);
        const namServer = ref("");
        const state = reactive({
            allserver: []
        });

        const getAllServer = () => {
          // Simulez une requête pour obtenir la liste des serveurs
        };

        const updateAllServer = () => {
          getAllServer();
        };

        const newServer = () => {
            // Ajoutez ici la logique pour créer un nouveau serveur
        };

        const toggleHiddenNewServer = () => {    
          showNewServer.value = !showNewServer.value; 
        };

        onMounted(() => {
          getAllServer();
        });

        return {
          namServer,
          showNewPassWord,
          showNewServer,
          updateAllServer,
          newServer,
          toggleHiddenNewServer,
        };
    },
};
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: var(--color-background);
  color: var(--color-text-primary);
}



.separateurRelatif {
  flex-grow: 1;
  padding: 2%;
}

#game {
  border: 1px solid var(--color-primary);
  border-radius: 5px;
  background-color: var(--color-surface);
  padding: 1%;
}

#menu {
  border-radius: 5px;
  background-color: var(--color-secondary);
  padding: 1em;
  margin-bottom: 2%;
  color: var(--color-text-primary);
}

#menu h1 {
  margin-bottom: 1em;
}

#menu button {
  margin-right: 1em;
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  border: none;
  padding: 0.5em 1em;
  border-radius: 5px;
  cursor: pointer;
}

#menu button:hover {
  background-color: var(--color-secondary);
}

#list-serveur {
  margin-top: 2%;
}

#list-serveur h1 {
  margin-bottom: 1em;
}

.serveur {
  margin: 1% 0;
  padding: 1em;
  background-color: var(--color-input-bg);
  border: 1px solid var(--color-primary);
  border-radius: 5px;
  list-style: none;
}

.serveur li {
  margin: 0.5em 0;
}

.serveur button {
  margin-top: 1em;
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  border: none;
  padding: 0.5em 1em;
  border-radius: 5px;
  cursor: pointer;
}

.serveur button:hover {
  background-color: var(--color-secondary);
}

#creationServer {
  margin-top: 2em;
}

#creationServer p {
  margin: 0.5em 0;
}

#creationServer input[type="text"],
#creationServer input[type="number"] {
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid var(--color-input-border);
  background-color: var(--color-input-bg);
  color: var(--color-text-primary);
  border-radius: 5px;
}

#creationServer button {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  border: none;
  padding: 0.5em 1em;
  border-radius: 5px;
  cursor: pointer;
}

#creationServer button:hover {
  background-color: var(--color-secondary);
}


</style>
