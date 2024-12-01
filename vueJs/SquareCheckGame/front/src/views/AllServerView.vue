<template>
  <div class="separateurRelatif">
    <div id="game">
      <div id="menu">
        <h1>Création de Partie</h1>
        <div>
          <button @click="getAllServer">Actualiser la page</button>
          <button @click="toggleHiddenNewServer">Créer une partie multiple</button>
        </div>
      </div>

      <div id="list-serveur">
        <h1>Les différentes parties disponibles</h1>
        <ul v-if="state.allserver.length" class="serveur">
          <li v-for="server in state.allserver" :key="server.id">
            <ServerDetails :server="server" />
          </li>
        </ul>
        <p v-else>Aucune partie disponible.</p>
      </div>
    </div>

    <div v-show="showNewServer" class="fondNoir">
      <div id="creationServer">
        <button @click="toggleHiddenNewServer">Fermer</button>
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
import { usesocketStore } from '@/stores/socket';
import ServerDetails from '@/components/ServerDetails.vue'
export default {
  name: 'AllServer',
  components: {
    ServerDetails,
   
  },
  setup() {
    const showNewServer = ref(false);
    const namServer = ref("");
    const socket = usesocketStore();
    const state = reactive({
      allserver: [],
    });
    const playerCount = ref(0); // Nombre de joueurs maximum
    const isPrivate = ref(false); // Statut privé/public

    const getAllServer = async () => {
      try {
        const servers = await socket.update(); // Attente des données
        if (servers) {
          state.allserver = servers; // Mise à jour de l'état
          console.log("Serveurs récupérés :", state.allserver);
        } else {
          console.warn("Aucun serveur trouvé.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des serveurs :", error.message);
      }
    };

    const toggleHiddenNewServer = () => {
      showNewServer.value = !showNewServer.value;
    };

    onMounted(() => {

      getAllServer();
    });

    return {
      namServer,
      playerCount, // Ajout de `playerCount`
      isPrivate, // Ajout de `isPrivate`
      showNewServer,
      getAllServer,
      toggleHiddenNewServer,
      state,
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
