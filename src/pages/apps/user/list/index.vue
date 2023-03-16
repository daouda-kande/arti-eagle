<script setup>
import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue';
import { useUserListStore } from '@/views/apps/user/useUserListStore';
import { avatarText } from '@core/utils/formatters';

const userListStore = useUserListStore()
const searchQuery = ref('')
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref([])

// 👉 Fetching users
const fetchUsers = () => {
  userListStore.fetchUsers({
    q: searchQuery.value,
    status: selectedStatus.value,
    plan: selectedPlan.value,
    role: selectedRole.value,
    perPage: rowPerPage.value,
    currentPage: currentPage.value,
  }).then(response => {
    users.value = response.data.users
    totalPage.value = response.data.totalPage
    totalUsers.value = response.data.totalUsers
  }).catch(error => {
    console.error(error)
  })
}

watchEffect(fetchUsers)

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 search filters
const roles = [
  {
    title: 'Admin',
    value: 'admin',
  },
  {
    title: 'Author',
    value: 'author',
  },
  {
    title: 'Editor',
    value: 'editor',
  },
  {
    title: 'Maintainer',
    value: 'maintainer',
  },
  {
    title: 'Subscriber',
    value: 'subscriber',
  },
]

const plans = [
  {
    title: 'Basic',
    value: 'basic',
  },
  {
    title: 'Company',
    value: 'company',
  },
  {
    title: 'Enterprise',
    value: 'enterprise',
  },
  {
    title: 'Team',
    value: 'team',
  },
]

const status = [
  {
    title: 'Pending',
    value: 'pending',
  },
  {
    title: 'Active',
    value: 'active',
  },
  {
    title: 'Inactive',
    value: 'inactive',
  },
]

const resolveUserRoleVariant = role => {
  if (role === 'subscriber')
    return {
      color: 'warning',
      icon: 'tabler-user',
    }
  if (role === 'author')
    return {
      color: 'success',
      icon: 'tabler-circle-check',
    }
  if (role === 'maintainer')
    return {
      color: 'primary',
      icon: 'tabler-chart-pie-2',
    }
  if (role === 'editor')
    return {
      color: 'info',
      icon: 'tabler-pencil',
    }
  if (role === 'admin')
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

const resolveAbsStatusVariant = stat => { return 'error'}

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

// 👉 List
const userListMeta = [
  {
    icon: 'tabler-user',
    color: 'primary',
    title: 'Session',
    stats: '21,459',
    percentage: +29,
    subtitle: 'Total Users',
  },
  {
    icon: 'tabler-user-plus',
    color: 'error',
    title: 'Paid Users',
    stats: '4,567',
    percentage: +18,
    subtitle: 'Last week analytics',
  },
  {
    icon: 'tabler-user-check',
    color: 'success',
    title: 'Active Users',
    stats: '19,860',
    percentage: -14,
    subtitle: 'Last week analytics',
  },
  {
    icon: 'tabler-user-exclamation',
    color: 'warning',
    title: 'Pending Users',
    stats: '237',
    percentage: +42,
    subtitle: 'Last week analytics',
  },
]
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

              <!-- 👉 Export button -->
              <VBtn
                variant="tonal"
                color="secondary"
                prepend-icon="tabler-screen-share"
              >
                Exporter
              </VBtn>
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
                v-for="user in users"
                :key="user.id"
                style="height: 3.75rem;"
              >
                <!-- 👉 NOM & PRENOM -->
                <td style="width: 250px;">
                  <div class="d-flex align-center">
                    <VAvatar
                      variant="tonal"
                      :color="resolveUserRoleVariant(user.role).color"
                      class="me-3"
                      size="38"
                    >
                      <span>{{ avatarText(user.fullName) }}</span>
                    </VAvatar>
                      
                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        <RouterLink
                          :to="{ name: 'apps-user-view-id', params: { id: user.id } }"
                          class="font-weight-medium user-list-name"
                        >
                          {{ user.fullName }}
                        </RouterLink>
                      </h6>
                      <span class="text-sm text-disabled">@mat: MT-001</span>
                    </div>
                  </div>
                </td>

                <!-- 👉 DIRECTION -->
                <td>
                  <div class="d-flex align-center text-capitalize">
                    <span>{{ user.currentPlan }}</span>
                  </div>
                </td>

                <!-- 👉 FONCTION -->
                <td>
                  <div class="d-flex align-center text-capitalize">
                    <span>{{ user.role }}</span>
                  </div>
                </td>

                <!-- 👉 RETARDS -->
                <td>
                  <span class="text-capitalize text-base">
                    <VChip
                      label
                      :color="resolveUserRoleVariant(user.role).color"
                      size="small"
                      class="text-capitalize"
                    >
                      12
                    </VChip>
                  </span>
                </td>

                <!-- 👉 ABS/JUSTIFIEES -->
                <td>
                  <span class="text-capitalize text-base font-weight-semibold">
                    <VChip
                      label
                      :color="resolveUserRoleVariant(user.role).color"
                      size="small"
                      class="text-capitalize"
                    >
                      9
                    </VChip>
                    <VDivider
                      vertical
                      class="mx-auto"
                    />
                    <VChip
                      label
                      :color="resolveUserRoleVariant(user.status).color"
                      size="small"
                      class="text-capitalize"
                    >
                      12
                    </VChip>
                  </span>
                </td>

                <!-- 👉 Projet -->
                <td>
                  <span class="text-base">
                    <VChip
                      label
                      :color="resolveUserRoleVariant(user.status).color"
                      size="small"
                      class="text-capitalize"
                    >
                      12
                    </VChip>
                  </span>
                </td>

                <!-- 👉 PROGRESS -->
                <td>
                  <VProgressLinear
                    model-value="15"
                    bg-color="primary"
                    :color="resolveUserStatusVariant(user.status)"
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
                    :to="{ name: 'apps-user-view-id', params: { id: user.id } }"
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
            <tfoot v-show="!users.length">
              <tr>
                <td
                  colspan="7"
                  class="text-center"
                >
                  No data available
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
