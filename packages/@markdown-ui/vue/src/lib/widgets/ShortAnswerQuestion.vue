<template>
  <div class="widget-saq">
    <div class="saq-question">{{ question }}</div>
    <div class="saq-input-container">
      <input
        type="text"
        v-model="answer"
        :placeholder="placeholder || 'Type your answer here...'"
        :disabled="hasAnswered && showFeedback"
        :class="['saq-input', (hasAnswered && showFeedback) ? (isCorrect ? 'saq-input-correct' : 'saq-input-incorrect') : '']"
        @keydown.enter.prevent="!hasAnswered && submit()"
      />
      <button
        v-if="!hasAnswered"
        class="saq-submit"
        :disabled="!answer.trim()"
        @click="submit"
      >
        Submit
      </button>
    </div>
    <div
      v-if="hasAnswered && showFeedback && feedbackMessage"
      :class="['saq-feedback', isCorrect ? 'correct' : 'incorrect']"
    >
      {{ feedbackMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, withDefaults, defineProps, defineEmits } from 'vue'

interface Props {
  question: string
  placeholder?: string
  correctAnswer?: string
  correctAnswers?: string[]
  showFeedback?: boolean
}

interface Emits {
  change: [value: { answer: string; isCorrect?: boolean }]
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Type your answer here...',
  showFeedback: false
})

const emit = defineEmits<Emits>()

const answer = ref('')
const hasAnswered = ref(false)
const isCorrect = ref<boolean | undefined>(undefined)

function submit() {
  if (!answer.value.trim()) return
  hasAnswered.value = true
  const normalized = (props.correctAnswers && props.correctAnswers.length > 0)
    ? props.correctAnswers
    : (typeof props.correctAnswer === 'string' ? [props.correctAnswer] : undefined)
  const correct = normalized
    ? normalized.some(a => a.toLowerCase() === answer.value.trim().toLowerCase())
    : undefined
  isCorrect.value = correct
  emit('change', { answer: answer.value.trim(), isCorrect: correct })
}

const feedbackMessage = computed(() => {
  if (!hasAnswered.value || !props.showFeedback) return ''
  const hasAnswers = (props.correctAnswers && props.correctAnswers.length > 0) || typeof props.correctAnswer !== 'undefined'
  if (!hasAnswers) return `Your answer: ${answer.value.trim()}`
  if (props.correctAnswers && props.correctAnswers.length > 0) {
    return isCorrect.value ? '✓ Correct!' : `✗ Incorrect. Accepted answers: ${(props.correctAnswers || []).join(', ')}`
  }
  return isCorrect.value ? '✓ Correct!' : `✗ Incorrect. The correct answer is: ${props.correctAnswer}`
})
</script>
