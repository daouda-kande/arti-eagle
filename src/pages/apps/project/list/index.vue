<script setup>
import { resolveLocalDateVariant, zerofill, subStringNameForAvatar, resolveProjectStatusVariantWithoutColor } from '@/plugins/helpers'
import { useProjectListStore } from '@/views/apps/project/useProjectListStore'
import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
import { avatarText } from '@core/utils/formatters'

const projectListStore = useProjectListStore()
const searchQuery = ref('')
const selectedDirection = ref()
const selectedPlan = ref()
const selectedStatus = ref()
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalProjects = ref(0)
const projects = ref([])
const projectStats = ref([]) 



// 👉 Fetching projects
const fetchProjects = () => {
  projectListStore.fetchProjects({
    q: searchQuery.value,
    status: selectedStatus.value,
    plan: selectedPlan.value,
    direction: selectedDirection.value,
    perPage: rowPerPage.value,
    currentPage: currentPage.value,
  }).then(response => {
    projects.value = response.data.tasks
    totalPage.value = response.data.totalPage
    totalProjects.value = response.data.totalTasks
  }).catch(error => {
    console.error(error)
  })
}

watchEffect(fetchProjects)

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

projectListStore.fetchProjectStats().then(response => {
  projectStats.value = response.data.stats
})



// 👉 search filters
const directions = [
  {
    title: 'DAAF',
    value: 'DAAF',
  },
  {
    title: 'DCP',
    value: 'DCP',
  },
  {
    title: 'DCSTI',
    value: 'DCSTI',
  },
  {
    title: 'DGPECRP',
    value: 'DGPECRP',
  },
  {
    title: 'DMGP',
    value: 'GMGP',
  },
  {
    title: 'DSESP',
    value: 'DSESP',
  },
  {
    title: 'DSI',
    value: 'DSI',
  },
  {
    title: 'DRRN',
    value: 'DRRN',
  },
]

const status = [
  {
    title: 'Non demarré',
    value: 'Schedulled',
  },
  {
    title: 'Terminé',
    value: 'Finished',
  },
  {
    title: 'En cours',
    value: 'In Progress',
  },
  {
    title: 'Suspendu',
    value: 'Stopped',
  },
  {
    title: 'Echec',
    value: 'Failled',
  },
]

const resolveActivityTypeColor = type => {
  if (type === 'ACTIVITY' || type === 'activity') {
    return 'primary'
  }

  return 'error'
}

const resolveProjectStatusVariant = stat => {
  if (stat === 'SCHEDULED')
    return { status:'Non Demarré', color:'secondary' }
  if (stat === 'IN_PROGRESS')
    return { status:'En Cours', color:'info' }
  if (stat === 'STOPPED')
    return { status:'Suspendu', color:'warning' }
  if (stat === 'Failled')
    return { status:'Echec', color:'error' }
  if (stat === 'FINISHED')
    return { status:'Terminé', color:'success' }
}

const isAddNewUserDrawerVisible = ref(false)

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = projects.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = projects.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `Showing ${ firstIndex } to ${ lastIndex } of ${ totalProjects.value } entries`
})

const addNewUser = userData => {
  userListStore.addUser(userData)

  // refetch User
  fetchProjects()
}

// 👉 List
const userListMeta = [
  {
    icon: 'tabler-3d-cube-sphere',
    color: 'primary',
    title: 'Projets',
    stats: '',
    percentage: +100,
    subtitle: 'Projets initiés',
  },
  {
    icon: 'tabler-3d-cube-sphere',
    color: 'info',
    title: 'En cours',
    stats: '02',
    percentage: +16.66,
    subtitle: 'Projets en cours',
  },
  {
    icon: 'tabler-3d-cube-sphere',
    color: 'success',
    title: 'Terminés',
    stats: '02',
    percentage: +16.66,
    subtitle: 'Projets terminés',
  },
  {
    icon: 'tabler-3d-cube-sphere',
    color: 'secondary',
    title: 'Suspendu',
    stats: '04',
    percentage: -33,
    subtitle: 'Projets non démarrés',
  },
]
</script>

<template>
  <section>
    <VRow>
      <VCol
        v-for=" (meta, index ) in projectStats"
        :key="index"
        cols="12"
        sm="6"
        lg="3"
      >
        <VCard>
          <VCardText class="d-flex justify-space-between">
            <div>
              <span>{{ resolveProjectStatusVariantWithoutColor(meta.status) }}</span>
              <div class="d-flex align-center gap-2 my-1">
                <h6 class="text-h6">
                  {{ meta.count }}
                </h6>
                <span :class="meta.percent > 0 ? 'text-success' : 'text-error'">({{ meta.percent }}%)</span>
              </div>
              <span>{{ userListMeta[index].subtitle }}</span>
            </div>

            <VAvatar
              rounded
              variant="tonal"
              :color="userListMeta[index].color"
              :icon="userListMeta[index].icon"
            />
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard title="Liste des Projets">
          <!-- 👉 Filters -->
          <VCardText>
            <VRow>
              <!-- 👉 Select Direction -->
              <VCol
                cols="12"
                sm="4"
              >
                <VSelect
                  v-model="selectedDirection"
                  label="Filtre par Direction"
                  :items="directions"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
              <!-- 👉 Select Status -->
              <VCol
                cols="12"
                sm="4"
              >
                <VSelect
                  v-model="selectedStatus"
                  label="Filtre par Status"
                  :items="status"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
            </VRow>
          </VCardText>

          <VDivider />

          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <div
              class="me-3"
              style="width: 80px;"
            >
              <VSelect
                v-model="rowPerPage"
                density="compact"
                variant="outlined"
                :items="[10, 20, 30, 50]"
              />
            </div>

            <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
              <!-- 👉 Search  -->
              <div style="width: 10rem;">
                <VTextField
                  v-model="searchQuery"
                  placeholder="Rechercher"
                  density="compact"
                />
              </div>
            </div>
          </VCardText>

          <VDivider />

          <VTable class="text-no-wrap">
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col">
                  PROJET
                </th>
                <th scope="col">
                  DIRECTION
                </th>
                <th scope="col">
                  DATE DE DEBUT
                </th>
                <th scope="col">
                  DATE DE FIN
                </th>
                <th scope="col">
                  RESSOURCES
                </th>
                <th scope="col">
                  STATUS
                </th>
                <th scope="col">
                  PROGRESSION
                </th>
                <th scope="col">
                  ACTION
                </th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              <tr
                v-for="project in projects"
                :key="project.taskId"
                style="height: 3.75rem;"
              >
                <!-- 👉 PROJECT -->
                <td>
                  <div class="d-flex align-center">
                    <VAvatar
                      variant="tonal"
                      :color="resolveActivityTypeColor(project.type)"
                      class="me-3"
                      size="38"
                    >
                      <VImg
                        v-if="project.avatar"
                        :src="project.avatar"
                      />
                      <span v-else>{{ avatarText(subStringNameForAvatar(project.name)) }}</span>
                    </VAvatar>

                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        <RouterLink
                          :to="{ name: 'apps-project-view-id', params: { id: project.taskId } }"
                          class="font-weight-medium user-list-name"
                        >
                          {{ project.name }}
                        </RouterLink>
                      </h6>
                      <span class="text-sm text-disabled">@code: {{ project.code }}</span>
                    </div>
                  </div>
                </td>

                <!-- 👉 DIRECTION -->
                <td>
                  <div class="d-flex align-center">
                    {{ project.comment }}
                  </div>
                </td>
                <!-- 👉 START DATE -->
                <td>
                  <div class="d-flex align-center text-capitalize">
                    {{ resolveLocalDateVariant(project.startDate) }}
                  </div>
                </td>

                <!-- 👉 END DATE -->
                <td>
                  <div class="d-flex align-center text-capitalize">
                    {{ resolveLocalDateVariant(project.endDate) }}
                  </div>
                </td>

                <!-- 👉 RESOURCES -->
                <td>
                  <VChip 
                    label
                    color="primary"
                  >
                    <span class="text-base">{{ zerofill(project.resources) }}</span>
                  </VChip>
                </td>

                <!-- 👉 STATUS -->
                <td>
                  <VChip
                    label
                    :color="resolveProjectStatusVariant(project.status).color"
                    size="small"
                    class="text-capitalize"
                  >
                    {{ resolveProjectStatusVariant(project.status).status }}
                  </VChip>
                </td>

                <!-- 👉 PROGRESSION -->
                <td>
                  <VProgressLinear
                    :model-value="project.progression"
                    bg-color="primary"
                    :color="resolveProjectStatusVariant(project.status).color"
                  />
                </td>

                <!-- 👉 Actions -->
                <td
                  class="text-center"
                  style="width: 5rem;"
                >
                  <VBtn
                    icon
                    size="x-small"
                    color="primary"
                    variant="text"
                    :to="{ name: 'apps-project-view-id', params: { id: project.taskId } }"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-eye"
                    />
                  </VBtn>
                </td>
              </tr>
            </tbody>

            <!-- 👉 table footer  -->
            <tfoot v-show="!projects.length">
              <tr>
                <td
                  colspan="7"
                  class="text-center"
                >
                  Rien a afficher
                </td>
              </tr>
            </tfoot>
          </VTable>

          <VDivider />

          <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
            <span class="text-sm text-disabled">
              {{ paginationData }}
            </span>

            <VPagination
              v-model="currentPage"
              size="small"
              :total-visible="5"
              :length="totalPage"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 👉 Add New User -->
    <AddNewUserDrawer
      v-model:isDrawerOpen="isAddNewUserDrawerVisible"
      @user-data="addNewUser"
    />
  </section>
</template>

<style lang="scss">
.app-user-search-filter {
  inline-size: 31.6rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>
