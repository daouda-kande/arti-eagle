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

const resolveUserStatusVariant = stat => {
  if (stat === 'pending')
    return 'warning'
  if (stat === 'active')
    return 'success'
  if (stat === 'inactive')
    return 'secondary'
  
  return 'primary'
}

const resolveUserRoleVariant = role => {
  if (role === 'subscriber')
    return {
      color: 'warning',
      icon: 'tabler-user',
    }
  if (role === 'author')
    return {
      color: 'success',
      icon: 'tabler-circle-check',
    }
  if (role === 'maintainer')
    return {
      color: 'primary',
      icon: 'tabler-chart-pie-2',
    }
  if (role === 'editor')
    return {
      color: 'info',
      icon: 'tabler-pencil',
    }
  if (role === 'admin')
    return {
      color: 'secondary',
      icon: 'tabler-server-2',
    }
  
  return {
    color: 'primary',
    icon: 'tabler-user',
  }
}
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard>
        <VCardText class="text-center pt-15">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded
            :size="50"
            color="primary"
            variant="tonal"
          >
            <span
              class="text-2xl font-weight-semibold"
            >
              NP
            </span>
          </VAvatar>
          <!-- 👉 User fullName -->
          <h6 class="text-h6 mt-4">
            This is supposed to be a very long project name intended for test. Just for testing purpose.
          </h6>

          <!-- 👉 Role chip -->
          <VChip
            label
            color="primary"
            size="small"
            class="text-capitalize mt-4"
          >
            @code: {{ props.projectData.code }}
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
                  <span class="text-body-2">DSESP</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <!-- 👉 Contact Section -->
            <br> <VDivider /><br>
            <p class="text-sm text-uppercase text-disabled">
              Contacts
            </p>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Responsable:
                  <span class="text-body-2"> Gren CISSE Al-Karid</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Telephone:
                  <span class="text-body-2">0799852919</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Email:
                  <span class="text-body-2">al-moustapha.cisse@arti.ci</span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->
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
