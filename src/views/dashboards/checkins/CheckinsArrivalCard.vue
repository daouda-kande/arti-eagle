<script setup>
import { resolveLocalDateVariant, subStringNameForAvatar } from '@/plugins/helpers';
import { avatarText } from '@core/utils/formatters';

const p = defineProps({
  checkinData: {
    type: Object,
    required: true,
  },
  metaData: {
    type: Object,
    required: true,
  },
})

const sourcecheckins = [
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
    :subtitle="p.metaData.lateCount + ' retards sur ' + p.metaData.presence + ' présences'"
  >
    <template #append>
      <div class="mt-n4 me-n2">
        <span class="text-sm text-disabled">{{ resolveLocalDateVariant(p.metaData.logDate) }}</span>
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
          v-for="checkin in checkinData"
          :key="checkin.positionId"
        >
          <template #prepend>
            <VAvatar
              rounded
              size="34"
              color="secondary"
              variant="tonal"
            >
              <span class="font-weight-semibold">
                {{ avatarText(subStringNameForAvatar(checkin.fullName)) }}
              </span>
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ checkin.fullName }}
          </VListItemTitle>
          <VListItemSubtitle class="opacity-100 text-disabled">
            {{ checkin.logCount }} pointage(s)
          </VListItemSubtitle>

          <template #append>
            <div class="d-flex align-center">
              <VChip
                label
                :color="checkin.isLate ? 'error' : 'success'"
              >
                {{ checkin.checkIn }}
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
