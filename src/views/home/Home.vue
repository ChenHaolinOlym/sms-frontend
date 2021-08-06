<template>
  <!-- Search Card -->
  <NCard>
    <NInput v-model:value="pieceSearchValue" type="input" :placeholder="searchPlaceholder">
      <template #prefix>
        <NIcon><IonSearchOutline /></NIcon>
      </template>
    </NInput>
  </NCard>
  <!-- PieceCards -->
  <template v-if="loading">
    <NSkeleton text :repeat="2" />
    <NSkeleton text style="width: 60%" />
  </template>
  <template v-if="error">
    <p>{{ error }}</p>
  </template>
  <template v-if="!loading">
    <PieceCard v-for="piece in pieces" :key="piece.id" :pid="piece.id" />
  </template>
</template>

<script setup lang="ts">
  import PieceCard from '@/views/home/PieceCard.vue'

  import { ref, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { SearchOutline as IonSearchOutline } from '@vicons/ionicons5'
  import { usePiecesStore, useLoadStore } from '@/store'

  // I18N init
  const { t } = useI18n()
  // I18N strings
  const searchPlaceholder = computed(() => t('home.pieces'))

  // Store init
  const loadStore = useLoadStore()
  const piecesStore = usePiecesStore()
  const pieces = computed(() => piecesStore.getFilteredPieces(pieceSearchValue.value))

  // Data fetching
  const loading = ref(true)
  const error = ref(null)

  loadStore
    .initAll()
    .then(res => {
      loading.value = false
    })
    .catch(err => {
      loading.value = false
      error.value = err.toString()
    })

  // Search values
  const pieceSearchValue = ref('')
</script>
