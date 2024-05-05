<script setup>
import { polyStore } from '@/stores/poly'
import { ref, computed, watch  } from 'vue'


const poly = polyStore()






function test() {
  poly.fetchMarketData();
}


</script>

<template>
  <main>
    <button @click="test">test</button>
    <TheWelcome />

    
  </main>
</template>
