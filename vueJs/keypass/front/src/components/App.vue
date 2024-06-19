<template>

    <td>
      <div class="placement-logo" :id="`app-name-${app.IDAPP}`">
        <p>{{ app.NOMAPP }}</p>
        <img src="./../assets/img/copie.webp" alt="copie" @click="copierTexte(`app-name-${app.IDAPP}`)" class="copie">
      </div>
    </td>
    <td>
      <div class="placement-logo" :id="`app-user-${app.IDAPP}`">
        <p>{{ app.UTILISATEURAPP }}</p>
        <img src="./../assets/img/copie.webp" alt="copie" @click="copierTexte(`app-user-${app.IDAPP}`)" class="copie">
      </div>
    </td>
    <td>
      <div class="placement-logo" :id="`app-password-${app.IDAPP}`">
        <p>{{ app.MOTPASSAPP }}</p>
        <img src="./../assets/img/copie.webp" alt="copie" @click="copierTexte(`app-password-${app.IDAPP}`)" class="copie">
      </div>
    </td>
    <td>
      <div class="placement-logo" :id="`app-comment-${app.IDAPP}`">
        <p>{{ app.COMMENTAIRE || 'N/A' }}</p>
        <img src="./../assets/img/copie.webp" alt="copie" @click="copierTexte(`app-comment-${app.IDAPP}`)" class="copie">
      </div>
    </td>

</template>

<script>
export default {
  props: {
    app: {
      type: Object,
      required: true
    }
  },
  methods: {
    copierTexte(id) {
      const texte = document.querySelector(`#${id} p`).innerText;
      navigator.clipboard.writeText(texte).then(() => {
        alert('Texte copié avec succès!');
      }).catch(err => {
        console.error('Erreur lors de la copie du texte : ', err);
      });
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

.copie {
  height: 50px;
  cursor: pointer;
}

table, th, td {
  border: 1px solid rgb(0, 0, 0);
  border-collapse: collapse;
}
</style>
