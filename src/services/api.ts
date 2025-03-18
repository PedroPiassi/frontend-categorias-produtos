import axios from 'axios'

export const useApi = () => {
  const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  return { api }
}
