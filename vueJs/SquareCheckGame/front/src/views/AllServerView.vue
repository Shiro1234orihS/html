<template>
  <div id="separateur">
    <!-- Sidebar -->
    <div class="silladbar">
      <p @click="navigateTo('profil')">Profil</p>
      <p @click="navigateTo('ami')">Ami</p>
      <p @click="navigateTo('accueil')">Accueil</p>
    </div>

    <!-- Main Content -->
    <div class="separateurRelatif">
      <div id="game">
        <!-- Menu -->
        <div id="menu">
          <h1>Création de Partie</h1>
          <div>
            <button @click="refreshPage">Actualiser la page</button>
            <button @click=toggleHiddenButtons(showNewServer)>Créer une partie multiple</button>
          </div>
        </div>

        <!-- Liste des serveurs -->
        <div id="list-serveur">
          <h1>Les différentes parties disponibles</h1>
          <ul v-for="server in servers" :key="server.id" class="serveur">
            <li> server.name </li>
            <li>server.players / server.maxPlayers </li>
            <button >Rejoindre le serveur</button>
            <li> server.type </li>
          </ul>
        </div>       
      </div>
      <!-- Création de serveur -->
      <div class="fondNoir" v-show=showNewServer.value>
        <div id="creationServer">
            <p>Nom du serveur</p>
            <input type="text" v-model="namServer" placeholder="Entrez le nom du serveur" />
            <p>Nombre de joueur</p>
            <input type='number'>
            <p>Serveur Privé</p>
            <input type="checkbox" id="privateServer" />
            <label for="privateServer">Activer</label>
            <button @click="newServer">Créer le serveur</button>
          </div>
        </div>
      </div>
      <div v-show=showNewServer.value class="overlay"></div>
    
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

        const toggleHiddenButtons = (refToToggle) => {
            if (refToToggle && typeof refToToggle.value !== 'undefined') {
                refToToggle.value = !refToToggle.value;
            } else {
                console.error("L'argument passé à toggleHiddenButtons n'est pas un ref.");
            }
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
            toggleHiddenButtons,
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
}
#separateur {
  display: flex;
  width: 100%;
  height: 100vh;
}
.silladbar {
  background-color: rgb(248, 45, 45);
  width: 20%;
  padding: 1em;
  color: white;
}
.silladbar p {
  margin: 1em 0;
  cursor: pointer;
}
.separateurRelatif {
  flex-grow: 1;
  padding: 2%;
}
#game {
  border: 1px solid rgba(115, 255, 0, 0.616);
  border-radius: 5px;
  background-color: rgba(0, 128, 0, 0.137);
  padding: 1%;
}
#menu {
  border-radius: 5px;
  background-color: aqua;
  padding: 1em;
  margin-bottom: 2%;
}
#menu h1 {
  margin-bottom: 1em;
}
#menu button {
  margin-right: 1em;
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
  background-color: rgb(224, 33, 33);
  border: 1px solid rgb(0, 162, 255);
  border-radius: 5px;
  list-style: none;
}
.serveur li {
  margin: 0.5em 0;
}
.serveur button {
  margin-top: 1em;
}
#creationServer {
  margin-top: 2em;
}
#creationServer p {
  margin: 0.5em 0;
}
#creationServer input[type="text"] {
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
