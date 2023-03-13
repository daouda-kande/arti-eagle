<script setup>
</script>

<template>
  <VCard title="Chronologie">
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
              Evaluation trimestrielle
            </h6>
            <span class="text-sm text-disabled">17 juin 2022</span>
          </div>

          <!-- 👉 Content -->
          <p class="mb-1">
            <VChip color="error">
              DEMOTIVE
            </VChip>
          </p>
        </VTimelineItem>

        <VTimelineItem
          dot-color="success"
          size="x-small"
        >
          <!-- 👉 Header -->
          <div class="d-flex justify-space-between">
            <h6 class="text-base font-weight-semibold me-3">
              Promotion de poste
            </h6>
            <span class="text-sm text-disabled">7 juin 2022</span>
          </div>

          <!-- 👉 Content -->
          <p class="mb-1">
            Passé de Compatble à Chef Comptable
          </p>
        </VTimelineItem>

        <VTimelineItem
          dot-color="error"
          size="x-small"
        >
          <!-- 👉 Header -->
          <div class="d-flex justify-space-between">
            <h6 class="text-base font-weight-semibold me-3">
              Demande d'explications
            </h6>
            <span class="text-sm text-disabled">6 avril 2022</span>
          </div>

          <!-- 👉 Content -->
          <p class="mb-1">
            <span class="me-2">Envoie d'un courrier externe sans autorisation de la Direction</span>
          </p>
        </VTimelineItem>

        <VTimelineItem
          dot-color="primary"
          size="x-small"
        >
          <!-- 👉 Header -->
          <div class="d-flex justify-space-between">
            <h6 class="text-base font-weight-semibold me-3">
              Evaluation trimestrielle
            </h6>
            <span class="text-sm text-disabled">10 mars 2022</span>
          </div>

          <!-- 👉 Content -->
          <p class="mb-1">
            <VChip color="primary">
              PROACTIF
            </VChip>
          </p>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>
