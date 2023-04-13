<script setup>
import { zerofill } from '@/plugins/helpers';
import { avatarText } from '@core/utils/formatters';

const sourceVisits = [
  {
    avatarIcon: '1',
    title: 'Direct Source',
    subtitle: '3 absences',
    stats: '1.2k',
    profitLoss: '7',
  },
  {
    avatarIcon: '2',
    title: 'Social Network',
    subtitle: '1 absence',
    stats: '31.5k',
    profitLoss: '5',
  },
  {
    avatarIcon: '3',
    title: 'Email Newsletter',
    subtitle: '4 absences',
    stats: '893',
    profitLoss: '3',
  },
  {
    avatarIcon: '4',
    title: 'Referrals',
    subtitle: '1 absence',
    stats: '342',
    profitLoss: '2',
  },
  {
    avatarIcon: '5',
    title: 'Alexy celeste',
    subtitle: '5 absence',
    stats: '2.15k',
    profitLoss: '2',
  },
  {
    avatarIcon: '6',
    title: 'Other',
    subtitle: '1 absence',
    stats: '12.5k',
    profitLoss: '1',
  },
]

function resolveLateCountStatus(c) {
  if (c > 2) return "error"
  if (c > 1 && c <= 2) return "warning"
  
  return "success"
}
</script>

<template>
  <VCard
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
          v-for="visit in sourceVisits"
          :key="visit.title"
        >
          <template #prepend>
            <VAvatar
              variant="tonal"
              color="secondary"
              size="34"
              rounded
            >
              <span>{{ avatarText(visit.avatarIcon) }}</span>
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ visit.title }}
          </VListItemTitle>
          <VListItemSubtitle class="opacity-100 text-disabled">
            {{ visit.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <div class="d-flex align-center">
              <VChip
                label
                :color="resolveLateCountStatus(visit.profitLoss)"
              >
                {{ zerofill(visit.profitLoss) }}
              </VChip>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 19px;
}
</style>
