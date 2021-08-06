import { defineStore } from 'pinia'
import { components } from './schemas'
import { get, post, put, _delete } from '@/utils'
import { AxiosResponse } from 'axios'

export const useInfoStore = defineStore({
  id: 'info',
  state() {
    const groups: components['schemas']['Group'][] = []
    const parts: components['schemas']['Part'][] = []
    const instruments: components['schemas']['Instrument'][] = []
    return {
      groups,
      parts,
      instruments,
    }
  },
  actions: {
    // Api operations
    async init() {
      return get('info/').then((res: AxiosResponse) => {
        this.groups = res.data.groups
        this.parts = res.data.parts
        this.instruments = res.data.instruments
      })
    },
    // Getters
    getGroup(param: number | string) {
      if (typeof param == 'number') {
        return this.groups.find(group => group.id === param)
      } else if (typeof param == 'string') {
        return this.groups.find(group => group.name === param)
      }
    },
    getPart(param: number | string) {
      if (typeof param == 'number') {
        return this.parts.find(part => part.id === param)
      } else if (typeof param == 'string') {
        return this.parts.find(part => part.name == param)
      }
    },
    getInstrument(param: number | string) {
      if (typeof param == 'number') {
        return this.instruments.find(instrument => instrument.id === param)
      } else if (typeof param == 'string') {
        return this.instruments.find(instrument => instrument.name === param)
      }
    },
  },
})
