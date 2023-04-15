<script setup>
import CheckinsArrivalCard from '@/views/dashboards/checkins/CheckinsArrivalCard.vue';
import CheckinsLateRankingCard from '@/views/dashboards/checkins/CheckinsLateRankingCard.vue';
import { useCheckinStore } from '@/views/dashboards/checkins/useCheckinStore';

const checkinStore = useCheckinStore()
const checkinData = ref()
const metaData = ref()
const lateOccurenceData = ref()

checkinStore.fetchCheckin().then(response => {
  checkinData.value = response.data.checkins.checkins
  metaData.value = response.data.checkins.metadata
  lateOccurenceData.value = response.data.late_occurence
  console.log("DEBUG - Dashbord Checkin")
  console.log(checkinData)
  console.log(metaData)
  console.log(lateOccurenceData)
})
</script>

<template>
  <VRow class="">
    <!-- 👉 Source Visits -->
    <VCol
      v-if="checkinData && metaData"
      cols="12"
      sm="6"
      lg="6"
    >
      <CheckinsArrivalCard
        :checkin-data="checkinData"
        :meta-data="metaData"
      />
    </VCol>
    <VCard
      v-else
      cols="12"
      sm="6"
      lg="6"
    >
      <VProgressCircular
        indeterminate
        color="primary"
      />
    </VCard>

    <!-- 👉 Source Visits -->
    <VCol
      cols="12"
      sm="6"
      lg="6"
    >
      <CheckinsLateRankingCard />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
