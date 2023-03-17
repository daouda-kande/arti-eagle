<script setup>
// Images
import { resolveLocalDateVariant, resolveProjectStatusVariant } from '@/plugins/helpers';
import figma from '@images/icons/project-icons/figma.png';

const projects = [
  {
    id: 1,
    code: "76485-1048",
    name: "Panthera tigris",
    start_date: "2023-05-13",
    end_date: "2023-10-11",
    status: "Schedulled",
    role: "Stackholder",
    progress: 87,
    budget: 270,
  },
  {
    id: 2,
    code: "10631-121",
    name: "Dicrostonyx groenlandicus",
    start_date: "2023-02-12",
    end_date: "2024-06-22",
    status: "In Progress",
    role: "Stackholder",
    progress: 12,
    budget: 635,
  },
  {
    id: 3,
    code: "0115-9911",
    name: "Bettongia penicillata",
    start_date: "2023-04-13",
    end_date: "2024-02-23",
    status: "Stopped",
    role: "Manager",
    progress: 49,
    budget: 872,
  },
  {
    id: 4,
    code: "21130-724",
    name: "Cynomys ludovicianus",
    start_date: "2023-05-27",
    end_date: "2024-08-13",
    status: "Failled",
    role: "Stackholder",
    progress: 70,
    budget: 1072,
  },
]

const resolveUserProgressVariant = progress => {
  if (progress <= 25)
    return 'error'
  if (progress > 25 && progress <= 50)
    return 'warning'
  if (progress > 50 && progress <= 75)
    return 'primary'
  if (progress > 75 && progress <= 100)
    return 'success'
  
  return 'secondary'
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Liste des Projets et Activités">
        <VDivider />
        <VTable>
          <thead>
            <tr>
              <th scope="col">
                PROJET / ACTIVITE
              </th>
              <th scope="col">
                RESPONSABILITE
              </th>
              <th scope="col">
                DATE DE DEBUT
              </th>
              <th scope="col">
                DATE DE FIN
              </th>
              <th scope="col">
                PROGRESSION
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in projects"
              :key="project.name"
              style="height: 3.75rem;"
            >
              <!-- 👉 PROJECT NAME -->
              <td>
                <div class="d-flex align-center mb-2 mt-2">
                  <VAvatar
                    :size="38"
                    class="me-3"
                    :image="figma"
                  />
                  <div>
                    <p class="text-base mb-0">
                      {{ project.name }}
                    </p>
                    <p class="text-sm text-disabled mb-0">
                      {{ resolveProjectStatusVariant(project.status).status }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- 👉 ROLE -->
              <td class="text-medium-emphasis text-capitalize">
                {{ project.role }} 
              </td>

              <!-- 👉 START DATE -->
              <td class="text-medium-emphasis text-capitalize">
                {{ resolveLocalDateVariant(project.start_date) }} 
              </td>

              <!-- 👉 END DATE -->
              <td class="text-medium-emphasis text-capitalize">
                {{ resolveLocalDateVariant(project.end_date) }}
              </td>

              <!-- 👉 PROGRESS -->
              <td style="width: 200px;">
                <VProgressLinear
                  :model-value="project.progress"
                  :color="resolveProjectStatusVariant(project.status).color"
                />
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
