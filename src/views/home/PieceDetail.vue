<template>
  <!-- Button -->
  <NButton circle size="large" @click="onButtonClick">
    <template #icon>
      <NIcon><DotsVertical /></NIcon>
    </template>
  </NButton>

  <!-- Modal -->
  <NModal :show="modelValue" @update:show="onShowUpdate">
    <NCard style="width: 600px" :bordered="false" size="huge">
      <NForm size="small">
        <NFormItem label="id">
          <NInputNumber :value="pid" disabled />
        </NFormItem>
        <!-- TODO: Complete Group IDs with change of backeng -->
        <!-- <NFormItem :span="12" label="groups" :validation-status="group_idsStatus" :feedback="group_idsError">
          <NCheckboxGroup v-model:value="group_ids">
            <NCheckbox v-for="group in groups" :key="group.id" :value="group.id" :label="group.name" />
          </NCheckboxGroup>
        </NFormItem> -->
        <NFormItem :label="t('home.name')" :validation-status="nameStatus" :feedback="nameError">
          <NInput v-model:value="name" />
        </NFormItem>
        <NFormItem :label="t('home.author')" :validation-status="authorStatus" :feedback="authorError">
          <NInput v-model:value="author" />
        </NFormItem>
        <NFormItem :label="t('home.lyricist')" :validation-status="lyricistStatus" :feedback="lyricistError">
          <NInput v-model:value="lyricist" />
        </NFormItem>
        <NFormItem :label="t('home.arranger')" :validation-status="arrangerStatus" :feedback="arrangerError">
          <NInput v-model:value="arranger" />
        </NFormItem>
        <NFormItem :label="t('home.opus')" :validation-status="opusStatus" :feedback="opusError">
          <NInputNumber v-model:value="opus" />
        </NFormItem>
        <NFormItem :label="t('home.type')" :validation-status="typeStatus" :feedback="typeError">
          <NInputNumber v-model:value="type" />
        </NFormItem>
        <NFormItem :label="t('home.copyright_expire_date')" :validation-status="copyright_expire_dateStatus" :feedback="copyright_expire_dateError">
          <NDatePicker v-model:value="copyright_expire_date" type="date" clearable />
        </NFormItem>
        <NFormItem :label="t('home.instrumentations')" :validation-status="instrumentationsStatus" :feedback="instrumentationsError">
          <NSelect v-model:value="instrumentations" :options="instruments" multiple filterable />
        </NFormItem>
      </NForm>
      <template #action>
        <NSpace justify="end">
          <NButton type="error" @click="Delete">{{ t('buttons.delete') }}</NButton>
          <NButton type="warning" @click="Reset">{{ t('buttons.reset') }}</NButton>
          <NButton type="primary" @click="Confirm">{{ t('buttons.confirm') }}</NButton>
          <NButton @click="Cancel">{{ t('buttons.cancel') }}</NButton>
        </NSpace>
      </template>
    </NCard>
  </NModal>
</template>

<script setup lang="ts">
  import { noValidation } from '@/validation'
  import { useVModel } from '@vueuse/core'
  import { DotsVertical } from '@vicons/tabler'
  import { useMessage } from 'naive-ui'
  import { usePiecesStore, useInfoStore } from '@/store'
  import { useI18n } from 'vue-i18n'
  import { computed } from 'vue'
  import { useField, useForm } from 'vee-validate'

  const props = defineProps<{
    modelValue: boolean
    pid: number
  }>()
  const emit = defineEmits(['update:modelValue'])
  // const emit = defineEmits<{
  //   (e: 'update', modelValue: boolean): void
  // }>()
  const modelValue = useVModel(props, 'modelValue', emit)

  // I18N init
  const { t } = useI18n()
  // I18N strings

  // Store init
  const piecesStore = usePiecesStore()
  const infoStore = useInfoStore()
  const message = useMessage()

  const groups = computed(() => infoStore.groups)
  const piece = computed(() => piecesStore.getPiece(props.pid))
  const instruments = computed(() => {
    return infoStore.instruments.map(item => {
      return {
        label: item.name,
        value: item.id,
      }
    })
  })

  // Schemas
  const schema = {
    group_ids(value: number[]) {
      if (value && value.length) {
        return true
      }
      return t('validation.select')
    },
    name(value: string) {
      if (value && value.trim()) {
        return true
      }
      return t('validation.required')
    },
    author: noValidation,
    lyricist: noValidation,
    arranger: noValidation,
    opus(value: number) {
      if (typeof value !== 'number' && Number.isNaN(value) && 1 / value < 0 && value < 0) {
        return t('validation.positive_integer')
      }
      return true
    },
    type(value: number) {
      if (typeof value !== 'number' && Number.isNaN(value) && 1 / value < 0 && value < 0) {
        return t('validation.positive_integer')
      }
      return true
    },
    copyright_expire_date: noValidation,
    instrumentations: noValidation,
  }
  const { handleSubmit, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
      // group_ids: piece.value?.group_ids,
      name: piece.value?.name,
      author: piece.value?.author,
      lyricist: piece.value?.lyricist,
      arranger: piece.value?.arranger,
      opus: piece.value?.opus,
      type: piece.value?.type,
      copyright_expire_date: piece.value?.copyright_expire_date,
      instrumentations: [],
    },
  })
  // const { value: group_ids, errorMessage: group_idsError } = useField<number[]>('group_ids')
  const { value: name, errorMessage: nameError } = useField<string>('name')
  const { value: author, errorMessage: authorError } = useField<string>('author')
  const { value: lyricist, errorMessage: lyricistError } = useField<string>('lyricist')
  const { value: arranger, errorMessage: arrangerError } = useField<string>('arranger')
  const { value: opus, errorMessage: opusError } = useField<number>('opus')
  const { value: type, errorMessage: typeError } = useField<number>('type')
  const { value: copyright_expire_date, errorMessage: copyright_expire_dateError } = useField<number>('copyright_expire_date')
  const { value: instrumentations, errorMessage: instrumentationsError } = useField<number[]>('instrumentations')

  // Computed Validation Status
  // const group_idsStatus = computed(() => (group_idsError.value === undefined ? undefined : 'error'))
  const nameStatus = computed(() => (nameError.value === undefined ? undefined : 'error'))
  const authorStatus = computed(() => (authorError.value === undefined ? undefined : 'error'))
  const lyricistStatus = computed(() => (lyricistError.value === undefined ? undefined : 'error'))
  const arrangerStatus = computed(() => (arrangerError.value === undefined ? undefined : 'error'))
  const opusStatus = computed(() => (opusError.value === undefined ? undefined : 'error'))
  const typeStatus = computed(() => (typeError.value === undefined ? undefined : 'error'))
  const copyright_expire_dateStatus = computed(() => (copyright_expire_dateError.value === undefined ? undefined : 'error'))
  const instrumentationsStatus = computed(() => (instrumentationsError.value === undefined ? undefined : 'error'))

  // Events
  const onButtonClick = () => {
    modelValue.value = true
  }

  const onShowUpdate = () => {
    modelValue.value = false
  }

  // Control Buttons
  const Delete = () => {
    piecesStore
      .deletePiece(props.pid)
      .then(() => {
        message.success(t('status.success'))
      })
      .catch(() => {
        message.error(t('status.fail'))
      })
    modelValue.value = false
  }

  const Reset = () => {
    resetForm()
    message.info(t('status.reset'))
  }

  const Confirm = handleSubmit(values => {
    const data = {
      id: props.pid,
      // group_ids: group_ids.value,
      name: name.value,
      author: author.value,
      lyricist: lyricist.value,
      arranger: arranger.value,
      opus: opus.value,
      type: type.value,
      copyright_expire_date: copyright_expire_date.value ? new Date(copyright_expire_date.value).toISOString() : undefined,
      instrumentations: instrumentations.value
        ? instrumentations.value.map(item => {
            return { instrument_id: item }
          })
        : undefined,
    }
    piecesStore
      .updatePiece(data)
      .then(() => {
        message.success(t('status.success'))
      })
      .catch(() => {
        message.error(t('status.fail'))
      })
    modelValue.value = false
  })

  const Cancel = () => {
    modelValue.value = false
  }
</script>
