<script setup lang="ts">
import { TempDTO } from '@/requests/TempDTO';
import { formatISO } from 'date-fns';
import { computed } from 'vue';
const props = defineProps<{
  temperatures: TempDTO[];
}>();

let meanTemperature = computed<number | undefined>(() => {
  if (props.temperatures.length === 0) return undefined;
  const sum = props.temperatures.reduce((acc, val) => acc + val.temperature, 0);
  return sum / props.temperatures.length;
});

let meanDayTemperature = computed<number | undefined>(() => {
  if (props.temperatures.length === 0) return undefined;
  const filteredTemps = props.temperatures
    .filter((temp) => temp.date.getHours() >= 8 && temp.date.getHours() <= 18);
  const sum = filteredTemps
    .reduce((acc, val) => acc + val.temperature, 0);
  return sum / filteredTemps.length;
});

let meanNightTemperature = computed<number | undefined>(() => {
  if (props.temperatures.length === 0) return undefined;
  const filteredTemps = props.temperatures.filter(
    (temp) => temp.date.getHours() >= 19 || temp.date.getHours() <= 7
  );
  const sum = filteredTemps.reduce((acc, val) => acc + val.temperature, 0);
  return sum / filteredTemps.length;
});

let higherTemp = computed<TempDTO | undefined>(() =>
  props.temperatures.length > 0
    ? props.temperatures.reduce((max, current) =>
        current.temperature > max.temperature ? current : max
      )
    : undefined
);

let lowerTemp = computed<TempDTO | undefined>(() =>
  props.temperatures.length > 0
    ? props.temperatures.reduce((min, current) =>
        current.temperature < min.temperature ? current : min
      )
    : undefined
);
</script>

<template>
  <div v-if="meanTemperature !== undefined">
    Średnia temperatura: {{ meanTemperature }}°C
  </div>
  <div v-if="true">Średnia temperatura w dzień: {{ meanDayTemperature }}°C</div>
  <div v-if="true">
    Średnia temperatura w nocy: {{ meanNightTemperature }}°C
  </div>
  <div v-if="higherTemp !== undefined">
    Najwyższa temperatura: {{ higherTemp!.temperature }}°C :
    {{ formatISO(higherTemp!.date) }}
  </div>
  <div v-if="lowerTemp !== undefined">
    Najniższa temperatura: {{ lowerTemp!.temperature }}°C :
    {{ formatISO(lowerTemp!.date) }}
  </div>
</template>
