<template>
  <div class="selector-multi">
    <div v-if="label" class="selector-multi-label">{{ label }}</div>
    <div class="checkbox-group">
      <label v-for="choice in choices" :key="choice" class="checkbox-item">
        <input
          type="checkbox"
          :value="choice"
          :checked="value.includes(choice)"
          @change="handleChange"
        />
        <span>{{ choice }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

interface SelectMultiProps {
  choices: string[]
  label?: string
  default?: string | string[]
}

interface SelectMultiEvents {
  change: [value: string | string[]]
}

const props = withDefaults(defineProps<SelectMultiProps>(), {
  label: ''
})

const emit = defineEmits<SelectMultiEvents>()

const value = ref<string[]>(
  Array.isArray(props.default) ? props.default : (props.default ? [props.default] : [])
)

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const choice = target.value
  
  if (target.checked) {
    value.value = [...value.value, choice]
  } else {
    value.value = value.value.filter(v => v !== choice)
  }
  
  emit('change', value.value)
}
</script>
