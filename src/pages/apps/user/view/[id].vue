<script setup>
import { useEmployeeListStore } from '@/views/apps/user/employeeListStore'
import { useEmployeeTaskListStore } from '@/views/apps/user/employeeTaskListStore'
import { useEmployeeEvaluationStore } from '@/views/apps/user/employeeEvaluationStore'
import UserBioPanel from '@/views/apps/user/view/UserBioPanel.vue'
import UserStatisticsTransactions from '@/views/apps/user/view/UserStatisticsTransactions.vue'
import UserTabAbsence from '@/views/apps/user/view/UserTabAbsence.vue'
import UserTabCourse from '@/views/apps/user/view/UserTabCourse.vue'
import UserTabEvaluation from '@/views/apps/user/view/UserTabEvaluation.vue'
import UserTabProject from '@/views/apps/user/view/UserTabProject.vue'


const employeeListStore = useEmployeeListStore()
const employeeTaskListStore = useEmployeeTaskListStore()
const employeeEvaluationStore = useEmployeeEvaluationStore()
const userEval = ref()
const userTask = ref()
const route = useRoute()
const userData = ref()
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
    icon: 'tabler-book-2',
    title: 'Formations',
  },
  {
    icon: 'tabler-ad-2',
    title: 'Evaluations',
  },
]

employeeListStore.fetchUser(Number(route.params.id)).then(response => {
  userData.value = response.data
})
console.log("DEBUG")
console.log(userData)

employeeTaskListStore.fetchTaskList(Number(route.params.id)).then(response => {
  userTask.value = response.data
})
console.log("DEBUG TASK LIST")
console.log(userTask)

employeeEvaluationStore.fetchUserEvaluation(Number(route.params.id)).then(response => {
  userEval.value = response.data.evaluations
})
console.log("DEBUG EVAL LIST")
console.log(userEval)
</script>

<template>
  <VRow v-if="userData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <UserBioPanel :user-data="userData.bio" />  <!-- passage de données à UserBioPanel -->
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <UserStatisticsTransactions :user-data="userData.metadata" />
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
          <UserTabProject :user-task="userTask.tasks" />
        </VWindowItem>

        <VWindowItem>
          <UserTabCourse />
        </VWindowItem>

        <VWindowItem>
          <UserTabEvaluation :user-eval="userEval" />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
