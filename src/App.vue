<script setup lang="ts">
import TempChart from './components/TempChart.vue';
</script>

<template>
  <div id="mainChart">
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
