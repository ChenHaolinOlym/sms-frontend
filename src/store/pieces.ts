import { defineStore } from 'pinia'
import { components } from './schemas'
import { get, post, put, _delete } from '@/utils'
import { AxiosError, AxiosResponse } from 'axios'

export const usePiecesStore = defineStore({
  id: 'pieces',
  state() {
    const pieces: components['schemas']['Piece'][] = []
    const files: components['schemas']['File'][] = []
    return {
      pieces,
      files,
    }
  },
  actions: {
    // Api operations
    async init_piece() {
      return get('pieces/').then((res: AxiosResponse) => {
        this.pieces = res.data
      })
    },
    async init_file() {
      return get('files/').then((res: AxiosResponse) => {
        this.files = res.data
      })
    },
    async addPiece(payload: components['schemas']['PieceCreate']) {
      return new Promise((resolve, reject) => {
        post('pieces/', payload)
          .then((res: AxiosResponse) => {
            if (res.status === 201) {
              this.pieces.splice(this.pieces.length, 0, res.data)
              resolve(res)
            }
          })
          .catch((err: AxiosError) => {
            reject(err)
          })
      })
    },
    async updatePiece(payload: components['schemas']['PieceUpdate']) {
      return new Promise((resolve, reject) => {
        put('pieces/', payload)
          .then((res: AxiosResponse) => {
            if (res.status === 204) {
              for (let i = 0; i < this.pieces.length; i++) {
                if (this.pieces[i].id === payload.id) {
                  this.pieces[i] = payload
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
    async deletePiece(payload: number) {
      return new Promise((resolve, reject) => {
        _delete('pieces/' + payload)
          .then((res: AxiosResponse) => {
            for (let i = 0; i < this.pieces.length; i++) {
              if (this.pieces[i].id === payload) {
                this.pieces.splice(i, 1)
                return resolve(res)
              }
            }
          })
          .catch((err: AxiosError) => {
            reject(err)
          })
      })
    },
    async uploadFile(payload: FormData) {
      return new Promise((resolve, reject) => {
        post('files/', payload)
          .then((res: AxiosResponse) => {
            if (res.status === 201) {
              this.files.splice(this.files.length, 0, res.data)
              resolve(res)
            }
          })
          .catch((err: AxiosError) => {
            reject(err)
          })
      })
    },
    async deleteFile(payload: string) {
      return new Promise((resolve, reject) => {
        _delete(`files/${payload}`)
          .then((res: AxiosResponse) => {
            if (res.status === 204) {
              for (let i = 0; i < this.files.length; i++) {
                if (this.files[i].hash_id === payload) {
                  this.files.splice(i, 1)
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
    getPiece(param: number | string) {
      if (typeof param == 'number') {
        return this.pieces.find(piece => piece.id === param)
      } else if (typeof param == 'string') {
        return this.pieces.find(piece => piece.name === param)
      }
    },
    getFilteredPieces(filter: string) {
      if (filter === '') {
        return this.pieces
      } else {
        let result: components['schemas']['Piece'][] = []
        for (let i = 0; i < this.pieces.length; i++) {
          if (this.pieces[i].name.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
            result = result.concat(this.pieces[i])
          }
        }
        return result
      }
    },
    getFile(hash_id: string) {
      return this.files.find(file => file.hash_id === hash_id)
    },
  },
})
