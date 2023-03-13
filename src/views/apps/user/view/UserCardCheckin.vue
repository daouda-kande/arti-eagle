<script setup>
import { getHeatMapChartConfig } from '@core/libs/apex-chart/apexCharConfig';
import VueApexCharts from 'vue3-apexcharts';
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme()
const chartConfig = computed(() => getHeatMapChartConfig(vuetifyTheme.current.value))

const generateDataHeat = (count, yrange) => {
  let i = 0
  const series = []
  while (i < count) {
    const x = `w${ (i + 1).toString() }`
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min

    series.push({
      x,
      y,
    })
    i += 1
  }
  
  return series
}

const series = [
  {
    name: 'RETARDS',
    data: generateDataHeat(20, {
      min: 0,
      max: 1,
    }),
  },
  {
    name: 'ABSENCES',
    data: generateDataHeat(20, {
      min: 0,
      max: 1,
    }),
  },
]
</script>

<template>
  <VueApexCharts
    type="heatmap"
    height="150"
    :options="chartConfig"
    :series="series"
  /><br>
</template>
