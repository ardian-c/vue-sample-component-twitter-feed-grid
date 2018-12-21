import axios from 'axios'

const baseURL = process.env.API_URL || 'http://localhost:7890/1.1/statuses'

const HTTP = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getFeedByUsername (username, count) {
    return HTTP.get(`/user_timeline.json?count=${count}&screen_name=${username}`)
  }
}
