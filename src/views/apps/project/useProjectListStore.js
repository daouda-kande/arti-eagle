import axios from '@axios'
import { API_BASE_URL } from '@projectConfig'
import { defineStore } from 'pinia'

export const useProjectListStore = defineStore('ProjectListStore', {
  actions: {
    // 👉 Fetch project data
    fetchProjects(params) { return axios.get(`${API_BASE_URL}/task/list/filter`, { params }) },

    // Fetch project stats
    fetchProjectStats() { return  axios.get(`${API_BASE_URL}/task/stats/`) },
    
    // 👉 Add Project
    addProject(projectData) {
      return new Promise((resolve, reject) => {
        axios.post('/apps/projects/project', {
          project: projectData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 fetch single project
    fetchProject(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/apps/projects/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
