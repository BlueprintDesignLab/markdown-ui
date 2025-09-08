<script lang="ts">
  interface QuizQuestion {
    id: string;
    type: 'mcq' | 'short-answer';
    question: string;
    points: number;
    choices?: string[];
    correctAnswer?: string;
    placeholder?: string;
    correctAnswers?: string[];
  }

  interface QuizAnswer {
    answer: string;
    isCorrect: boolean;
    points: number;
    submitted: boolean;
  }

  interface QuizState {
    answers: Record<string, QuizAnswer>;
    totalScore: number;
    maxScore: number;
    questionsAnswered: number;
    isCompleted: boolean;
  }

  interface Props {
    title: string;
    questions: QuizQuestion[];
    showScore?: boolean;
    showProgress?: boolean;
    passingScore?: number;
    onchange: (value: QuizState) => void;
  }

  let { title, questions, showScore = true, showProgress = true, passingScore = undefined, onchange }: Props = $props();

  let answers = $state<Record<string, QuizAnswer>>({});
  let draftInputs = $state<Record<string, string>>({});

  const maxScore = $derived(questions.reduce((s, q) => s + q.points, 0));
  const totalScore = $derived(Object.values(answers).reduce((s, a) => s + a.points, 0));
  const questionsAnswered = $derived(Object.keys(answers).length);
  const isCompleted = $derived(questionsAnswered === questions.length);
  const progressPercentage = $derived(Math.round((questionsAnswered / questions.length) * 100));
  const scorePercentage = $derived(maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0);
  const isPassing = $derived(passingScore !== undefined ? scorePercentage >= (passingScore as number) : false);

  function emitChange() {
    onchange({
      answers: { ...answers },
      totalScore,
      maxScore,
      questionsAnswered,
      isCompleted
    });
  }

  function onAnswer(questionId: string, userAnswer: string) {
    const q = questions.find(q => q.id === questionId);
    if (!q || answers[questionId]?.submitted) return;

    let correct = false;
    if (q.type === 'mcq') {
      correct = q.correctAnswer === userAnswer;
    } else if (q.type === 'short-answer') {
      if (q.correctAnswers) {
        correct = q.correctAnswers.some(a => a.toLowerCase() === userAnswer.toLowerCase());
      }
    }

    answers = { ...answers, [questionId]: { answer: userAnswer, isCorrect: correct, points: correct ? q.points : 0, submitted: true } };
    if (draftInputs[questionId]) {
      const { [questionId]: _, ...rest } = draftInputs; // remove draft
      draftInputs = rest;
    }
    emitChange();
  }

  function submitShort(q: QuizQuestion) {
    const val = (draftInputs[q.id] || '').trim();
    if (!val) return;
    onAnswer(q.id, val);
  }

  function mcqChoiceClass(q: QuizQuestion, choice: string) {
    const ans = answers[q.id];
    let cls = 'quiz-choice';
    if (ans?.submitted && typeof q.correctAnswer !== 'undefined') {
      if (choice === q.correctAnswer) cls += ' quiz-choice-correct';
      else if (choice === ans.answer && choice !== q.correctAnswer) cls += ' quiz-choice-incorrect';
    }
    return cls;
  }
</script>

<div class="widget-quiz">
  <div class="quiz-header">
    <h2 class="quiz-title">{title}</h2>
    <div class="quiz-stats">
      {#if showProgress}
        <div class="quiz-progress">
          <span class="quiz-progress-text">Progress: {questionsAnswered}/{questions.length} questions</span>
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style={`width: ${progressPercentage}%`}></div>
          </div>
        </div>
      {/if}
      {#if showScore}
        <div class="quiz-score">
          <span class="quiz-score-text">Score: {totalScore}/{maxScore} ({scorePercentage}%)</span>
        </div>
      {/if}
    </div>
  </div>

  <div class="quiz-questions">
    {#each questions as q}
      {#if q.type === 'mcq'}
        <div class="quiz-question">
          <div class="quiz-question-header">
            <h3 class="quiz-question-text">{q.question}</h3>
            <span class="quiz-question-points">{q.points} pts</span>
          </div>
          <div class="quiz-choices">
            {#each q.choices || [] as choice, idx}
              <button class={mcqChoiceClass(q, choice)} onclick={() => onAnswer(q.id, choice)} disabled={answers[q.id]?.submitted}>{choice}</button>
            {/each}
          </div>
          {#if answers[q.id]?.submitted}
            {#if typeof q.correctAnswer !== 'undefined'}
              <div class={`quiz-feedback ${answers[q.id].isCorrect ? 'correct' : 'incorrect'}`}>
                {answers[q.id].isCorrect ? `✓ Correct! (+${answers[q.id].points} pts)` : `✗ Incorrect. The correct answer is: ${q.correctAnswer}`}
              </div>
            {:else}
              <div class="quiz-feedback">You selected: {answers[q.id].answer}</div>
            {/if}
          {/if}
        </div>
      {:else}
        <div class="quiz-question">
          <div class="quiz-question-header">
            <h3 class="quiz-question-text">{q.question}</h3>
            <span class="quiz-question-points">{q.points} pts</span>
          </div>
          <div class="quiz-input-container">
            <input
              type="text"
              value={answers[q.id]?.submitted ? answers[q.id].answer : (draftInputs[q.id] || '')}
              oninput={(e) => { if (!answers[q.id]?.submitted) draftInputs[q.id] = (e.target as HTMLInputElement).value; }}
              onkeydown={(e) => { if (e.key === 'Enter' && !answers[q.id]?.submitted) submitShort(q); }}
              placeholder={q.placeholder || 'Type your answer here...'}
              disabled={answers[q.id]?.submitted}
              class={`quiz-input ${answers[q.id]?.submitted ? ((q.correctAnswers && q.correctAnswers.length > 0) ? (answers[q.id].isCorrect ? 'quiz-input-correct' : 'quiz-input-incorrect') : '') : ''}`}
            />
            {#if !answers[q.id]?.submitted}
              <button class="quiz-submit" onclick={() => submitShort(q)} disabled={!((draftInputs[q.id] || '').trim())}>Submit</button>
            {/if}
          </div>
          {#if answers[q.id]?.submitted}
            {#if (q.correctAnswers && q.correctAnswers.length > 0)}
              <div class={`quiz-feedback ${answers[q.id].isCorrect ? 'correct' : 'incorrect'}`}>
                {answers[q.id].isCorrect ? `✓ Correct! (+${answers[q.id].points} pts)` : `✗ Incorrect. Accepted answers: ${(q.correctAnswers || []).join(', ') || 'N/A'}`}
              </div>
            {:else}
              <div class="quiz-feedback">Your answer: {answers[q.id].answer}</div>
            {/if}
          {/if}
        </div>
      {/if}
    {/each}
  </div>

  {#if isCompleted}
    <div class="quiz-summary">
      <h3>Quiz Complete!</h3>
      <div class="quiz-final-score">Final Score: {totalScore}/{maxScore} points ({scorePercentage}%)</div>
      {#if passingScore !== undefined}
        <div class={`quiz-result ${isPassing ? 'passed' : 'failed'}`}>
          {isPassing ? '🎉 Passed!' : '❌ Failed'} (Passing: {passingScore}%)
        </div>
      {/if}
    </div>
  {/if}
</div>
