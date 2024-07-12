<template>
  <div id="placement" @click="fetchPasswords">
    <img src="./../assets/img/fichierOuvert.png" alt="fichierOuvert" class="image">
    <p>{{ dossier.NOMDOSSIER }}</p>
  </div>
</template>

<script>
export default {
  props: {
    dossier: {
      type: Object,
      required: true
    }
  },
  methods: {
    fetchPasswords() {
      console.log('lID est ' + this.dossier.IDDOSSIER)
      this.$emit('fetch-passwords', this.dossier.IDDOSSIER);
    }
  }
};
</script>

<style scoped>
.image {
  height: 50px;
}

#placement {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
