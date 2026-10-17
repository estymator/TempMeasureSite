<script setup lang="ts">
import { TempApiImplementation } from '@/requests/TempAPI';
import { TempDTO } from '@/requests/TempDTO';
import { formatISO } from 'date-fns';
import { onMounted, reactive } from 'vue';

const temperatureApi: TempApiImplementation = new TempApiImplementation();
const temperature1 = reactive(new TempDTO(0, new Date()));
const temperature2 = reactive(new TempDTO(0, new Date()));
const temperature3 = reactive(new TempDTO(0, new Date()));

onMounted(() => {
  temperatureApi.getTemp(temperature1, 1);
  temperatureApi.getTemp(temperature2, 2);
  temperatureApi.getTemp(temperature3, 3);
});
</script>

<template>
  <div style="color: aliceblue; display: flex; flex-direction: column; gap: 8px;">
    <p>
      Czujnik 1: {{ temperature1.temperature }}&degC
      {{ formatISO(temperature1.date) }}
    </p>
    <p>
      Czujnik 2: {{ temperature2.temperature }}&degC
      {{ formatISO(temperature2.date) }}
    </p>
    <p>
      Czujnik 3: {{ temperature3.temperature }}&degC
      {{ formatISO(temperature3.date) }}
    </p>
  </div>
</template>
