import axios from '@axios'
import { defineStore } from 'pinia'

export const useCheckinStore = defineStore('CheckinStore', {
  actions: {
    // 👉 Fetch users data
    fetchCheckin() { return axios.get('http://172.28.22.131:8000/api/v1/dashboard/checkins/') },
  },
})
