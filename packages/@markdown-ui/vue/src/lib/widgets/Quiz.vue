<template>
  <div class="widget-quiz">
    <div class="quiz-header">
      <h2 class="quiz-title">{{ title }}</h2>
      <div class="quiz-stats">
        <div v-if="showProgress" class="quiz-progress">
          <span class="quiz-progress-text">
            Progress: {{ questionsAnswered }}/{{ questions.length }} questions
          </span>
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" :style="{ width: `${progressPercentage}%` }" />
          </div>
        </div>
        <div v-if="showScore" class="quiz-score">
          <span class="quiz-score-text">
            Score: {{ totalScore }}/{{ maxScore }} ({{ scorePercentage }}%)
          </span>
        </div>
      </div>
    </div>

    <div class="quiz-questions">
      <div v-for="q in questions" :key="q.id">
        <div v-if="q.type === 'mcq'" class="quiz-question">
          <div class="quiz-question-header">
            <h3 class="quiz-question-text">{{ q.question }}</h3>
            <span class="quiz-question-points">{{ q.points }} pts</span>
          </div>
          <div class="quiz-choices">
            <button
              v-for="(choice, idx) in q.choices || []"
              :key="idx"
              :class="mcqChoiceClass(q, choice)"
              :disabled="answers[q.id]?.submitted"
              @click="onAnswer(q.id, choice)"
            >
              {{ choice }}
            </button>
          </div>
          <div v-if="answers[q.id]?.submitted">
            <div v-if="typeof q.correctAnswer !== 'undefined'" :class="['quiz-feedback', answers[q.id].isCorrect ? 'correct' : 'incorrect']">
              {{ answers[q.id].isCorrect ? `✓ Correct! (+${answers[q.id].points} pts)` : `✗ Incorrect. The correct answer is: ${q.correctAnswer}` }}
            </div>
            <div v-else class="quiz-feedback">
              You selected: {{ answers[q.id].answer }}
            </div>
          </div>
        </div>

        <div v-else-if="q.type === 'short-answer'" class="quiz-question">
          <div class="quiz-question-header">
            <h3 class="quiz-question-text">{{ q.question }}</h3>
            <span class="quiz-question-points">{{ q.points }} pts</span>
          </div>
          <div class="quiz-input-container">
            <input
              type="text"
              :value="answers[q.id]?.submitted ? answers[q.id].answer : (draftInputs[q.id] || '')"
              :placeholder="q.placeholder || 'Type your answer here...'"
              :disabled="answers[q.id]?.submitted"
              :class="['quiz-input', answers[q.id]?.submitted ? ((q.correctAnswers && q.correctAnswers.length) ? (answers[q.id].isCorrect ? 'quiz-input-correct' : 'quiz-input-incorrect') : '') : '']"
              @input="(e: any) => !answers[q.id]?.submitted && (draftInputs[q.id] = e.target.value)"
              @keydown.enter.prevent="!answers[q.id]?.submitted && submitShort(q)"
            />
            <button
              v-if="!answers[q.id]?.submitted"
              class="quiz-submit"
              :disabled="!(draftInputs[q.id] || '').trim()"
              @click="submitShort(q)"
            >
              Submit
            </button>
          </div>
          <div v-if="answers[q.id]?.submitted">
            <div v-if="q.correctAnswers && q.correctAnswers.length" :class="['quiz-feedback', answers[q.id].isCorrect ? 'correct' : 'incorrect']">
              {{ answers[q.id].isCorrect ? `✓ Correct! (+${answers[q.id].points} pts)` : `✗ Incorrect. Accepted answers: ${(q.correctAnswers || []).join(', ') || 'N/A'}` }}
            </div>
            <div v-else class="quiz-feedback">
              Your answer: {{ answers[q.id].answer }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isCompleted" class="quiz-summary">
      <h3>Quiz Complete!</h3>
      <div class="quiz-final-score">
        Final Score: {{ totalScore }}/{{ maxScore }} points ({{ scorePercentage }}%)
      </div>
      <div v-if="passingScore !== undefined" :class="['quiz-result', isPassing ? 'passed' : 'failed']">
        {{ isPassing ? '🎉 Passed!' : '❌ Failed' }} (Passing: {{ passingScore }}%)
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, withDefaults, defineProps, defineEmits } from 'vue'

interface QuizQuestion {
  id: string
  type: 'mcq' | 'short-answer'
  question: string
  points: number
  choices?: string[]
  correctAnswer?: string
  placeholder?: string
  correctAnswers?: string[]
}

interface QuizAnswer {
  answer: string
  isCorrect: boolean
  points: number
  submitted: boolean
}

interface QuizState {
  answers: Record<string, QuizAnswer>
  totalScore: number
  maxScore: number
  questionsAnswered: number
  isCompleted: boolean
}

interface Props {
  title: string
  questions: QuizQuestion[]
  showScore?: boolean
  showProgress?: boolean
  passingScore?: number
}

interface Emits {
  change: [value: QuizState]
}

const props = withDefaults(defineProps<Props>(), {
  showScore: true,
  showProgress: true
})

const emit = defineEmits<Emits>()

const answers = reactive<Record<string, QuizAnswer>>({})
const draftInputs = reactive<Record<string, string>>({})

const maxScore = computed(() => props.questions.reduce((s, q) => s + q.points, 0))
const totalScore = computed(() => Object.values(answers).reduce((s, a) => s + a.points, 0))
const questionsAnswered = computed(() => Object.keys(answers).length)
const isCompleted = computed(() => questionsAnswered.value === props.questions.length)
const progressPercentage = computed(() => Math.round((questionsAnswered.value / props.questions.length) * 100))
const scorePercentage = computed(() => maxScore.value > 0 ? Math.round((totalScore.value / maxScore.value) * 100) : 0)
const isPassing = computed(() => props.passingScore !== undefined ? scorePercentage.value >= (props.passingScore as number) : false)

function emitChange() {
  emit('change', {
    answers: { ...answers },
    totalScore: totalScore.value,
    maxScore: maxScore.value,
    questionsAnswered: questionsAnswered.value,
    isCompleted: isCompleted.value
  })
}

function onAnswer(questionId: string, userAnswer: string) {
  const q = props.questions.find(q => q.id === questionId)
  if (!q || answers[questionId]?.submitted) return

  let correct = false
  if (q.type === 'mcq') {
    correct = q.correctAnswer === userAnswer
  } else if (q.type === 'short-answer') {
    if (q.correctAnswers) {
      correct = q.correctAnswers.some(a => a.toLowerCase() === userAnswer.toLowerCase())
    }
  }

  answers[questionId] = {
    answer: userAnswer,
    isCorrect: correct,
    points: correct ? q.points : 0,
    submitted: true
  }
  if (draftInputs[questionId]) delete draftInputs[questionId]
  emitChange()
}

function submitShort(q: QuizQuestion) {
  const val = (draftInputs[q.id] || '').trim()
  if (!val) return
  onAnswer(q.id, val)
}

function mcqChoiceClass(q: QuizQuestion, choice: string) {
  const ans = answers[q.id]
  let cls = 'quiz-choice'
  if (ans?.submitted && typeof q.correctAnswer !== 'undefined') {
    if (choice === q.correctAnswer) cls += ' quiz-choice-correct'
    else if (choice === ans.answer && choice !== q.correctAnswer) cls += ' quiz-choice-incorrect'
  }
  return cls
}
</script>
