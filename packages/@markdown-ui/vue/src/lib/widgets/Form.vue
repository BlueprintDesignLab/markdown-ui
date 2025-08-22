<template>
  <div class="widget-form">
    <div v-for="field in fields" :key="field.id">
      <component
        :is="getComponent(field.type)"
        v-bind="field"
        @change="(value) => setValue(field.id, value)"
      />
    </div>
    <button type="button" @click="handleSubmit">
      {{ submitLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, defineProps, defineEmits } from 'vue'
import ButtonGroup from './ButtonGroup.vue'
import Select from './Select.vue'
import SelectMulti from './SelectMulti.vue'
import Slider from './Slider.vue'
import TextInput from './TextInput.vue'

interface Field {
  type: string
  id: string
  [key: string]: any
}

interface FormProps {
  fields: Field[]
  submitLabel?: string
}

interface FormEvents {
  change: [values: Record<string, unknown>]
}

const props = withDefaults(defineProps<FormProps>(), {
  submitLabel: 'Submit'
})

const emit = defineEmits<FormEvents>()

const buildDefaults = (fields: Field[]): Record<string, unknown> => {
  const acc: Record<string, unknown> = {}
  for (const f of fields) {
    if (f.type === 'button-group') {
      acc[f.id] = f.default ?? (Array.isArray(f.choices) && f.choices.length ? f.choices[0] : undefined)
    } else if (f.type === 'select') {
      acc[f.id] = f.default ?? (Array.isArray(f.choices) && f.choices.length ? f.choices[0] : undefined)
    } else if (f.type === 'select-multi') {
      const d = f.default
      acc[f.id] = Array.isArray(d) ? d : (d ? [d] : [])
    } else if (f.type === 'slider') {
      acc[f.id] = f.default ?? (typeof f.min === 'number' ? f.min : 0)
    } else if (f.type === 'text-input') {
      acc[f.id] = f.default ?? ''
    }
  }
  return acc
}

const data = reactive<Record<string, unknown>>(buildDefaults(props.fields))

const setValue = (id: string, value: unknown) => {
  data[id] = value
}

const handleSubmit = () => {
  emit('change', { ...data })
}

const getComponent = (type: string) => {
  const typeMapping: Record<string, any> = {
    'button-group': ButtonGroup,
    'select': Select,
    'select-multi': SelectMulti,
    'slider': Slider,
    'text-input': TextInput
  }
  return typeMapping[type] || 'div'
}
</script>
