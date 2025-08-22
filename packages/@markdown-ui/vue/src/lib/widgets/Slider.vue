<template>
  <div class="widget-slider">
    <label v-if="label">{{ label }}</label>
    <div class="slider-container">
      <div class="slider-values">
        <span class="min-value">{{ min }}</span>
        <span class="current-value">{{ value }}</span>
        <span class="max-value">{{ max }}</span>
      </div>
      <input
        type="range"
        v-model="value"
        :min="min"
        :max="max"
        :step="step"
        @mouseup="handleChange"
        @touchend="handleChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

interface SliderProps {
  min: number
  max: number
  step?: number
  label?: string
  default?: number
}

interface SliderEvents {
  change: [value: number]
}

const props = withDefaults(defineProps<SliderProps>(), {
  step: 1,
  label: ''
})

const emit = defineEmits<SliderEvents>()

const value = ref(props.default ?? props.min)

const handleChange = () => {
  emit('change', Number(value.value))
}
</script>
