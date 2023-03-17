<script setup>
// Images
import figma from '@images/icons/project-icons/figma.png';

const projects = [
  {
    id: 1,
    code: "76485-1048",
    name: "Panthera tigris",
    start_date: "2023-05-13",
    end_date: "2023-10-11",
    status: "Schedulled",
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
    progress: 70,
    budget: 1072,
  },
  {
    id: 5,
    code: "0781-1223",
    name: "Macropus eugenii",
    start_date: "2023-03-12",
    end_date: "2023-07-04",
    status: "Stopped",
    progress: 65,
    budget: 513,
  },
  {
    id: 6,
    code: "68788-9111",
    name: "Sylvilagus floridanus",
    start_date: "2023-02-28",
    end_date: "2024-01-29",
    status: "Schedulled",
    progress: 10,
    budget: 571,
  },
  {
    id: 7,
    code: "54569-3912",
    name: "Taxidea taxus",
    start_date: "2023-04-27",
    end_date: "2023-11-19",
    status: "Schedulled",
    progress: 49,
    budget: 946,
  },
  {
    id: 8,
    code: "50532-112",
    name: "Theropithecus gelada",
    start_date: "2023-05-14",
    end_date: "2024-01-14",
    status: "In Progress",
    progress: 17,
    budget: 1103,
  },
  {
    id: 9,
    code: "57520-0053",
    name: "Acridotheres tristis",
    start_date: "2023-04-19",
    end_date: "2023-09-01",
    status: "Schedulled",
    progress: 20,
    budget: 260,
  },
  {
    id: 10,
    code: "63736-310",
    name: "Plegadis ridgwayi",
    start_date: "2023-03-31",
    end_date: "2023-10-05",
    status: "Stopped",
    progress: 37,
    budget: 738,
  },
  {
    id: 11,
    code: "0409-2540",
    name: "Phalacrocorax albiventer",
    start_date: "2023-05-26",
    end_date: "2024-05-20",
    status: "Failled",
    progress: 29,
    budget: 426,
  },
  {
    id: 12,
    code: "68084-459",
    name: "Butorides striatus",
    start_date: "2023-02-02",
    end_date: "2024-02-03",
    status: "Stopped",
    progress: 68,
    budget: 1134,
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
        <VTable class="text-no-wrap">
          <thead>
            <tr>
              <th scope="col">
                PROJET / ACTIVITE
              </th>
              <th scope="col">
                DELAIS
              </th>
              <th scope="col">
                STATUS
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
              <td style="width: 300px;">
                <div class="d-flex align-center">
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
                      {{ project.start_date }}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                {{ project.end_date }}
              </td>
              <td class="text-medium-emphasis">
                {{ project.status }}
              </td>
              <td style="width: 250px;">
                <VProgressLinear
                  :model-value="project.progress"
                  :color="resolveUserProgressVariant(project.progress)"
                />
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
