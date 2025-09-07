<template>
  <div class="widget-mcq">
    <div class="mcq-question">{{ question }}</div>
    <div class="mcq-choices">
      <button
        v-for="(choice, idx) in choices"
        :key="idx"
        :class="choiceClass(choice)"
        :disabled="hasAnswered && showFeedback"
        @click="onSelect(choice)"
      >
        {{ choice }}
      </button>
    </div>
    <div
      v-if="hasAnswered && showFeedback && selectedAnswer"
      :class="['mcq-feedback', selectedAnswer === correctAnswer ? 'correct' : 'incorrect']"
    >
      <template v-if="correctAnswer">
        {{ selectedAnswer === correctAnswer ? '✓ Correct!' : `✗ Incorrect. The correct answer is: ${correctAnswer}` }}
      </template>
      <template v-else>
        You selected: {{ selectedAnswer }}
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, defineEmits } from 'vue'

interface Props {
  question: string
  choices: string[]
  correctAnswer?: string
  showFeedback?: boolean
}

interface Emits {
  change: [value: { answer: string; isCorrect?: boolean }]
}

const props = withDefaults(defineProps<Props>(), {
  showFeedback: false
})

const emit = defineEmits<Emits>()

const selectedAnswer = ref('')
const hasAnswered = ref(false)

function onSelect(answer: string) {
  selectedAnswer.value = answer
  hasAnswered.value = true
  const isCorrect = props.correctAnswer ? answer === props.correctAnswer : undefined
  emit('change', { answer, isCorrect })
}

function choiceClass(choice: string) {
  let className = 'mcq-choice'
  if (hasAnswered.value && props.showFeedback && props.correctAnswer) {
    if (choice === props.correctAnswer) {
      className += ' mcq-choice-correct'
    } else if (choice === selectedAnswer.value && choice !== props.correctAnswer) {
      className += ' mcq-choice-incorrect'
    }
  } else if (choice === selectedAnswer.value) {
    className += ' mcq-choice-selected'
  }
  return className
}
</script>

