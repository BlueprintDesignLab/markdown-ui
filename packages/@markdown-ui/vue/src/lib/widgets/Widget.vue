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
  'MultipleChoiceQuestion': MultipleChoiceQuestion,
  'Select': Select,
  'SelectMulti': SelectMulti,
  'ShortAnswerQuestion': ShortAnswerQuestion,
  'Slider': Slider,
  'TextInput': TextInput,
  'Quiz': Quiz
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
  parsed = JSON.parse(atob(props.content))
} catch (e) {
  // suppress intermediate states
}

const WidgetComponent = computed(() => {
  const componentType = typeMapping[parsed.type] || parsed.type
  return widgets[componentType as keyof typeof widgets]
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
