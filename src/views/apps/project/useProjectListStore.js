import axios from '@axios'
import { defineStore } from 'pinia'

export const useProjectListStore = defineStore('ProjectListStore', {
  actions: {
    // 👉 Fetch project data
    fetchProjects(params) { return axios.get('/apps/projects/list', { params }) },

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
