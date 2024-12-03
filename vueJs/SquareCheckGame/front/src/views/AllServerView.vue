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

      <div id="list-serveurs-disponibles" v-if="viewServers" :key="viewServers">
        <h1>Les différentes parties disponibles</h1>
        <ul v-if="state.allserver.length" class="serveur">
          <li v-for="server in state.allserver" :key="server.id">
            <p>Nom du serveur : {{ server.name }}</p>
            <p>Joueurs : {{ server.players.length }} / {{ server.nombreMaxJoueur }}</p>
            <p>Statut : {{ server.status }}</p>
            <button @click="joinServeur(server.id)">Rejoindre le serveur</button>
          </li>
        </ul>
        <p v-else>Aucune partie disponible.</p>
      </div>

      <div id="list-serveurs-details" v-if="!viewServers" :key="viewServers">
        <h1>Info de la partie :</h1>
        <ul v-if="state.allserver.length" class="serveur">
          <li v-for="server in state.allserver" :key="server.id">
            <div v-if="server.id === idServeur">
              <p>Nom du serveur : {{ server.name }}</p>
              <p>Joueurs : {{ server.players.length }} / {{ server.nombreMaxJoueur }}</p>
              <p>Statut : {{ server.status }}</p>
              <ul>
                <li v-for="player in server.players" :key="player.idPlayer">
                  {{ player.pseudo }} - {{ player.etats }}
                </li>
              </ul>
              <button @click="changeState">Pret !</button>
              <button @click="disconnecte(server.id)">Quittez la partie</button>
            </div>
          </li>
        </ul>
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
    const viewServers = ref(true);
    const socket = usesocketStore();
    const idServeur = ref(null);
    const state = reactive({
      allserver: [],
    });
    const playerCount = ref(0); // Nombre de joueurs maximum
    const isPrivate = ref(false); // Statut privé/public
    
    const toggleHiddenViewServers = () => {
      viewServers.value = !viewServers.value;
      console.log("Valeur actuelle de viewServers:", viewServers.value);
    };


    const toggleHiddenNewServer = () => {
      showNewServer.value = !showNewServer.value;
    };

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

    const joinServeur = async (id) => {
      idServeur.value = id;
      try {
        const game = await socket.join(id); // Appel à la méthode du store
        toggleHiddenViewServers();
        console.log(`Vous avez rejoint la partie ${id}`);
      } catch (error) {
        console.error(`Impossible de rejoindre la partie : ${error.message}`);
      }
    };
    const changeState = async (id) => {
      
    }
    const disconnecte = async (id) => {
      console.log("Tentative de déconnexion de la partie", id);
      try {
        toggleHiddenViewServers();
        await socket.disconnect(id);
        console.log("Déconnexion réussie, basculement de l'affichage");
        
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error.message);
      }
    };

    onMounted(() => {
      getAllServer();
    });

    return {
      namServer,
      viewServers,
      playerCount, // Ajout de `playerCount`
      isPrivate, // Ajout de `isPrivate`
      showNewServer,
      getAllServer,
      toggleHiddenNewServer,
      state,
      joinServeur,
      idServeur,
      toggleHiddenViewServers,
      disconnecte
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
  flex-grow: 2;
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
  background-color: var(--color-background);
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
  text-align: center;
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
