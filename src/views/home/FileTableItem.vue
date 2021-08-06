<template>FileTableItem</template>

<script setup lang="ts">
  import type { components } from '@/store/schemas'
  import { useInfoStore } from '@/store'
  import { defineProps, computed } from 'vue'

  const props = defineProps<{
    instrumentation: components['schemas']['Instrumentation']
  }>()
  const infoStore = useInfoStore()

  const instrument = computed(() => infoStore.getInstrument(props.instrumentation.id)?.name)
  const Delete = () => {
    // store.dispatch(Action.DELETE_FILE, props.file.id)
  }
  const Update = () => {
    // Update
  }
</script>
