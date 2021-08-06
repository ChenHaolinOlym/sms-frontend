<template>
  <!-- Button -->
  <NButton round size="large" type="primary" @click="onButtonClick">
    <template #icon>
      <NIcon><TaUpload /></NIcon>
    </template>
    Upload
  </NButton>

  <!-- Modal -->
  <NModal :show="modelValue" @update:show="onShowUpdate">
    <NCard style="width: 600px" :bordered="false" size="huge">
      <NForm>
        <NFormItem label="name" :validation-status="nameStatus" :feedback="nameError">
          <NInput v-model:value="name" />
        </NFormItem>
        <NFormItem label="type" :validation-status="typeStatus" :feedback="typeError">
          <NInputNumber v-model:value="type" />
        </NFormItem>
        <NFormItem label="instruments" :validation-status="instrumentsStatus" :feedback="instrumentsError">
          <NSelect v-model:value="selectedInstruments" multiple filterable :options="instrumentations"></NSelect>
        </NFormItem>
        <NFormItem label="transpose" :validation-status="transposeStatus" :feedback="transposeError">
          <NSelect v-model:value="transpose" filterable :options="instruments" clearable></NSelect>
        </NFormItem>
        <NFormItem label="file" :validation-status="fileStatus" :feedback="fileError">
          <NUpload :file-list="file" style="width: 100%" @change="handleUploadChange">
            <NButton>Add File</NButton>
          </NUpload>
        </NFormItem>
      </NForm>
      <template #action>
        <NSpace justify="end">
          <NButton type="error" @click="Reset">Reset</NButton>
          <NButton type="primary" @click="Upload">Upload</NButton>
          <NButton @click="Cancel">Cancel</NButton>
        </NSpace>
      </template>
    </NCard>
  </NModal>
</template>

<script setup lang="ts">
  import { NButton, NIcon, NModal, NCard, NForm, NFormItem, NInput, NInputNumber, NSelect, NSpace, NUpload, useMessage } from 'naive-ui'
  import type { FileInfo } from 'naive-ui/lib/upload/src/interface'
  import { Upload as TaUpload } from '@vicons/tabler'
  import { useInfoStore, usePiecesStore } from '@/store'
  import { defineProps, defineEmit, computed } from 'vue'
  import { useForm, useField } from 'vee-validate'

  const props = defineProps<{ modelValue: boolean; pid: number }>()
  const emit = defineEmit(['update:modelValue'])
  const infoStore = useInfoStore()
  const piecesStore = usePiecesStore()
  const message = useMessage()

  const piece = computed(() => piecesStore.getPiece(props.pid))
  const instruments = computed(() => {
    return infoStore.instruments.map(item => {
      return {
        label: item.name,
        value: item.id,
      }
    })
  })

  const instrumentations = computed(() => {
    return piece.value?.instrumentations?.map(item => {
      const instrument_id = item?.instrument as unknown as number
      return {
        label: infoStore.getInstrument(instrument_id)?.name as string,
        value: instrument_id,
      }
    })
  })

  // Schemas
  const schema = {
    name(value: string) {
      if (value && value.trim()) {
        return true
      }
      return 'Name is required'
    },
    type(value: number) {
      if (typeof value !== 'number' && Number.isNaN(value) && 1 / value < 0 && value < 0) {
        return 'Must be positive integer numbers'
      }
      return true
    },
    instruments(value: number[]) {
      if (value && value.length !== 0) {
        return true
      }
      return 'At least one instrument should be selected'
    },
    transpose(value: number) {
      return true
    },
    file(value: FileInfo[]) {
      if (value && value.length === 1) {
        return true
      } else if (value && value.length > 1) {
        return 'At most one file can be selected'
      } else {
        return 'A file must be selected'
      }
    },
  }
  const { handleSubmit, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
      name: '',
      type: null,
      instruments: [],
      transpose: null,
      file: [],
    },
  })
  const { value: name, errorMessage: nameError } = useField<string>('name')
  const { value: type, errorMessage: typeError } = useField<number>('type')
  const { value: selectedInstruments, errorMessage: instrumentsError } = useField<number[]>('instruments')
  const { value: transpose, errorMessage: transposeError } = useField<number>('transpose')
  const { value: file, errorMessage: fileError } = useField<FileInfo[]>('file')

  // Computed Validation Status
  const nameStatus = computed(() => (nameError.value === undefined ? undefined : 'error'))
  const typeStatus = computed(() => (typeError.value === undefined ? undefined : 'error'))
  const instrumentsStatus = computed(() => (instrumentsError.value === undefined ? undefined : 'error'))
  const transposeStatus = computed(() => (transposeError.value === undefined ? undefined : 'error'))
  const fileStatus = computed(() => (fileError.value === undefined ? undefined : 'error'))

  // File related callbacks
  const handleUploadChange = () => {
    // if (!(file.value.length === 0 || file.value.length === 1)) {
    //   file.value = [file.value[1]]
    // }
  }

  // Events
  const onButtonClick = () => {
    emit('update:modelValue', true)
  }

  const onShowUpdate = () => {
    emit('update:modelValue', false)
  }

  // Control Buttons
  const Reset = () => {
    resetForm()
    // TODO: Sort the problem here
    // file.value = []
  }

  const Upload = handleSubmit(values => {
    let fd = new FormData()
    if (file.value[0].file) {
      fd.append('files[]', file.value[0].file)
    }
    const data = {
      name: name.value,
      type: type.value,
      transpose: transpose.value
        ? {
            instrument_id: transpose.value,
          }
        : undefined,
      instrumentation_ids: selectedInstruments.value,
    }
    fd.append('data', JSON.stringify([data]))
    piecesStore
      .uploadFile(fd)
      .then(() => {
        message.success('Upload Success')
      })
      .catch(() => {
        message.error('Upload Failed')
      })
    emit('update:modelValue', false)
  })

  const Cancel = () => {
    emit('update:modelValue', false)
  }
</script>
