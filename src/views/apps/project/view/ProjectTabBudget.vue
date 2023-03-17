<script setup>
import { resolveLocalDateVariant } from '@/plugins/helpers'
import aeIcon from '@images/icons/payments/ae-icon.png'
import mastercardIcon from '@images/icons/payments/mastercard-icon.png'
import visaIcon from '@images/icons/payments/visa-icon.png'
import CardBudgetState from './components/CardBudgetState.vue'

const lastTransitions = [
  {
    cardImg: visaIcon,
    lastDigit: '*4230',
    cardType: 'Phase 1',
    sentDate: '17 Mar 2022',
    status: 'Pending',
    trend: '10 000 000',
  },
  {
    cardImg: mastercardIcon,
    lastDigit: '*5578',
    cardType: 'Phase 2',
    sentDate: '12 Feb 2022',
    status: 'Pending',
    trend: '1 796 300',
  },
  {
    cardImg: aeIcon,
    lastDigit: '*4567',
    cardType: 'Phase 3',
    sentDate: '28 Feb 2022',
    status: 'Pending',
    trend: '4 750 000',
  },
]

const budgetData = [
  {
    subtitle: 'Budget alloué',
    avatarImg: visaIcon,
    title: '12 500 000',
    stats: '100',
    progress: 'success',
  },
  {
    subtitle: 'Budget consommé',
    avatarImg: visaIcon,
    title: '4 575 000',
    stats: '36.6',
    progress: 'error',
  },
]

const resolveStatus = {
  Verified: 'success',
  Rejected: 'error',
  Pending: 'primary',
}
</script>

<template>
  <!-- 👉 Budget Stat Cards -->
  <VRow class="mb-1">
    <VCol
      v-for="budget in budgetData"
      :key="budget.title"
      cols="12"
      md="6"
      lg="6"
    >
      <CardBudgetState :budget-data="budget" />
    </VCol>
  </VRow>

  <!-- 👉 Transactions -->
  <VCard title="Transactions">
    <VCardText>
      <VTimeline
        side="end"
        align="start"
        truncate-line="both"
        density="compact"
        class="v-timeline-density-compact"
      >
        <VTimelineItem
          dot-color="primary"
          size="x-small"
        >
          <!-- 👉 Header -->
          <div class="d-flex justify-space-between">
            <h6 class="text-base font-weight-semibold me-3">
              Paiement librable de la phase 1
            </h6>
            <span class="text-sm text-disabled">{{ resolveLocalDateVariant("2023-06-12") }}</span>
          </div>

          <!-- 👉 Content -->
          <p class="mb-1">
            <span class="me-2">Réglé par <span class="text-sm text-primary">M'Baye Konan </span>
              
            </span>
            <VAvatar
              :image="avatar2"
              size="20"
            />
          </p>
          <VSpacer />
          <span class="mb-1">
            <VChip color="primary">
              4 000 000 FCFA
            </VChip>
          </span>
        </VTimelineItem>

        <VTimelineItem
          dot-color="primary"
          size="x-small"
        >
          <!-- 👉 Header -->
          <div class="d-flex justify-space-between">
            <h6 class="text-base font-weight-semibold me-3">
              Paiement de la phase de démarrage du projet
            </h6>
            <span class="text-sm text-disabled">{{ resolveLocalDateVariant("2023-04-28") }}</span>
          </div>

          <!-- 👉 Content -->
          <p class="mb-1">
            <span class="me-2">Réglé par <span class="text-sm text-primary">MBailly </span>
              
            </span>
            <VAvatar
              :image="avatar2"
              size="20"
            />
          </p>
          <VSpacer />
          <span class="mb-1">
            <VChip color="primary">
              575 000 FCFA
            </VChip>
          </span>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>
