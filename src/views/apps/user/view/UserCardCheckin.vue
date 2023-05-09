<script setup>
import { useEmployeeListStore } from '@/views/apps/user/employeeListStore'
import { getHeatMapChartConfig } from '@core/libs/apex-chart/apexCharConfig'
import { ref, watchEffect } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const logbookReceiver = ref([])
const logbook = ref([])
const logDates = ref([])
const logPresences = ref([])
const logLate = ref([])
const lateHeatData = ref([])
const presenceHeatData = ref([])
let series = ref([])

const vuetifyTheme = useTheme()
const chartConfig = computed(() => getHeatMapChartConfig(vuetifyTheme.current.value))

const employeeListStore = useEmployeeListStore()

const structureDataHeat = (xval, yval, present=true) => {
  let i = 0
  const series = []
  while (i < xval.length) {
    const x = xval[i].split("-")[2]
    let y = 0
    if(present){ if(yval[i]){ y = 0 } else { y = 1}}
    else{ if(yval[i]){ y = 1} else { y = 0} }

    series.push({ x, y })
    i += 1
  }
  
  return series
}

watchEffect(() =>{
  logbookReceiver.value = employeeListStore.employeeLogbook
  if(logbookReceiver.value){
    logbook.value = logbookReceiver.value.data
    let idxLogDate = logbook.value.logbook.index.indexOf("logDate")
    let idxIsPresent = logbook.value.logbook.index.indexOf("isPresent")
    let idxIsLate = logbook.value.logbook.index.indexOf("isLate")
    logLate.value = logbook.value.logbook.data[idxIsLate]
    logDates.value = logbook.value.logbook.data[idxLogDate]
    logPresences.value = logbook.value.logbook.data[idxIsPresent]

    lateHeatData.value = structureDataHeat(logDates.value, logLate.value, false)
    presenceHeatData.value = structureDataHeat(logDates.value, logPresences.value)

    series.value = ref(null)
    series.value = [
      {
        name: 'RETARD',
        data: lateHeatData.value,
      },
      {
        name: 'ABSENCE',
        data: presenceHeatData.value,
      },
    ]
  }
})
</script>

<template>
  <VueApexCharts
    v-if="series && series.length > 0"
    type="heatmap"
    height="180"
    :options="chartConfig"
    :series="series"
  /><br>
</template>
