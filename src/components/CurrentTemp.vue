<script setup lang="ts">
import { TempApiImplementation } from '@/requests/TempAPI';
import { TempDTO } from '@/requests/TempDTO';
import { formatISO } from 'date-fns';
import { onMounted, reactive } from 'vue';

const temperatureApi: TempApiImplementation = new TempApiImplementation();
const temperature = reactive(new TempDTO(0, new Date()));

onMounted(() => {
  temperatureApi.getTemp(temperature);
});
</script>

<template>
  <p>
    Najnowsza temperatura: {{ temperature.temperature }}&degC
    {{ formatISO(temperature.date) }}
  </p>
</template>
