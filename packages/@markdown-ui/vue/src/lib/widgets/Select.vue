<template>
  <div class="selector">
    <label v-if="label">{{ label }}</label>
    <select v-model="value" @change="handleChange">
      <option v-for="choice in choices" :key="choice" :value="choice">
        {{ choice }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

interface SelectProps {
  choices: string[]
  label?: string
  default?: string
}

interface SelectEvents {
  change: [value: string | string[]]
}

const props = withDefaults(defineProps<SelectProps>(), {
  label: ''
})

const emit = defineEmits<SelectEvents>()

const value = ref(props.default ?? props.choices[0])

const handleChange = () => {
  emit('change', value.value)
}
</script>
