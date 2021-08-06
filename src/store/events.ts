import { defineStore } from 'pinia'
import { components } from './schemas'
import { get, post, put, _delete } from '@/utils'
import { AxiosError, AxiosResponse } from 'axios'

export const useEventsStore = defineStore({
  id: 'events',
  state() {
    const events: components['schemas']['Event'][] = []
    return {
      events,
    }
  },
  actions: {
    // Api operations
    async init() {
      return get('events/').then((res: AxiosResponse) => {
        this.events = res.data
      })
    },
    async addEvent(payload: components['schemas']['EventCreate']) {
      return new Promise((resolve, reject) => {
        post('events/', payload)
          .then((res: AxiosResponse) => {
            if (res.status == 201) {
              this.events.splice(this.events.length, 0, res.data)
              resolve(res)
            }
          })
          .catch((err: AxiosError) => {
            reject(err)
          })
      })
    },
    async updateEvent(payload: components['schemas']['EventUpdate']) {
      return new Promise((resolve, reject) => {
        put('events/', payload)
          .then(async (res: AxiosResponse) => {
            if (res.status === 204) {
              await this.init()
              resolve(res)
            }
          })
          .catch((err: AxiosError) => {
            reject(err)
          })
      })
    },
    async deleteEvent(payload: number) {
      return new Promise((resolve, reject) => {
        _delete(`events/${payload}`)
          .then((res: AxiosResponse) => {
            if (res.status === 204) {
              for (let i = 0; i < this.events.length; i++) {
                if (this.events[i].id === payload) {
                  this.events.splice(i, 1)
                  return resolve(res)
                }
              }
            }
          })
          .catch((err: AxiosError) => {
            reject(err)
          })
      })
    },
    // Getters
    getEvent(param: number | string) {
      if (typeof param == 'number') {
        return this.events.find(event => event.id == param)
      } else if (typeof param == 'string') {
        return this.events.find(event => event.name == param)
      }
    },
    getFilteredEvents(filter: string) {
      if (filter === '') {
        return this.events
      } else {
        let result: components['schemas']['Event'][] = []
        for (let i = 0; i < this.events.length; i++) {
          if (this.events[i].name.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
            result = result.concat(this.events[i])
          }
        }
        return result
      }
    },
  },
})
