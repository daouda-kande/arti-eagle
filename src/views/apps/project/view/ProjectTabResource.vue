<script setup>

// Images
import { resolveActivityProgression, resolveProjectStatusVariant, zerofill } from '@/plugins/helpers';
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

const resources = [
  {
    id: 1,
    accountable: {
      id: 1,
      name: "Lamine Djiré",
      role: "Manager",
    },
    activity: {
      nb: 1,
      finished: 1,
      status:"Finished",
    },
  },
  {
    id: 1,
    accountable: {
      id: 1,
      name: "Cissé Alassane",
      role: "Stackholder",
    },
    activity: {
      nb: 1,
      finished: 0,
      status:"Schedulled",
    },
  },
  {
    id: 1,
    accountable: {
      id: 1,
      name: "Bokoua Sébastien",
      role: "Stackholder",
    },
    activity: {
      nb: 2,
      finished: 1,
      status:"In Progress",
    },
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
      <VCard title="Liste des intervenants">
        <VDivider />
        <VTable>
          <thead>
            <tr>
              <th scope="col">
                PERSONNEL
              </th>
              <th scope="col">
                RESPONSABILITE
              </th>
              <th scope="col">
                NB ACTIVITES
              </th>
              <th scope="col">
                PRGRESSION
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="resource in resources"
              :key="resource.id"
              style="height: 3.75rem;"
            >
              <!-- 👉 Stackholder -->
              <td style="cursor: default;">
                <div class="d-flex align-center">
                  <VAvatar
                    :size="38"
                    class="me-3"
                    variant="tonal"
                  >
                    <span>{{ avatarText(resource.accountable.name) }}</span>
                  </VAvatar>
                  <div>
                    <p class="text-base mb-0">
                      <RouterLink
                        :to="{ name: 'apps-user-view-id', params: { id: resource.accountable.id } }"
                        class="font-weight-medium user-list-name"
                      >
                        {{ resource.accountable.name }}
                      </RouterLink>
                    </p>
                  </div>
                </div>
              </td>

              <!-- 👉 Accountable -->
              <td>
                {{ resource.accountable.role }}
              </td>

              <!-- 👉 NB Activity -->
              <td>
                <span class="text-capitalize text-base font-weight-semibold">
                  <VChip
                    label
                    :color="resolveProjectStatusVariant(resource.activity.status).color"
                  >
                    {{ zerofill(resource.activity.finished) }}
                  </VChip>
                  <VDivider
                    vertical
                    class="mx-auto"
                  />
                  <VChip label>
                    {{ zerofill(resource.activity.nb) }}
                  </VChip>
                </span>
              </td>

              <!-- 👉 Progression -->
              <td class="text-medium-emphasis">
                <VProgressLinear
                  :model-value="resolveActivityProgression(resource.activity)"
                  :color="resolveProjectStatusVariant(resource.activity.status).color"
                />
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
