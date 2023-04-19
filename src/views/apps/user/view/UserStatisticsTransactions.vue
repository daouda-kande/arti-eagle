<script setup>
import { currentDate } from '@/plugins/helpers'

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
})

const statistics = [
  {
    title: 'Absences',
    stats: props.userData.absence.done,
    statsMax: props.userData.absence.nb,
    icon: 'tabler-user-exclamation',
    color: 'primary',
    verb: ' justifées ',
  },
  {
    title: 'Evaluations',
    stats: props.userData.evaluation.done,
    statsMax: props.userData.evaluation.nb,
    icon: 'tabler-clipboard-check',
    color: 'info',
    verb: ' faites ',
  },
  {
    title: 'Activités',
    stats: props.userData.task.done,
    statsMax: props.userData.task.nb,
    icon: 'tabler-activity',
    color: 'error',
    verb: ' achevées ',
  },
  {
    title: 'Formations',
    stats: props.userData.training.done,
    statsMax: props.userData.training.nb,
    icon: 'tabler-clipboard-text',
    color: 'success',
    verb: ' cours ',
  },
]
</script>

<template>
  <VCard title="Vue d'ensemble">
    <template #append>
      <span class="text-sm text-disabled">Mise à jour :{{ currentDate() }}</span>
    </template>

    <VCardText>
      <VRow>
        <VCol
          v-for="item in statistics"
          :key="item.title"
          cols="6"
          md="3"
        >
          <div class="d-flex">
            <VAvatar
              :color="item.color"
              variant="tonal"
              size="42"
              class="me-3"
            >
              <VIcon
                size="24"
                :icon="item.icon"
              />
            </VAvatar>

            <div class="d-flex flex-column">
              <span>
                <span class="text-h6 font-weight-medium">{{ item.stats }}</span>
                <span class="text-caption">
                  {{ item.verb }}
                </span>
                <span class="text-h6 font-weight-medium">{{ item.statsMax }}</span>
              </span>
              <span class="text-caption">
                {{ item.title }}
              </span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
