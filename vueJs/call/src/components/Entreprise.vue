<script setup>
const props = defineProps({
  entreprise: Object
});
console.log("test")
</script>

<template>
  <div>
    <h3>{{ entreprise.name }}</h3>
    <p>Ticker: {{ entreprise.ticker }}</p>
    <p >test</p>
    <!-- Plus d'info -->
  </div>
</template>