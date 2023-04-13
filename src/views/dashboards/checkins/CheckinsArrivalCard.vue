<script setup>
import { timeDiff } from '@/plugins/helpers';

const sourceVisits = [
  {
    avatarIcon: 'tabler-arrows-left-right',
    title: 'Direct Source',
    subtitle: '3 pointages',
    stats: '1.2k',
    profitLoss: '07:50',
  },
  {
    avatarIcon: 'tabler-arrows-left-right',
    title: 'Social Network',
    subtitle: '1 pointage',
    stats: '31.5k',
    profitLoss: '07:00',
  },
  {
    avatarIcon: 'tabler-arrows-left-right',
    title: 'Email Newsletter',
    subtitle: '4 pointages',
    stats: '893',
    profitLoss: '07:50',
  },
  {
    avatarIcon: 'tabler-arrows-left-right',
    title: 'Referrals',
    subtitle: '1 pointage',
    stats: '342',
    profitLoss: '08:20',
  },
  {
    avatarIcon: 'tabler-arrows-left-right',
    title: 'Alexy celeste',
    subtitle: '5 pointage',
    stats: '2.15k',
    profitLoss: '07:30',
  },
  {
    avatarIcon: 'tabler-arrows-left-right',
    title: 'Other',
    subtitle: '1 pointage',
    stats: '12.5k',
    profitLoss: '08:10',
  },
]
</script>

<template>
  <VCard
    title="Pointages"
    subtitle="15 retards sur 30 présences"
  >
    <template #append>
      <div class="mt-n4 me-n2">
        <span class="text-sm text-disabled">Lundi 17 avril 2023</span>
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
              size="34"
              color="secondary"
              variant="tonal"
              rounded
            >
              <VIcon :icon="visit.avatarIcon" />
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
                :color="timeDiff(visit.profitLoss) > 0 ? 'success' : 'error'"
              >
                {{ visit.profitLoss }}
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
