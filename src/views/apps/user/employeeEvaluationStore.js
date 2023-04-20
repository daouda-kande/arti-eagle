import axios from '@axios'

import { API_BASE_URL } from '@projectConfig'
import { defineStore } from 'pinia'

export const useEmployeeEvaluationStore = defineStore('employeeEvaluationStore', {
  actions: {
    // Fecth Task List
    fetchUserEvaluation(id) { return axios.get(`${API_BASE_URL}/evaluation/list/employee/${id}`)}, 


  },
})
