<script setup>
import { resolveLocalDateVariant } from '@/plugins/helpers';

</script>

<template>
  <VCard title="Livrables">
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
              Librable de la phase 1
            </h6>
            <span class="text-sm text-disabled">{{ resolveLocalDateVariant("2023-06-12") }}</span>
          </div>

          <!-- 👉 Content -->
          <p class="mb-1">
            <span class="me-2">Envoyé par <span class="text-sm text-primary">Lamine Djiré</span></span>
            <VAvatar
              :image="avatar2"
              size="20"
            />
          </p>
          <div class="d-flex align-center">
            <a
              href="#"
              class="d-flex align-center me-4"
            >
              <VIcon
                start
                size="18"
                color="warning"
                icon="tabler-file-description"
              />
              <h6 class="font-weight-semibold text-base">Présentation pptx du livrable</h6>
            </a>
            <a
              href="#"
              class="d-flex align-center"
            >
              <VIcon
                start
                size="18"
                color="success"
                icon="tabler-table"
              />
              <h6 class="font-weight-semibold text-base">Données collectées</h6>
            </a>
          </div>
        </VTimelineItem>

        <VTimelineItem
          dot-color="primary"
          size="x-small"
        >
          <!-- 👉 Header -->
          <div class="d-flex justify-space-between">
            <h6 class="text-base font-weight-semibold me-3">
              Démarrage du projet
            </h6>
            <span class="text-sm text-disabled">{{ resolveLocalDateVariant("2023-04-28") }}</span>
          </div>

          <!-- 👉 Content -->
          <p class="mb-1">
            <span class="me-2">Envoyé par <span class="text-sm text-primary">Alassane Cissé</span></span>
            <VAvatar
              :image="avatar2"
              size="20"
            />
          </p>
          <div class="d-flex align-center">
            <a
              href="#"
              class="d-flex align-center me-4"
            >
              <VIcon
                start
                size="18"
                color="primary"
                icon="tabler-file-description"
              />
              <h6 class="font-weight-semibold text-base">Rapport de démarrage</h6>
            </a>
          </div>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>
