<script setup>
import { zerofill } from '@/plugins/helpers';

import { useCheckinStore } from '@/views/dashboards/checkins/useCheckinStore';

const checkinStore = useCheckinStore()
const lateData = ref()

checkinStore.fetchCheckin().then(response => {
  lateData.value = response.data.late_occurence

})

function resolveLateCountStatus(c) {
  if (c > 2) return "error"
  if (c > 1 && c <= 2) return "warning"
  
  return "success"
}
</script>

<template>
  <VCard
    v-if="lateData"
    title="Occurence des retards"
    subtitle="Liste des employés selon les retards"
  >
    <template #append>
      <div class="mt-n4 me-n2">
        <span class="text-sm text-disabled">Avril 2023</span>
        <VBtn
          icon
          color="default"
          size="x-small"
          variant="plain"
        >
          <VIcon
            size="22"
            icon="tabler-dots-vertical"
          />

          <VMenu activator="parent">
            <VList>
              <VListItem
                v-for="(item, index) in ['Refresh', 'Download', 'View All']"
                :key="index"
                :value="index"
              >
                <VListItemTitle>{{ item }}</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </VBtn>
      </div>
    </template>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="(late, index) in lateData"
          :key="late.positionId"
        >
          <template #prepend>
            <VAvatar
              variant="tonal"
              color="primary"
              size="34"
              rounded
            >
              <span>{{ index + 1 }}</span>
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ late.lastName }} {{ late.fisrtName }}
          </VListItemTitle>
          <VListItemSubtitle class="opacity-100 text-disabled">
            {{ 20 - late.monthLogCount }} absences
          </VListItemSubtitle>

          <template #append>
            <div class="d-flex align-center">
              <VChip
                label
                :color="resolveLateCountStatus(late.monthLateCount)"
              >
                {{ zerofill(late.monthLateCount) }}
              </VChip>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
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
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 19px;
}
</style>
