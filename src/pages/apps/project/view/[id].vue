<script setup>
import { useProjectListStore } from '@/views/apps/project/useProjectListStore'
import CardProjectProgressOverview from '@/views/apps/project/view/CardProjectProgressOverview.vue'
import ProjectBioPanel from '@/views/apps/project/view/ProjectBioPanel.vue'
import ProjectTabActivity from '@/views/apps/project/view/ProjectTabActivity.vue'
import ProjectTabBudget from '@/views/apps/project/view/ProjectTabBudget.vue'
import ProjectTabDeliverable from '@/views/apps/project/view/ProjectTabDeliverable.vue'
import ProjectTabResource from '@/views/apps/project/view/ProjectTabResource.vue'
import UserTabConnections from '@/views/apps/user/view/UserTabConnections.vue'
import UserTabNotifications from '@/views/apps/user/view/UserTabNotifications.vue'


const projectListStore = useProjectListStore()
const route = useRoute()
const projectData = ref()
const userTab = ref(null)

const statisticsHorizontal = [
  {
    title: 'Activités',
    color: 'error',
    icon: 'tabler-cpu',
    stats: '08',
  },
  {
    title: 'Réalisé',
    color: 'error',
    icon: 'tabler-chart-pie-2',
    stats: '37%',
  },
  {
    title: 'Personnes',
    color: 'success',
    icon: ' tabler-users',
    stats: '03',
  },
  {
    title: 'FCFA',
    color: 'warning',
    icon: 'tabler-wallet',
    stats: '128M',
  },
]

const tabs = [
  {
    icon: 'tabler-3d-cube-sphere',
    title: "Activités",
  },
  {
    icon: 'tabler-users',
    title: 'Ressources',
  },
  {
    icon: 'tabler-ad-2',
    title: 'Livrables',
  },
  {
    icon: 'tabler-wallet',
    title: 'Budget',
  },
]

projectListStore.fetchProject(Number(route.params.id)).then(response => {
  projectData.value = response.data
})
console.log("DEBUG")
console.log(projectData)
</script>

<template>
  <VRow v-if="projectData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <ProjectBioPanel :project-data="projectData" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VRow>
        <!-- 👉 Horizontal Cards -->
        <VCol
          v-for="statistics in statisticsHorizontal"
          :key="statistics.title"
          cols="12"
          lg="3"
          sm="6"
          md="6"
        >
          <CardStatisticsHorizontal v-bind="statistics" />
        </VCol>
      </VRow>
      <VDivider vertical="10" />
      <CardProjectProgressOverview />
      <br>
      <VTabs
        v-model="userTab"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.icon"
        >
          <VIcon
            :size="18"
            :icon="tab.icon"
            class="me-1"
          />
          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>

      <VWindow
        v-model="userTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <ProjectTabActivity />
        </VWindowItem>
        
        <VWindowItem>
          <ProjectTabResource />
        </VWindowItem>

        <VWindowItem>
          <ProjectTabDeliverable />
        </VWindowItem>

        <VWindowItem>
          <ProjectTabBudget />
        </VWindowItem>

        <VWindowItem>
          <UserTabNotifications />
        </VWindowItem>

        <VWindowItem>
          <UserTabConnections />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
