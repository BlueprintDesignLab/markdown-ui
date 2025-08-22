<template>
  <div class="widget-button-group">
    <label v-if="label">{{ label }}</label>
    <div role="group" :aria-label="label">
      <button
        v-for="choice in choices"
        :key="choice"
        type="button"
        :aria-pressed="selected === choice"
        @click="handleClick(choice)"
      >
        {{ choice }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

interface ButtonGroupProps {
  choices: string[]
  label?: string
  default?: string
}

interface ButtonGroupEvents {
  change: [value: string]
}

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  label: ''
})

const emit = defineEmits<ButtonGroupEvents>()

const selected = ref(props.default ?? props.choices[0])

const handleClick = (choice: string) => {
  selected.value = choice
  emit('change', choice)
}
</script>
