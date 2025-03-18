<script setup lang="ts">
import { TempApiImplementation } from '@/requests/TempAPI';
import { TempDTO } from '@/requests/TempDTO';
import { convertDateToString } from '@/utils/DateUtils';
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
    {{ convertDateToString(temperature.date) }}
  </p>
</template>
