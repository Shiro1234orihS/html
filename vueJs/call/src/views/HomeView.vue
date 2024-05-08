<script setup>
import { polyStore } from '@/stores/poly'
import { ref, computed, watch  } from 'vue'


const poly = polyStore()

const  cherche = ref("")


function recherche(){
  poly.research(cherche.value);
}

function test() {
  poly.fetchMarketData();
}


</script>

<template>
  <main>
    <div id = "bar">
      <input placeholder="Enter your text..." class="input" name="text" type="text"  v-model="cherche">
      <button @click="recherche"  class="button">Cherche</button>
    </div>
    
    <TheWelcome />

    
    
  </main>
</template>

<style scoped>
#bar{
  position: absolute;
  left : 40%
}

.input {
  background-color: #212121;
  max-width: 500px;
  height: 20px;
  width:300px;
  padding: 10px;
  /* text-align: center; */
  border: 2px solid white;
  border-radius: 5px;
  /* box-shadow: 3px 3px 2px rgb(249, 255, 85); */
}

.input:focus {
  color: rgb(0, 255, 255);
  background-color: #212121;
  outline-color: rgb(0, 255, 255);
  box-shadow: -3px -3px 15px rgb(0, 255, 255);
  transition: .1s;
  transition-property: box-shadow;
}

.button{
  background-color: #212121;
  color: white;
  margin-left: 10px;
  height:40px;
  padding: 10px;

  border: 2px solid white;
  border-radius: 5px;
}

.button:hover {
  color: rgb(0, 255, 255);
  background-color: #212121;
  outline-color: rgb(0, 255, 255);
  box-shadow: -3px -3px 15px rgb(0, 255, 255);
  transition: .1s;
  transition-property: box-shadow;
}
</style>
