<script setup>

// Images
import { resolveLocalDateVariant, resolveProjectStatusVariant } from '@/plugins/helpers';
import { avatarText } from '@core/utils/formatters';

const projects = [
  {
    id: 1,
    code: "76485-1048",
    name: "Panthera tigris",
    start_date: "2023-05-13",
    end_date: "2023-10-11",
    status: "Schedulled",
    accountable: {
      id: 1,
      name: "Lamine Djiré",
    },
    budget: 270,
  },
  {
    id: 2,
    code: "10631-121",
    name: "Dicrostonyx groenlandicus",
    start_date: "2023-02-12",
    end_date: "2024-06-22",
    status: "In Progress",
    accountable: {
      id: 5,
      name: "Sébastien Bokoua",
    },
    budget: 635,
  },
  {
    id: 3,
    code: "0115-9911",
    name: "Bettongia penicillata",
    start_date: "2023-04-13",
    end_date: "2024-02-23",
    status: "Stopped",
    accountable: {
      id: 3,
      name: "Cissé Alassane",
    },
    budget: 872,
  },
  {
    id: 4,
    code: "21130-724",
    name: "Cynomys ludovicianus",
    start_date: "2023-05-27",
    end_date: "2024-08-13",
    status: "Failled",
    accountable: {
      id: 4,
      name: "Ben Mourad",
    },
    budget: 1072,
  },
  {
    id: 5,
    code: "0781-1223",
    name: "Macropus eugenii",
    start_date: "2023-03-12",
    end_date: "2023-07-04",
    status: "Stopped",
    accountable: {
      id: 5,
      name: "Sébastien Bokoua",
    },
    budget: 513,
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
      <VCard title="Liste des activités">
        <VDivider />
        <VTable>
          <thead>
            <tr>
              <th scope="col">
                ACTIVITE
              </th>
              <th scope="col">
                RESPONSABE
              </th>
              <th scope="col">
                DELAIS
              </th>
              <th scope="col">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in projects"
              :key="project.name"
              style="height: 3.75rem;"
            >
              <!-- 👉 Project name -->
              <td style="cursor: default;">
                <div class="d-flex align-center">
                  <VAvatar
                    :size="38"
                    class="me-3"
                    variant="tonal"
                    :color="resolveProjectStatusVariant(project.status).color"
                  >
                    <span>{{ avatarText(project.accountable.name) }}</span>
                  </VAvatar>
                  <div>
                    <p class="text-base mb-0">
                      {{ project.name }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- 👉 Accountable -->
              <td>
                <RouterLink
                  :to="{ name: 'apps-user-view-id', params: { id: project.accountable.id } }"
                  class="font-weight-medium user-list-name"
                >
                  {{ project.accountable.name }}
                </RouterLink>
              </td>

              <!-- 👉 End date -->
              <td>
                {{ resolveLocalDateVariant(project.end_date) }}
              </td>

              <!-- 👉 Start Date -->
              <td class="text-medium-emphasis">
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
