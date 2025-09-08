<script lang="ts">
  interface Props {
    question: string;
    placeholder?: string;
    correctAnswer?: string;
    correctAnswers?: string[];
    showFeedback?: boolean;
    onchange: (value: { answer: string; isCorrect?: boolean }) => void;
  }
  let { question, placeholder = 'Type your answer here...', correctAnswer = undefined, correctAnswers = undefined, showFeedback = false, onchange }: Props = $props();
  let answer = $state('');
  let hasAnswered = $state(false);
  let isCorrect: boolean | undefined = $state(undefined);

  function submit() {
    const val = answer.trim();
    if (!val) return;
    hasAnswered = true;
    const normalized = (correctAnswers && correctAnswers.length > 0) ? correctAnswers : (correctAnswer !== undefined ? [correctAnswer] : undefined);
    const correct = normalized ? normalized.some(a => a.toLowerCase() === val.toLowerCase()) : undefined;
    isCorrect = correct;
    onchange({ answer: val, isCorrect: correct });
  }

  function feedbackMessage() {
    if (!hasAnswered || !showFeedback) return '';
    const hasAnswers = (correctAnswers && correctAnswers.length > 0) || (correctAnswer !== undefined);
    if (!hasAnswers) return `Your answer: ${answer.trim()}`;
    if (correctAnswers && correctAnswers.length > 0) {
      return isCorrect ? '✓ Correct!' : `✗ Incorrect. Accepted answers: ${(correctAnswers || []).join(', ')}`;
    }
    return isCorrect ? '✓ Correct!' : `✗ Incorrect. The correct answer is: ${correctAnswer}`;
  }
</script>

<div class="widget-saq">
  <div class="saq-question">{question}</div>
  <div class="saq-input-container">
    <input
      type="text"
      bind:value={answer}
      {placeholder}
      onkeydown={(e) => { if (e.key === 'Enter' && !hasAnswered) submit(); }}
      disabled={hasAnswered && showFeedback}
      class={`saq-input ${hasAnswered && showFeedback ? (isCorrect ? 'saq-input-correct' : 'saq-input-incorrect') : ''}`}
    />
    {#if !hasAnswered}
      <button class="saq-submit" onclick={submit} disabled={!answer.trim()}>Submit</button>
    {/if}
  </div>
  {#if hasAnswered && showFeedback && feedbackMessage()}
    <div class={`saq-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>{feedbackMessage()}</div>
  {/if}
</div>
