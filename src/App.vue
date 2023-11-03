<script setup lang="ts">
import {computed} from 'vue';
import Chart from './components/Chart.vue'
import type {TemperatureData} from './assets/TemperatureData'
import axios from 'axios';

let temp
axios.get('phpAPI/GetTemp.php')
.then(response => temp = response)
</script>

<template>
   <div id="tempInfo">
    Aktualna temperatura: temp
   </div>
   <Chart />
</template>