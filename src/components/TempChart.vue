<script setup lang="ts">
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { onMounted, ref, watch } from 'vue';
import type { Ref } from 'vue';
import type { TempDTO } from '@/requests/TempDTO';
import { TempApiImplementation } from '@/requests/TempAPI';

const temperatureApi: TempApiImplementation = new TempApiImplementation();
const temperaturesArray: Ref<TempDTO[]> = ref([]);
const chartTempLabel: string = 'Temperatura';

onMounted(() => {
  temperatureApi.getTemps(temperaturesArray.value);
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

watch(
  temperaturesArray,
  (newTemps) => {
    let newLabels: string[] = newTemps.map((temp) =>
      temp.date.toLocaleString()
    );
    let newValues: number[] = newTemps.map((temp) => temp.temperature);

    chartData.value = {
      labels: newLabels,
      datasets: [
        {
          label: chartTempLabel,
          backgroundColor: '#f87979',
          data: newValues,
        },
      ],
    };
  },
  { deep: true }
);

let chartData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: chartTempLabel,
      backgroundColor: '#f87979',
      data: [] as number[],
    },
  ],
});

let chartOptions: {
  responsive: true;
  maintainAspectRatio: false;
};
</script>

<template>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
