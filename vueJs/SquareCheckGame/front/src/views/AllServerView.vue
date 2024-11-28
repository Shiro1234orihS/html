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
              <button @click="createMultipleGame">Créer une partie multiple</button>
            </div>
          </div>
  
          <!-- Liste des serveurs -->
          <div id="list-serveur">
            <h1>Les différentes parties disponibles</h1>
            <ul v-for="server in servers" :key="server.id" class="serveur">
              <li>{{ server.name }}</li>
              <li>{{ server.players }}/{{ server.maxPlayers }}</li>
              <button @click="joinServer(server.id)">Rejoindre le serveur</button>
              <li>{{ server.type }}</li>
            </ul>
          </div>
  
          <!-- Création de serveur -->
          <div id="creationServer">
            <p>Nom du serveur</p>
            <input type="text" v-model="newServer.name" placeholder="Entrez le nom du serveur" />
            <p>Serveur Privé</p>
            <input type="checkbox" v-model="newServer.isPrivate" id="privateServer" />
            <label for="privateServer">Activer</label>
            <button @click="createServer">Créer le serveur</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        servers: [
          { id: 1, name: "Serveur 1", players: 5, maxPlayers: 10, type: "Public" },
          { id: 2, name: "Serveur 2", players: 3, maxPlayers: 8, type: "Privé" },
        ],
        newServer: {
          name: "",
          isPrivate: false,
        },
      };
    },
    methods: {
      refreshPage() {
        window.location.reload();
      },
      createMultipleGame() {
        alert("Fonction pour créer une partie multiple appelée !");
      },
      joinServer(id) {
        alert(`Rejoindre le serveur avec l'ID ${id}`);
      },
      createServer() {
        if (this.newServer.name.trim() === "") {
          alert("Veuillez entrer un nom pour le serveur.");
          return;
        }
        this.servers.push({
          id: Date.now(),
          name: this.newServer.name,
          players: 0,
          maxPlayers: 10,
          type: this.newServer.isPrivate ? "Privé" : "Public",
        });
        this.newServer.name = "";
        this.newServer.isPrivate = false;
      },
      navigateTo(page) {
        alert(`Navigation vers ${page}`);
      },
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
  