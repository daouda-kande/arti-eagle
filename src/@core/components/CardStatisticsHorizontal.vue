<script setup>
const props = defineProps({
  projectData: {
    type: Object,
    required: true,
  },
})

const statisticsHorizontal = [
  {
    title: 'Activités',
    color: 'error',
    icon: 'tabler-cpu',
    stats:props.projectData[0].tasks,
  },
  {
    title: 'Personnes',
    color: 'success',
    icon: ' tabler-users',
    stats: props.projectData[0].resources,
  },
  {
    title: 'FCFA',
    color: 'warning',
    icon: 'tabler-wallet',
    stats: props.projectData[0].budget,
  },
]
</script>

<template>
  <VRow>
    <VCol
      v-for="statistics in statisticsHorizontal"
      :key="statistics.title"
      cols="12"
      lg="4"
      sm=""
      md="6"
    >
      <VCard>
        <VCardText class="d-flex align-center justify-space-between">
          <div>
            <div class="d-flex align-center flex-wrap">
              <span class="text-h6 font-weight-semibold">{{ statistics.stats }}</span>
            </div>
            <span class="text-body-2">{{ statistics.title }}</span>
          </div>

          <VAvatar
            :icon="statistics.icon"
            :color="statistics.color"
            :size="42"
            variant="tonal"
          />
        </VCardText>
      </vcard>
    </VCol>
  </VRow>
</template>
