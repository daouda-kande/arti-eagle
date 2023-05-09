<script setup>
import { resolveLocalDateVariant } from '@/plugins/helpers';
import { useEmployeeListStore } from '@/views/apps/user/employeeListStore';

const evalList = ref([])

const employeeListStore = useEmployeeListStore()

evalList.value = employeeListStore.employeeEvaluationList.data.evaluations
</script>

<template>
  <VCard
    title="Chronologie"
    subtitle="Evaluations et évolutions"
  >
    <VCardText>
      <VTimeline
        side="end"
        align="start"
        truncate-line="both"
        density="compact"
        class="v-timeline-density-compact"
      >
        <VTimelineItem
          v-for="ev in evalList"
          :key="ev.evaluationId"
          dot-color="primary"
          size="x-small"
        >
          <!-- 👉 Header -->
          <div class="d-flex justify-space-between">
            <h6 class="text-base font-weight-semibold me-3">
              Evaluation trimestrielle
            </h6>
            <span class="text-sm text-disabled"> {{ resolveLocalDateVariant(ev.evalDate) }}</span>
          </div>

          <!-- 👉 Content -->
          <p class="mb-2">
            {{ ev.description }}
          </p>
          <p class="mb-1">
            <VChip color="primary">
              {{ ev.status }}
            </VChip>
          </p>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>
