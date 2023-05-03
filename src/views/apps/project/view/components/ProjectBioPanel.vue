<script setup>
const props = defineProps({
  projectData: {
    type: Object,
    required: true,
  },
})

const standardPlan = {
  plan: 'Standard',
  price: 99,
  benefits: [
    '10 Users',
    'Up to 10GB storage',
    'Basic Support',
  ],
}

const isUserInfoEditDialogVisible = ref(false)
const isUpgradePlanDialogVisible = ref(false)

const resolveProjectStatusVariant = stat => {
  if (stat === 'SCHEDULED')
    return { status:'Non Demarré', color:'secondary' }
  if (stat === 'IN_PROGRESS')
    return { status:'En Cours', color:'info' }
  if (stat === 'STOPPED')
    return { status:'Suspendu', color:'warning' }
  if (stat === 'Failled')
    return { status:'Echec', color:'error' }
  if (stat === 'FINISHED')
    return { status:'Terminé', color:'success' }
}

const resolveProjectDateVariant = d => {
  const date = new Date(d)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  
  return date.toLocaleDateString('fr-FR', options)
}
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard>
        <VCardText class="text-center pt-7">
          <!-- 👉 User fullName -->
          <VChip
            label
            :color="resolveProjectStatusVariant(props.projectData.bio[0].status).color"
            size="large"
            variant="elevated"
          >
            {{ resolveProjectStatusVariant(props.projectData.bio[0].status).status }}
          </VChip><br>
          <h6 class="text-h6 mt-4">
            {{ props.projectData.bio[0].name }}
          </h6>

          <!-- 👉 Role chip -->
          <VChip
            label
            color="primary"
            size="small"
            class="text-capitalize mt-4"
          >
            @code: {{ props.projectData.bio[0].code }}
          </VChip>
        </VCardText>

        <VDivider />

        <!-- 👉 Details Section -->
        <VCardText>
          <p class="text-sm text-uppercase text-disabled">
            Details
          </p>

          <!-- 👉 User Details list -->
          
          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Direction:
                  <span class="text-body-2">{{ props.projectData.bio[0].comment }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Date de début:
                  <span class="text-body-2">{{ resolveProjectDateVariant(props.projectData.bio[0].startDate) }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Date de fin:
                  <span class="text-body-2">{{ resolveProjectDateVariant(props.projectData.bio[0].endDate) }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <br> <VDivider /><br>
          </VList>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- 👉 Project delays -->
    <VCol cols="12">
      <VCard
        title="Retard"
        subtitle="Jours de retard cumulés"
      >
        <VCardText>
          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  <VChip
                    label
                    color="success"
                  >
                    0 jour(s) de retard
                  </VChip>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <!-- 👉 Edit user info dialog -->
  <UserInfoEditDialog
    v-model:isDialogVisible="isUserInfoEditDialogVisible"
    :user-data="props.projectData"
  />

  <!-- 👉 Upgrade plan dialog -->
  <UserUpgradePlanDialog v-model:isDialogVisible="isUpgradePlanDialogVisible" />
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.7rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
