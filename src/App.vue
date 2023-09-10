<script setup lang="ts">
import {computed} from 'vue';
import Chart from './components/Chart.vue'
import axios from 'axios'
import type {TemperatureData} from './assets/TemperatureData'

let tempData = computed(() => {
   return getTemparatureData()
})

async function getTemparatureData(): Promise<TemperatureData[]>{
   try{
      const tempDataFromPHP = await axios.get('localhost/phpAPI/getTempData.php');
      console.log(tempDataFromPHP);
   } catch(error){
      console.log(error);
   }
   let result: Array<TemperatureData> = [];
   return result;
}
</script>

<template>
   <div id="tempInfo">
    Aktualna temperatura: 
   </div>
   <Chart />
</template>