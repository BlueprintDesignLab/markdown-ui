<script lang="ts">
  interface Props {
    question: string;
    placeholder?: string;
    correctAnswer?: string;
    showFeedback?: boolean;
    onchange: (value: { answer: string; isCorrect?: boolean }) => void;
  }
  let { question, placeholder = 'Type your answer here...', correctAnswer = undefined, showFeedback = false, onchange }: Props = $props();
  let answer = $state('');
  let hasAnswered = $state(false);
  let isCorrect: boolean | undefined = $state(undefined);

  function submit() {
    const val = answer.trim();
    if (!val) return;
    hasAnswered = true;
    const correct = correctAnswer ? val.toLowerCase() === correctAnswer.toLowerCase() : undefined;
    isCorrect = correct;
    onchange({ answer: val, isCorrect: correct });
  }

  function feedbackMessage() {
    if (!hasAnswered || !showFeedback) return '';
    if (correctAnswer === undefined) return `Your answer: ${answer.trim()}`;
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

