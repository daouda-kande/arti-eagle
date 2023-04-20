import axios from '@axios'

import { API_BASE_URL } from '@projectConfig'
import { defineStore } from 'pinia'

export const useEmployeeCoursesStore = defineStore('employeeCoursesStore', {
  actions: {
    // Fecth Task List
    fetchCourseList(id) { return axios.get(`${API_BASE_URL}/course/list/employee/${id}`)}, 


  },
})
