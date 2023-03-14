<script setup>
import { hexToRgb } from '@layouts/utils';
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme()

const series = [{
  data: [
    40,
    65,
    50,
    45,
    90,
    55,
    70,
  ],
}]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  
  return {
    chart: {
      parentHeightOffset: 0,
      type: 'bar',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        barHeight: '60%',
        columnWidth: '38%',
        startingShape: 'rounded',
        endingShape: 'rounded',
        borderRadius: 4,
        distributed: true,
      },
    },
    grid: {
      show: false,
      padding: {
        top: -30,
        bottom: 0,
        left: -10,
        right: -10,
      },
    },
    colors: [
      `rgba(${ hexToRgb(currentTheme.primary) },${ variableTheme['dragged-opacity'] })`,
      `rgba(${ hexToRgb(currentTheme.primary) },${ variableTheme['dragged-opacity'] })`,
      `rgba(${ hexToRgb(currentTheme.primary) },${ variableTheme['dragged-opacity'] })`,
      `rgba(${ hexToRgb(currentTheme.primary) },${ variableTheme['dragged-opacity'] })`,
      currentTheme.primary,
      `rgba(${ hexToRgb(currentTheme.primary) },${ variableTheme['dragged-opacity'] })`,
      `rgba(${ hexToRgb(currentTheme.primary) },${ variableTheme['dragged-opacity'] })`,
    ],
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: [
        'Mo',
        'Tu',
        'We',
        'Th',
        'Fr',
        'Sa',
        'Su',
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: `rgba(${ hexToRgb(currentTheme['on-surface']) },${ variableTheme['disabled-opacity'] })`,
          fontSize: '14px',
          fontFamily: 'Public Sans',
        },
      },
    },
    yaxis: { labels: { show: false } },
    tooltip: { enabled: false },
    responsive: [{
      breakpoint: 1025,
      options: { chart: { height: 199 } },
    }],
  }
})

const earningsReports = [
  {
    color: 'primary',
    icon: 'tabler-alarm',
    title: 'Temps écoulé',
    amount: '$545.69',
    progress: '70',
  },
  {
    color: 'error',
    icon: 'tabler-angle',
    title: 'Activités réalisés',
    amount: '$74.19',
    progress: '37',
  },
]
</script>

<template>
  <VCard>
    <VCardItem class="pb-0">
      <VCardTitle>Progression Globale</VCardTitle>
    </VCardItem>

    <VCardText>
      <div class="border rounded mt-3 pa-4">
        <VRow>
          <VCol
            v-for="report in earningsReports"
            :key="report.title"
            cols="12"
            sm="6"
          >
            <div class="d-flex align-center">
              <VAvatar
                rounded
                size="30"
                :color="report.color"
                variant="tonal"
                class="me-2"
              >
                <VIcon :icon="report.icon" />
              </VAvatar>

              <h6 class="text-base font-weight-medium">
                {{ report.title }}
                <VTooltip
                  activator="parent"
                  location="top"
                >
                  {{ report.progress }}%
                </VTooltip>
              </h6>
            </div>
            <VDivider vertical="14px" />
            <VProgressLinear
              :model-value="report.progress"
              :color="report.color"
              height="8"
              rounded
              rounded-bar
            />
          </VCol>
        </VRow>
      </div>
    </VCardText>
  </VCard>
</template>
