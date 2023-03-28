import axios from '@axios'
import { defineStore } from 'pinia'

export const useEmployeeListStore = defineStore('EmployeeListStore', {
  actions: {
    // 👉 Fetch users data
    fetchEmployees(params) { return axios.get('http://127.0.0.1:8000/api/v1/emp/list', { params }) },

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
        axios.get(`/apps/users/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})