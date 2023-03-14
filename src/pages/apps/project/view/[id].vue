<script setup>
import { useProjectListStore } from '@/views/apps/project/useProjectListStore'
import CardProjectProgressOverview from '@/views/apps/project/view/CardProjectProgressOverview.vue'
import ProjectBioPanel from '@/views/apps/project/view/ProjectBioPanel.vue'
import UserTabAbsence from '@/views/apps/user/view/UserTabAbsence.vue'
import UserTabBillingsPlans from '@/views/apps/user/view/UserTabBillingsPlans.vue'
import UserTabConnections from '@/views/apps/user/view/UserTabConnections.vue'
import UserTabEvaluation from '@/views/apps/user/view/UserTabEvaluation.vue'
import UserTabNotifications from '@/views/apps/user/view/UserTabNotifications.vue'
import UserTabOverview from '@/views/apps/user/view/UserTabOverview.vue'


const projectListStore = useProjectListStore()
const route = useRoute()
const projectData = ref()
const userTab = ref(null)

const tabs = [
  {
    icon: 'tabler-24-hours',
    title: "Check-in",
  },
  {
    icon: 'tabler-user-check',
    title: 'Projets',
  },
  {
    icon: 'tabler-ad-2',
    title: 'Evaluations',
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
          <UserTabAbsence />
        </VWindowItem>
        
        <VWindowItem>
          <UserTabOverview />
        </VWindowItem>

        <VWindowItem>
          <UserTabEvaluation />
        </VWindowItem>

        <VWindowItem>
          <UserTabBillingsPlans />
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
