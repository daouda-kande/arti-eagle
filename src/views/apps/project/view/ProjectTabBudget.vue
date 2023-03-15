<script setup>
import aeIcon from '@images/icons/payments/ae-icon.png'
import mastercardIcon from '@images/icons/payments/mastercard-icon.png'
import visaIcon from '@images/icons/payments/visa-icon.png'

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

const resolveStatus = {
  Verified: 'success',
  Rejected: 'error',
  Pending: 'primary',
}
</script>

<template>
  <VCard title="Transactions">
    <VDivider />
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
