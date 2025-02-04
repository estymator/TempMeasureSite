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
import { onMounted, reactive, ref } from 'vue';
import { TempDTO } from '@/requests/TempDTO';
import { TempApiImplementation } from '@/requests/TempAPI';

const temperatureApi: TempApiImplementation = new TempApiImplementation();
const temperaturesState :TempDTO[] = reactive([]);


onMounted(() => {
  temperatureApi.getTemps(temperaturesState);
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

let chartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40],
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
