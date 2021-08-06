import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

const service: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  // baseURL: '/api/',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

// Interceptors
service.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err: AxiosError) => {
    if (err.response) {
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)
    } else {
      console.log(err.message)
    }
  },
)

export default service
