<template>
  <NCard v-if="piece" :segmented="{ footer: 'soft' }">
    <div class="wrapper">
      <div class="info">
        <h1 style="margin-top: 0">{{ piece.name }}</h1>
        <div class="properties">
          <div class="property">
            <NIcon><Person /></NIcon>
            {{ piece.author }}
          </div>
        </div>
      </div>
      <div class="functions">
        <NSpace>
          <FileUpload v-model="upload" :pid="pid" />
          <PieceDetail v-model="details" :pid="pid" />
          <NButton circle size="large" @click="toggleFiles">
            <template #icon>
              <NIcon>
                <AngleDown v-if="filesOpen" />
                <AngleLeft v-else />
              </NIcon>
            </template>
          </NButton>
        </NSpace>
      </div>
    </div>
    <!-- FileTable -->
    <template v-if="filesOpen" #footer>
      <FileTable :pid="pid" />
    </template>
  </NCard>
</template>

<script setup lang="ts">
  import PieceDetail from '@/views/home/PieceDetail.vue'
  import FileUpload from '@/views/home/FileUpload.vue'
  import FileTable from '@/views/home/FileTable.vue'

  import { useToggle } from '@vueuse/core'
  import { Person } from '@vicons/ionicons5'
  import { AngleLeft, AngleDown } from '@vicons/fa'
  import { computed, ref } from 'vue'
  import { usePiecesStore } from '@/store'

  const props = defineProps<{ pid: number }>()
  const piecesStore = usePiecesStore()

  const piece = computed(() => piecesStore.getPiece(props.pid))

  // FileTable
  const [filesOpen, toggleFiles] = useToggle()
  // Upload
  const upload = ref(false)
  // Details
  const details = ref(false)
</script>

<style scoped>
  .wrapper {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-width: 100%;
  }
  .info {
    flex: 1 1 0%;
  }
  .properties {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .property {
    display: flex;
  }
  .functions {
    flex-wrap: wrap;
  }
</style>
