<script setup>
import { hexToRgb } from '@layouts/utils';
import VueApexCharts from 'vue3-apexcharts';
import { useTheme } from 'vuetify';
import UserCardCheckin from './UserCardCheckin.vue';

const vuetifyTheme = useTheme()

const series = {
  bar: [
    {
      name: 'Retards',
      data: [
        270,
        210,
        180,
        200,
        250,
        280,
        250,
        270,
        150,
      ],
    },
    {
      name: 'Absences',
      data: [
        -140,
        -160,
        -180,
        -150,
        -100,
        -60,
        -80,
        -100,
        -180,
      ],
    },
  ],
}

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const labelColor = `rgba(${ hexToRgb(currentTheme['on-surface']) },${ variableTheme['disabled-opacity'] })`
  const legendColor = `rgba(${ hexToRgb(currentTheme['on-background']) },${ variableTheme['high-emphasis-opacity'] })`
  const borderColor = `rgba(${ hexToRgb(String(variableTheme['border-color'])) },${ variableTheme['border-opacity'] })`
  
  return {
    bar: {
      chart: {
        parentHeightOffset: 0,
        stacked: true,
        type: 'bar',
        toolbar: { show: false },
      },
      tooltip: { enabled: false },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '40%',
          borderRadius: 8,
          startingShape: 'rounded',
          endingShape: 'rounded',
        },
      },
      colors: [
        currentTheme.primary,
        currentTheme.warning,
      ],
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: 6,
        lineCap: 'round',
        colors: [currentTheme.surface],
      },
      legend: {
        show: true,
        horizontalAlign: 'left',
        position: 'top',
        fontFamily: 'Public Sans',
        markers: {
          height: 12,
          width: 12,
          radius: 12,
          offsetX: -3,
          offsetY: 2,
        },
        labels: { colors: legendColor },
        itemMargin: { horizontal: 5 },
      },
      grid: {
        show: false,
        padding: {
          bottom: -8,
          top: 20,
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ],
        labels: {
          style: {
            fontSize: '14px',
            colors: labelColor,
            fontFamily: 'Public Sans',
          },
        },
        axisTicks: { show: false },
        axisBorder: { show: false },
      },
      yaxis: {
        labels: {
          offsetX: -16,
          style: {
            fontSize: '14px',
            colors: labelColor,
            fontFamily: 'Public Sans',
          },
        },
        min: -200,
        max: 300,
        tickAmount: 5,
      },
      responsive: [
        {
          breakpoint: 1700,
          options: { plotOptions: { bar: { columnWidth: '43%' } } },
        },
        {
          breakpoint: 1441,
          options: { plotOptions: { bar: { columnWidth: '52%' } } },
        },
        {
          breakpoint: 1280,
          options: { plotOptions: { bar: { columnWidth: '38%' } } },
        },
        {
          breakpoint: 1025,
          options: {
            plotOptions: { bar: { columnWidth: '70%' } },
            chart: { height: 390 },
          },
        },
        {
          breakpoint: 991,
          options: { plotOptions: { bar: { columnWidth: '38%' } } },
        },
        {
          breakpoint: 850,
          options: { plotOptions: { bar: { columnWidth: '48%' } } },
        },
        {
          breakpoint: 449,
          options: {
            plotOptions: { bar: { columnWidth: '70%' } },
            chart: { height: 360 },
            xaxis: { labels: { offsetY: -5 } },
          },
        },
        {
          breakpoint: 394,
          options: { plotOptions: { bar: { columnWidth: '88%' } } },
        },
      ],
      states: {
        hover: { filter: { type: 'none' } },
        active: { filter: { type: 'none' } },
      },
    },
  }
})
</script>

<template>
  <VCard
    title="Pointage hebdomadaire"
    subtitle="Mois de Janvier 2023"
  >
    <UserCardCheckin />  
  </VCard>

  <VDivider /><br>

  <VCard>
    <VRow no-gutters>
      <VCol
        cols="12"
        sm="12"
        lg="12"
        :class="$vuetify.display.smAndUp ? 'border-e' : 'border-b'"
      >
        <VCardText class="pe-2">
          <h6 class="text-h6 mb-6">
            Aperçu Global des Pointages
          </h6>

          <VueApexCharts
            :options="chartOptions.bar"
            :series="series.bar"
            height="365"
          />
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>

