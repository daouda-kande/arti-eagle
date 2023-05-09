<script setup>
import { resolveLocalDateVariant, resolveProjectStatusVariant } from '@/plugins/helpers';
import { useEmployeeListStore } from '@/views/apps/user/employeeListStore';
import figma from '@images/icons/project-icons/figma.png';

const taskList = ref([])

const employeeListStore = useEmployeeListStore()

taskList.value = employeeListStore.employeeTaskList.data.tasks
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
                ROLE
              </th>
              <th scope="col">
                DEBUT
              </th>
              <th scope="col">
                STATUT
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in taskList"
              :key="project.id"
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
                      @code: {{ project.code }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- 👉 ROLE -->
              <td class="text-medium-emphasis text-capitalize">
                {{ project.role }} 
              </td>

              <!-- 👉 START DATE -->
              <td
                class="text-medium-emphasis text-capitalize"
                style="width: 130px;"
              >
                {{ resolveLocalDateVariant(project.startDate) }} 
              </td>

              <!-- 👉 PROGRESS -->
              <td>
                <VChip :color="resolveProjectStatusVariant(project.status).color">
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
