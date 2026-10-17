<script setup lang="ts">
import { Line } from 'vue-chartjs';
import { format, parseISO } from 'date-fns';
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
import type { ChartFilter } from '@/model/ChartFilter';
import { filterTempRows } from '@/utils/FilterTempRows';
import DataAggregation from './DataAggregation.vue';

const temperatureApi: TempApiImplementation = new TempApiImplementation();
const sensor1Temperatures: Ref<TempDTO[]> = ref([]);
const sensor2Temperatures: Ref<TempDTO[]> = ref([]);
const sensor3Temperatures: Ref<TempDTO[]> = ref([]);
const temperaturesChartArray: Ref<TempDTO[]> = ref([]);
const filteredSensorTemperatures = ref({
  sensor1: [] as TempDTO[],
  sensor2: [] as TempDTO[],
  sensor3: [] as TempDTO[],
});
const chartFilterEvent = ref('');

onMounted(() => {
  temperatureApi.getTemps(sensor1Temperatures.value, 1);
  temperatureApi.getTemps(sensor2Temperatures.value, 2);
  temperatureApi.getTemps(sensor3Temperatures.value, 3);
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

const getFilteredTemperatures = (temps: TempDTO[]): TempDTO[] => {
  if (!chartFilterEvent.value) {
    return temps;
  }

  const dates = chartFilterEvent.value.split('|');
  const startDate = dates[0];
  const endDate = dates[1];
  const newFilter: ChartFilter = {
    startDate: parseISO(startDate),
    endDate: parseISO(endDate),
  };

  return filterTempRows(temps, newFilter);
};

const buildSeriesData = (labels: string[], temps: TempDTO[]) =>
  labels.map((label) => {
    const matchingTemp = temps.find(
      (temp) => format(temp.date, 'yyyy-MM-dd HH:mm') === label
    );
    return matchingTemp ? matchingTemp.temperature : null;
  });

const updateChartData = () => {
  const filteredSensor1 = getFilteredTemperatures(sensor1Temperatures.value);
  const filteredSensor2 = getFilteredTemperatures(sensor2Temperatures.value);
  const filteredSensor3 = getFilteredTemperatures(sensor3Temperatures.value);

  filteredSensorTemperatures.value = {
    sensor1: filteredSensor1,
    sensor2: filteredSensor2,
    sensor3: filteredSensor3,
  };

  temperaturesChartArray.value = [
    ...filteredSensor1,
    ...filteredSensor2,
    ...filteredSensor3,
  ];

  const allLabels = Array.from(
    new Set(
      [
        ...filteredSensor1.map((temp) => format(temp.date, 'yyyy-MM-dd HH:mm')),
        ...filteredSensor2.map((temp) => format(temp.date, 'yyyy-MM-dd HH:mm')),
        ...filteredSensor3.map((temp) => format(temp.date, 'yyyy-MM-dd HH:mm')),
      ]
    )
  ).sort();

  chartData.value = {
    labels: allLabels,
    datasets: [
      {
        label: 'Czujnik 1',
        backgroundColor: '#f87979',
        borderColor: '#f87979',
        data: buildSeriesData(allLabels, filteredSensor1),
      },
      {
        label: 'Czujnik 2',
        backgroundColor: '#4cc9f0',
        borderColor: '#4cc9f0',
        data: buildSeriesData(allLabels, filteredSensor2),
      },
      {
        label: 'Czujnik 3',
        backgroundColor: '#90be6d',
        borderColor: '#90be6d',
        data: buildSeriesData(allLabels, filteredSensor3),
      },
    ],
  };
};

watch(
  [sensor1Temperatures, sensor2Temperatures, sensor3Temperatures],
  () => updateChartData(),
  { deep: true }
);

watch(chartFilterEvent, () => updateChartData());

let chartData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: 'Czujnik 1',
      backgroundColor: '#f87979',
      borderColor: '#f87979',
      data: [] as Array<number | null>,
    },
    {
      label: 'Czujnik 2',
      backgroundColor: '#4cc9f0',
      borderColor: '#4cc9f0',
      data: [] as Array<number | null>,
    },
    {
      label: 'Czujnik 3',
      backgroundColor: '#90be6d',
      borderColor: '#90be6d',
      data: [] as Array<number | null>,
    },
  ],
});

let chartOptions: {
  responsive: true;
  maintainAspectRatio: false;
};
</script>

<template>
  <div style="display: flex">
    <div style="width: 70%">
      <MainChartFilters
        @filter-event="(filter) => (chartFilterEvent = filter)"
      />
      <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
    <div style="color: aliceblue">
      <DataAggregation :sensor-temperatures="filteredSensorTemperatures" />
    </div>
  </div>
</template>
