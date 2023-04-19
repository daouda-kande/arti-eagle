<script setup>
const earningsReports = [
  {
    color: 'primary',
    icon: 'tabler-alarm',
    title: 'Temps écoulé',
    amount: '$545.69',
    progress: '70',
  },
  {
    color: 'error',
    icon: 'tabler-angle',
    title: 'Activités réalisés',
    amount: '$74.19',
    progress: '37',
  },
]
</script>

<template>
  <VCard>
    <VCardItem class="pb-0">
      <VCardTitle>Progression Globale</VCardTitle>
    </VCardItem>

    <VCardText>
      <div class="border rounded mt-3 pa-4">
        <VRow>
          <VCol
            v-for="report in earningsReports"
            :key="report.title"
            cols="12"
            sm="6"
          >
            <div class="d-flex align-center">
              <VAvatar
                rounded
                size="30"
                :color="report.color"
                variant="tonal"
                class="me-2"
              >
                <VIcon :icon="report.icon" />
              </VAvatar>

              <h6 class="text-base font-weight-medium">
                {{ report.title }}
                <VTooltip
                  activator="parent"
                  location="top"
                >
                  {{ report.progress }}%
                </VTooltip>
              </h6>
            </div>
            <VDivider vertical />
            <VProgressLinear
              :model-value="report.progress"
              :color="report.color"
              height="8"
              rounded
              rounded-bar
            />
          </VCol>
        </VRow>
      </div>
    </VCardText>
  </VCard>
</template>
