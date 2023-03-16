<script setup>
import aeIcon from '@images/icons/payments/ae-icon.png';
import mastercardIcon from '@images/icons/payments/mastercard-icon.png';
import visaIcon from '@images/icons/payments/visa-icon.png';
import CardBudgetState from './components/CardBudgetState.vue';

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
    <VDivider :length="20" />
    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th>OBJET</th>
          <th>DATE</th>
          <th>MONTANT</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="transition in lastTransitions"
          :key="transition.lastDigit"
        >
          <td style="padding-block: 0.61rem;">
            <div class="d-flex align-center">
              <div>
                <p class="text-sm mb-0">
                  <VChip
                    label
                    color="primary"
                  >
                    {{ transition.cardType }}
                  </VChip>
                </p>
              </div>
            </div>
          </td>
          <td style="padding-block: 0.61rem;">
            <span class="text-sm">{{ transition.sentDate }}</span>
          </td>
          <td style="padding-block: 0.61rem;">
            <span class="text-base">{{ transition.trend }}</span>
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>
