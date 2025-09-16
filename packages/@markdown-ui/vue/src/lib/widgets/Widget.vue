<template>
  <div class="widget">
    <component
      v-if="WidgetComponent"
      :is="WidgetComponent"
      v-bind="parsed"
      @change="(value) => dispatch({ id: props.id, value })"
    />
    <span v-else style="color: red">
      Unknown widget "{{ parsed.type }}"
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import ButtonGroup from './ButtonGroup.vue'
import Chart from './Chart.vue'
import Form from './Form.vue'
import Incomplete from './Incomplete.vue'
import Select from './Select.vue'
import SelectMulti from './SelectMulti.vue'
import Slider from './Slider.vue'
import TextInput from './TextInput.vue'
import MultipleChoiceQuestion from './MultipleChoiceQuestion.vue'
import ShortAnswerQuestion from './ShortAnswerQuestion.vue'
import Quiz from './Quiz.vue'

interface WidgetProps {
  id: string
  content: string
}

const props = defineProps<WidgetProps>()

const widgets = {
  'ButtonGroup': ButtonGroup,
  'Chart': Chart,
  'Form': Form,
  'Incomplete': Incomplete,
  // Support both PascalCase and DSL type strings for robustness
  'MultipleChoiceQuestion': MultipleChoiceQuestion,
  'multiple-choice-question': MultipleChoiceQuestion,
  'Select': Select,
  'SelectMulti': SelectMulti,
  'ShortAnswerQuestion': ShortAnswerQuestion,
  'short-answer-question': ShortAnswerQuestion,
  'Slider': Slider,
  'TextInput': TextInput,
  'Quiz': Quiz,
  'quiz': Quiz
}

const typeMapping: Record<string, keyof typeof widgets> = {
  'button-group': 'ButtonGroup',
  'chart-line': 'Chart',
  'chart-bar': 'Chart',
  'chart-pie': 'Chart',
  'chart-scatter': 'Chart',
  'form': 'Form',
  'incomplete': 'Incomplete',
  'multiple-choice-question': 'MultipleChoiceQuestion',
  'quiz': 'Quiz',
  'select': 'Select',
  'select-multi': 'SelectMulti',
  'short-answer-question': 'ShortAnswerQuestion',
  'slider': 'Slider',
  'text-input': 'TextInput'
}

let parsed = { type: 'incomplete' }

try {
  parsed = JSON.parse(decodeURIComponent(props.content))
} catch (e) {
  // suppress intermediate states
}

const WidgetComponent = computed(() => {
  const rawType = parsed.type as string
  const mapped = typeMapping[rawType] || rawType
  let component = widgets[mapped as keyof typeof widgets]

  // Fallback: try PascalCase from hyphen/underscore types
  if (!component && typeof mapped === 'string') {
    const pascal = mapped
      .split(/[-_]/)
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join('')
    component = widgets[pascal as keyof typeof widgets]
  }

  return component
})

const dispatch = (detail: any) => {
  const event = new CustomEvent('widget-event', {
    detail: detail,
    bubbles: true,
    composed: true
  })
  
  // Find the custom element and bubble up to find the closest widget container
  const customElement = document.querySelector(`markdown-ui-widget[id="${props.id}"]`)
  if (customElement) {
    const container = customElement.closest('.widget-container')
    if (container) {
      container.dispatchEvent(event)
    }
  }
}
</script>
