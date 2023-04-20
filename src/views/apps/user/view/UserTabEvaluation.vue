<script setup>
const props = defineProps({
  userEval: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <VCard title="Chronologie">
    <VCardText>
      <VTimeline
        v-if="props.userEval"
        side="end"
        align="start"
        truncate-line="both"
        density="compact"
        class="v-timeline-density-compact"
      >
        <VTimelineItem
          v-for="evals in props.userEval"
          :key="evals.subtitle"
          dot-color="primary"
          size="x-small"
        >
          <!-- 👉 Header -->
          <div class="d-flex justify-space-between">
            <h6 class="text-base font-weight-semibold me-3">
              {{ evals.subtitle }}
            </h6>
            <span class="text-sm text-disabled"> {{ evals.evalDate }}</span>
          </div>

          <!-- 👉 Content -->
          <p class="mb-1">
            {{ evals.description }}
            <VChip color="error">
              {{ evals.status }}
            </VChip>
          </p>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>
