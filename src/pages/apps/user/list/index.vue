<script setup>
import { zerofill } from '@/plugins/helpers'
import { useEmployeeListStore } from '@/views/apps/user/employeeListStore'
import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import { avatarText } from '@core/utils/formatters'

const userListStore = useUserListStore()
const employeeListStore = useEmployeeListStore()
const searchQuery = ref('')
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref([])
const employees = ref([])

// 👉 Fetching employees
const fetchEmployees = () => {
  employeeListStore.fetchEmployees({
    q: searchQuery.value,
    perPage: rowPerPage.value,
    currentPage: currentPage.value,
  }).then(response => {
    employees.value = response.data.users
    totalPage.value = response.data.totalPage
    totalUsers.value = response.data.totalUsers
  }).catch(error => {
    console.error(error)
  })
}

watchEffect(fetchEmployees)

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

const resolveEmployeeRoleVariant = role => {
  if (role === 'AGENT')
    return {
      color: 'warning',
      icon: 'A G',
    }
  if (role === 'DIRECTEUR')
    return {
      color: 'success',
      icon: 'DIR',
    }
  if (role === 'SOUS-DIRECTEUR')
    return {
      color: 'error',
      icon: 'S D',
    }
  if (role === 'CHEF DE SERVICE')
    return {
      color: 'info',
      icon: 'C S',
    }
  if (role === 'CHARGE D\'ETUDE')
    return {
      color: 'secondary',
      icon: 'tabler-device-laptop',
    }
  
  return {
    color: 'primary',
    icon: 'tabler-user',
  }
}

const resolveUserStatusVariant = stat => {
  if (stat === 'pending')
    return 'warning'
  if (stat === 'active')
    return 'success'
  if (stat === 'inactive')
    return 'secondary'
  
  return 'primary'
}

const isAddNewUserDrawerVisible = ref(false)

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = users.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = users.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `Showing ${ firstIndex } to ${ lastIndex } of ${ totalUsers.value } entries`
})

const addNewUser = userData => {
  userListStore.addUser(userData)

  // refetch User
  fetchUsers()
}
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard title="Liste du Personnel">
          <!-- 👉 Filters -->
        
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
                  NOM & PRENOM
                </th>
                <th scope="col">
                  DIRECTION
                </th>
                <th scope="col">
                  FONCTION
                </th>
                <th scope="col">
                  RETARD
                </th>
                <th scope="col">
                  ABS/JUSTIFIEE
                </th>
                <th scope="col">
                  ACTIVITE
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
                v-for="emp in employees"
                :key="emp.positionId"
                style="height: 3.75rem;"
              >
                <!-- 👉 NOM & PRENOM -->
                <td style="width: 250px;">
                  <div class="d-flex align-center">
                    <VAvatar
                      variant="tonal"
                      :color="resolveEmployeeRoleVariant(emp.rolename).color"
                      class="me-3"
                      size="38"
                    >
                      <span>{{ avatarText(resolveEmployeeRoleVariant(emp.rolename).icon) }}</span>
                    </VAvatar>
                      
                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        <RouterLink
                          :to="{ name: 'apps-user-view-id', params: { id: emp.positionId } }"
                          class="font-weight-medium user-list-name"
                        >
                          {{ emp.fullname }}
                        </RouterLink>
                      </h6>
                      <span class="text-sm text-disabled">@mat: {{ emp.matricula }}</span>
                    </div>
                  </div>
                </td>

                <!-- 👉 DIRECTION -->
                <td>
                  <div class="d-flex align-center text-capitalize">
                    <span>{{ emp.direction }}</span>
                  </div>
                </td>

                <!-- 👉 FONCTION -->
                <td>
                  <div class="d-flex align-center text-capitalize">
                    <span>{{ emp.rolename }}</span>
                  </div>
                </td>

                <!-- 👉 RETARDS -->
                <td>
                  <span class="text-capitalize text-base">
                    <VChip
                      label
                      color="primary"
                      size="small"
                      class="text-capitalize"
                    >
                      {{ zerofill(emp.logs.late_arrivals) }}
                    </VChip>
                  </span>
                </td>

                <!-- 👉 ABS/JUSTIFIEES -->
                <td>
                  <span class="text-capitalize text-base font-weight-semibold">
                    <VChip
                      label
                      color="success"
                      size="small"
                      class="text-capitalize"
                    >
                      {{ zerofill(emp.logs.abs_justified) }}
                    </VChip>
                    <VDivider
                      vertical
                      class="mx-auto"
                    />
                    <VChip
                      label
                      color="primary"
                      size="small"
                      class="text-capitalize"
                    >
                      {{ zerofill(emp.logs.absences) }}
                    </VChip>
                  </span>
                </td>

                <!-- 👉 Projet -->
                <td>
                  <span class="text-base">
                    <VChip
                      label
                      color="primary"
                      size="small"
                      class="text-capitalize"
                    >
                      {{ zerofill(emp.tasks.nb_task) }}
                    </VChip>
                  </span>
                </td>

                <!-- 👉 PROGRESS -->
                <td>
                  <VProgressLinear
                    :model-value="emp.tasks.progress"
                    bg-color="primary"
                    :color="resolveUserStatusVariant(emp.rolename)"
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
                    :to="{ name: 'apps-user-view-id', params: { id: emp.positionId } }"
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
            <tfoot v-show="!employees.length">
              <tr>
                <td
                  colspan="7"
                  class="text-center"
                >
                  Rien à afficher
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
