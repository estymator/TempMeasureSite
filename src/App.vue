<script setup lang="ts">
import CurrentTemp from './components/CurrentTemp.vue';
import TempChart from './components/mainchart/TempChart.vue';
</script>

<template>
  <div id="mainChart">
    <CurrentTemp></CurrentTemp>
    <TempChart> </TempChart>
  </div>
</template>

<style scoped>
#mainChart {
  width: 90%;
  margin-top: 25px;
  margin-left: 25px;
}
.mainTempChart {
  margin-top: 50px;
}
</style>
