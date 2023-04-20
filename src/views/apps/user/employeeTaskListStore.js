import axios from '@axios'

import { API_BASE_URL } from '@projectConfig'
import { defineStore } from 'pinia'

export const useEmployeeTaskListStore = defineStore('employeeTaskListStore', {
  actions: {
    // Fecth Task List
    fetchTaskList(id) { return axios.get(`${API_BASE_URL}/task/list/employee/${id}`)}, 


  },
})
