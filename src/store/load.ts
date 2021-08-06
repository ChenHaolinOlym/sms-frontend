import { defineStore } from 'pinia'
import { useInfoStore } from './info'
import { useEventsStore } from './events'
import { usePiecesStore } from './pieces'

export const useLoadStore = defineStore({
  id: 'load',
  actions: {
    async initAll() {
      const infoStore = useInfoStore()
      const eventsStore = useEventsStore()
      const piecesStore = usePiecesStore()
      return Promise.all([infoStore.init(), eventsStore.init(), piecesStore.init_piece(), piecesStore.init_file()])
    },
  },
})
