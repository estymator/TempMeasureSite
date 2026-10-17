<script setup lang="ts">
import type { TempDTO } from "@/requests/TempDTO";
import { formatISO } from "date-fns";
import { computed } from "vue";

type SensorStats = {
  meanTemperature: number | undefined;
  meanDayTemperature: number | undefined;
  meanNightTemperature: number | undefined;
  higherTemp: TempDTO | undefined;
  lowerTemp: TempDTO | undefined;
};

const props = defineProps<{
  sensorTemperatures: {
    sensor1: TempDTO[];
    sensor2: TempDTO[];
    sensor3: TempDTO[];
  };
}>();

const getStats = (temperatures: TempDTO[]): SensorStats => {
  if (temperatures.length === 0) {
    return {
      meanTemperature: undefined,
      meanDayTemperature: undefined,
      meanNightTemperature: undefined,
      higherTemp: undefined,
      lowerTemp: undefined,
    };
  }

  const meanTemperature =
    temperatures.reduce((acc, val) => acc + val.temperature, 0) / temperatures.length;

  const dayTemps = temperatures.filter(
    (temp) => temp.date.getHours() >= 8 && temp.date.getHours() <= 18
  );
  const meanDayTemperature =
    dayTemps.length > 0
      ? dayTemps.reduce((acc, val) => acc + val.temperature, 0) / dayTemps.length
      : undefined;

  const nightTemps = temperatures.filter(
    (temp) => temp.date.getHours() >= 19 || temp.date.getHours() <= 7
  );
  const meanNightTemperature =
    nightTemps.length > 0
      ? nightTemps.reduce((acc, val) => acc + val.temperature, 0) / nightTemps.length
      : undefined;

  const higherTemp = temperatures.reduce((max, current) =>
    current.temperature > max.temperature ? current : max
  );

  const lowerTemp = temperatures.reduce((min, current) =>
    current.temperature < min.temperature ? current : min
  );

  return {
    meanTemperature,
    meanDayTemperature,
    meanNightTemperature,
    higherTemp,
    lowerTemp,
  };
};

const sensors = computed(() => [
  {
    label: "Czujnik 1",
    stats: getStats(props.sensorTemperatures.sensor1),
  },
  {
    label: "Czujnik 2",
    stats: getStats(props.sensorTemperatures.sensor2),
  },
  {
    label: "Czujnik 3",
    stats: getStats(props.sensorTemperatures.sensor3),
  },
]);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <div
      v-for="sensor in sensors"
      :key="sensor.label"
      style="border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 8px"
    >
      <h4 style="margin: 0 0 8px; color: aliceblue">{{ sensor.label }}</h4>

      <div v-if="sensor.stats.meanTemperature !== undefined">
        Średnia temperatura: {{ sensor.stats.meanTemperature }}°C
      </div>
      <div v-if="sensor.stats.meanDayTemperature !== undefined">
        Średnia temperatura w dzień: {{ sensor.stats.meanDayTemperature }}°C
      </div>
      <div v-if="sensor.stats.meanNightTemperature !== undefined">
        Średnia temperatura w nocy: {{ sensor.stats.meanNightTemperature }}°C
      </div>
      <div v-if="sensor.stats.higherTemp !== undefined">
        Najwyższa temperatura: {{ sensor.stats.higherTemp.temperature }}°C :
        {{ formatISO(sensor.stats.higherTemp.date) }}
      </div>
      <div v-if="sensor.stats.lowerTemp !== undefined">
        Najniższa temperatura: {{ sensor.stats.lowerTemp.temperature }}°C :
        {{ formatISO(sensor.stats.lowerTemp.date) }}
      </div>
      <div v-if="sensor.stats.meanTemperature === undefined">
        Brak danych dla tego czujnika.
      </div>
    </div>
  </div>
</template>
