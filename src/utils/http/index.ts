import { AxiosRequestConfig, AxiosPromise } from 'axios'
import service from './service'

export function get(url: string, params?: Record<string, unknown>): AxiosPromise {
  const config: AxiosRequestConfig = {
    url: url,
    method: 'get',
  }
  if (params) {
    config.params = params
  }
  return service(config)
}

export function post(url: string, data?: Record<string, unknown> | FormData): AxiosPromise {
  const config: AxiosRequestConfig = {
    url: url,
    method: 'post',
  }
  if (data) {
    config.data = data
  }
  return service(config)
}

export function put(url: string, data?: Record<string, unknown>): AxiosPromise {
  const config: AxiosRequestConfig = {
    url: url,
    method: 'put',
  }
  if (data) {
    config.data = data
  }
  return service(config)
}

export function _delete(url: string, data?: Record<string, unknown>): AxiosPromise {
  const config: AxiosRequestConfig = {
    url: url,
    method: 'delete',
  }
  if (data) {
    config.data = data
  }
  return service(config)
}
