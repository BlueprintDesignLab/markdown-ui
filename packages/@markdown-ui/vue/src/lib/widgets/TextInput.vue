<template>
  <div class="widget-button">
    <label v-if="label">{{ label }}</label>
    <input
      type="text"
      v-model="value"
      @blur="handleBlur"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

interface TextInputProps {
  placeholder?: string
  label?: string
  default?: string
}

interface TextInputEvents {
  change: [value: string]
}

const props = withDefaults(defineProps<TextInputProps>(), {
  placeholder: '',
  label: '',
  default: ''
})

const emit = defineEmits<TextInputEvents>()

const value = ref(props.default)

const handleBlur = () => {
  emit('change', value.value)
}
</script>
