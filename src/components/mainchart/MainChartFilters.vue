<script setup lang="ts">
  import { ref } from 'vue';

const selectedStartDate = ref('');
const selectedEndDate = ref('');
</script>

<template>
  <div>
    <label for="date">Zakres od:</label>
    <input type="date" id="startDate" v-model="selectedStartDate" />
  </div>

  <div>
    <label for="date">Zakres do:</label>
    <input type="date" id="EndDate" v-model="selectedEndDate" />
  </div>

  <p>Wybrany przedział: {{ selectedStartDate }} - {{ selectedEndDate }}</p>
</template>
