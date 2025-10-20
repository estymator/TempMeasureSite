<script setup lang="ts">
import { Line } from 'vue-chartjs';
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
} from 'chart.js';
import { onMounted, ref, watch } from 'vue';
import type { Ref } from 'vue';
import type { TempDTO } from '@/requests/TempDTO';
import { TempApiImplementation } from '@/requests/TempAPI';
import MainChartFilters from './MainChartFilters.vue';

const temperatureApi: TempApiImplementation = new TempApiImplementation();
const temperaturesArray: Ref<TempDTO[]> = ref([]);
const chartTempLabel: string = 'Temperatura';

onMounted(() => {
  temperatureApi.getTemps(temperaturesArray.value);
});

ChartJS.register(
  TimeScale,
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
    let newLabels = newTemps.map((temp) =>
      format(temp.date, 'yyyy-MM-dd HH:mm')
    );
    let newValues = newTemps.map((temp) => temp.temperature);

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
  <MainChartFilters/>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
