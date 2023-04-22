import axios from '@axios'
import { API_BASE_URL } from '@projectConfig'
import { defineStore } from 'pinia'

export const useEmployeeListStore = defineStore('EmployeeListStore', {
  
  // 👉 Store name
  id: 'employeeStore',

  // 👉 Save data to be displayed when needed
  state: () => ({
    employeeTaskList : null,
    employeeTrainingList: null,
    employeevaluationList: null,
  }),

  actions: {
    // 👉 Fetch users data
    fetchEmployees(params) { return axios.get(`${API_BASE_URL}/employee/list`, { params }) },
    
    // 👉 Fetch employee assigned tasks
    fetchEmployeeTasks(employeeId) { 
      const response = new Promise((resolve, reject) => {
        axios.get(`${API_BASE_URL}/task/list/employee/${employeeId}`).then(response => resolve(response)).catch(error => reject(error))
      })

      response.then(response => {this.employeeTaskList = response})
    },

    // 👉 Fetch employee assigned trainings
    fetchEmployeeTrainings(employeeId) { 
      const response = new Promise((resolve, reject) => {
        axios.get(`${API_BASE_URL}/training/list/employee/${employeeId}`).then(response => resolve(response)).catch(error => reject(error))
      })

      response.then(response => {this.employeeTrainingList = response})
    },

    // 👉 Fetch employee evaluation timeline
    fetchEmployeeEvaluations(employeeId) { 
      const response = new Promise((resolve, reject) => {
        axios.get(`${API_BASE_URL}/evaluation/list/employee/${employeeId}`).then(response => resolve(response)).catch(error => reject(error))
      })

      response.then(response => {this.employeeEvaluationList = response})
    },

    // 👉 Add User
    addUser(userData) {
      return new Promise((resolve, reject) => {
        axios.post('/apps/users/user', {
          user: userData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 fetch single user
    fetchUser(id) {
      return new Promise((resolve, reject) => {
        axios.get(`${API_BASE_URL}/employee/details/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
