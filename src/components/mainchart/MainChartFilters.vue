<script setup lang="ts">
import { ChartFilter } from '@/model/ChartFilter';
import { parseISO } from 'date-fns';
import { ref, watch } from 'vue';

const emit = defineEmits(['filter']);

const selectedStartDate = ref('');
const selectedEndDate = ref('');

const emitFilter = () => {
  emit('filter', selectedStartDate.value + '|' + selectedEndDate.value);
};
</script>

<template>
  <div>
    <label for="date">Zakres od: </label>
    <input type="date" id="startDate" v-model="selectedStartDate" />
  </div>

  <div>
    <label for="date">Zakres do: </label>
    <input type="date" id="EndDate" v-model="selectedEndDate" />
  </div>

  <button @click="emitFilter">Zastosuj</button>

  <p>Wybrany przedział: {{ selectedStartDate }} - {{ selectedEndDate }}</p>
</template>
