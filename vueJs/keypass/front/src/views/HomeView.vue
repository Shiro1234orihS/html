<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Lien</th>
          <th>Nom d'utilisateur</th>
          <th>Mots de passe</th>
          <th>Commentaire</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pass in state.app" :key="pass.IDAPP">
          <App :app="pass" />
        </tr>
        <tr v-if="state.app.length === 0">
          <td colspan="4">Aucune application trouvée.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import App from '@/components/App.vue'; // Assurez-vous que le chemin est correct

export default {
  name: 'AppList',
  components: {
    App,
  },
  setup() {
    const yuserId = ref(null);
    const state = reactive({
      app: [],
    });

    const fetchData = () => {
      yuserId.value = localStorage.getItem('userId');
      if (yuserId.value) {
        axios.get(`http://ricardonunesemilio.fr:8005/getappid/${yuserId.value}`)
          .then(response => {
            state.app = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.error('yuserId is null');
      }
    };

    onMounted(() => {
      fetchData();
    });

    const refreshData = () => {
      fetchData();
    };

    return {
      state,
      refreshData,
    };
  },
};
</script>

<style scoped>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
