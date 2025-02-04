<script setup lang="ts">
import CurrentTemp from './components/CurrentTemp.vue';
import TempChart from './components/TempChart.vue';
</script>

<template>
  <div id="mainChart">
    <CurrentTemp></CurrentTemp>
    <TempChart> </TempChart>
  </div>
</template>

<style>
#mainChart {
  width: 50%;
  margin-top: 25px;
  margin-left: 25px;
}
</style>
