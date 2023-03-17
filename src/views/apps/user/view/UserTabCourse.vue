<script setup>
// Images
import { resolveLocalDateVariant, resolveProjectStatusVariant } from '@/plugins/helpers';
import figma from '@images/icons/project-icons/figma.png';

const projects = [
  {
    id: 1,
    code: "76485-1048",
    school: "PMI",
    name: "PMP: Project management",
    start_date: "2023-05-13",
    end_date: "2023-10-11",
    status: "Schedulled",
    timing: 8,
    budget: 270000,
  },
  {
    id: 2,
    code: "10631-121",
    school: "Oo2 Formation",
    name: "Développement personnel",
    start_date: "2023-02-12",
    end_date: "2024-06-22",
    status: "In Progress",
    timing: 12,
    budget: 635000,
  },
  {
    id: 3,
    code: "0115-9911",
    school: "Stats4Decision",
    name: "Formation en Analyse de données et statistiques primaires",
    start_date: "2023-04-13",
    end_date: "2024-02-23",
    status: "Stopped",
    timing: 9,
    budget: 872000,
  },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Liste des Formations">
        <VDivider />
        <VTable>
          <thead>
            <tr>
              <th scope="col">
                FORMATION
              </th>
              <th scope="col">
                STRUCTURE
              </th>
              <th scope="col">
                DATE DE DEBUT
              </th>
              <th scope="col">
                PERIODE
              </th>
              <th scope="col">
                STATUT
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in projects"
              :key="project.name"
              style="height: 3.75rem;"
            >
              <!-- 👉 COURSE -->
              <td
                style="width: 300px;"
              >
                <div class="d-flex align-center mt-2 mb-2">
                  <VAvatar
                    :size="38"
                    class="me-3"
                    :image="figma"
                  />
                  <div>
                    <p class="text-base mb-0">
                      {{ project.name }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- 👉 SCHOOL -->
              <td>
                {{ project.school }}
              </td>
                
              <!-- 👉 START DATE -->
              <td class="text-medium-emphasis text-capitalize">
                {{ resolveLocalDateVariant(project.start_date) }}
              </td>

              <!-- 👉 TIMING -->
              <td class="text-capitalize">
                <VChip
                  label
                >
                  {{ project.timing }} jours
                </VChip>
              </td>

              <!-- 👉 STATUS -->
              <td>
                <VChip
                  label
                  :color="resolveProjectStatusVariant(project.status).color"
                >
                  {{ resolveProjectStatusVariant(project.status).status }}
                </VChip>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
