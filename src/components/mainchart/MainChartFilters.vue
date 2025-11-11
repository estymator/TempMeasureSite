<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['filterEvent']);

const selectedStartDate = ref('');
const selectedEndDate = ref('');

const emitFilter = () => {
  emit('filterEvent', selectedStartDate.value + '|' + selectedEndDate.value);
};
</script>

<template>
  <div style="color: aliceblue">
    <label for="date">Zakres od: </label>
    <input type="date" id="startDate" v-model="selectedStartDate" />
  </div>

  <div style="color: aliceblue">
    <label for="date">Zakres do: </label>
    <input type="date" id="EndDate" v-model="selectedEndDate" />
  </div>

  <button @click="emitFilter">Zastosuj</button>

  <p style="color: aliceblue">
    Wybrany przedział: {{ selectedStartDate }} - {{ selectedEndDate }}
  </p>
</template>
