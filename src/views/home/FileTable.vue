<template>
  <NDataTable :columns="columns" :data="data" :paging="false" :row-key="rowKey" />
</template>

<script setup lang="ts">
  import { NButton, NSpace, NDataTable, useMessage } from 'naive-ui'
  import { useInfoStore, usePiecesStore } from '@/store'
  import { defineProps, computed, h } from 'vue'

  const props = defineProps<{
    pid: number
  }>()
  const infoStore = useInfoStore()
  const piecesStore = usePiecesStore()
  const message = useMessage()

  const piece = computed(() => piecesStore.getPiece(props.pid))
  const instrumentations = computed(() => piece.value?.instrumentations)

  // Interfaces
  interface RowData {
    instrument: string
    format: string
    type: number
    actions: string
  }

  const columns = [
    {
      title: 'Instrument',
      key: 'instrument',
    },
    {
      title: 'Format',
      key: 'format',
    },
    {
      title: 'Type',
      key: 'type',
    },
    {
      title: 'Actions',
      key: 'actions',
      // @ts-type-error
      render(row: RowData) {
        return h(
          NSpace,
          {},
          {
            default: () => [
              h(
                NButton,
                {
                  type: 'primary',
                  tag: 'a',
                  href: `http://localhost:5000/api/files/${row.actions}`,
                  target: '_blank',
                },
                {
                  default: () => 'Download',
                },
              ),
              h(
                NButton,
                {
                  type: 'error',
                  onClick: () => {
                    piecesStore
                      .deleteFile(row.actions)
                      .then(() => {
                        message.success('Delete Success')
                      })
                      .catch(() => {
                        message.error('Delete Failed')
                      })
                  },
                },
                {
                  default: () => 'Delete',
                },
              ),
            ],
          },
        )
      },
    },
  ]

  const rowKey = (row: Record<string, unknown>): number => row.index as number

  const data = computed(() => {
    return instrumentations.value?.map(item => {
      // TODO: Fix the problem: instrument id must exist in instrumentation
      const instrument_id = item.instrument as unknown as number
      const files = item.files
      if (files?.length === 0 || files === undefined || files === null) {
        return {
          instrument: infoStore.getInstrument(instrument_id)?.name,
        }
      } else {
        if (files?.length === 1) {
          const file = piecesStore.getFile(files[0].hash_id)
          if (file) {
            return {
              instrument: infoStore.getInstrument(instrument_id)?.name,
              format: file.format,
              type: file.type,
              actions: file.hash_id,
            }
          } else {
            return {}
          }
        } else {
          const file = piecesStore.getFile(files[0].hash_id)
          if (file) {
            const result = {
              instrument: infoStore.getInstrument(instrument_id)?.name,
              format: file.format,
              type: file.type,
              actions: file.hash_id,
              children: [],
            }
            for (let i = 1; i < files.length; i++) {
              const child = piecesStore.getFile(files[i].hash_id)
              if (child) {
                result.children.push({
                  // Fix the type error here
                  instrument: infoStore.getInstrument(instrument_id)?.name,
                  format: child.format,
                  type: child.type,
                  actions: child.hash_id,
                })
              }
            }
            return result
          }
        }
        return item
      }
    })
  })
</script>
