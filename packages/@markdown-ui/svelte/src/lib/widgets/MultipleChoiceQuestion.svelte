<script lang="ts">
  interface Props {
    question: string;
    choices: string[];
    correctAnswer?: string;
    showFeedback?: boolean;
    onchange: (value: { answer: string; isCorrect?: boolean }) => void;
  }
  let { question, choices, correctAnswer = undefined, showFeedback = false, onchange }: Props = $props();
  let selectedAnswer = $state('');
  let hasAnswered = $state(false);

  function onSelect(answer: string) {
    selectedAnswer = answer;
    hasAnswered = true;
    const isCorrect = correctAnswer ? answer === correctAnswer : undefined;
    onchange({ answer, isCorrect });
  }

  function choiceClass(choice: string) {
    let cls = 'mcq-choice';
    if (hasAnswered && showFeedback && correctAnswer) {
      if (choice === correctAnswer) cls += ' mcq-choice-correct';
      else if (choice === selectedAnswer && choice !== correctAnswer) cls += ' mcq-choice-incorrect';
    } else if (choice === selectedAnswer) {
      cls += ' mcq-choice-selected';
    }
    return cls;
  }
</script>

<div class="widget-mcq">
  <div class="mcq-question">{question}</div>
  <div class="mcq-choices">
    {#each choices as choice, idx}
      <button
        class={choiceClass(choice)}
        onclick={() => onSelect(choice)}
        disabled={hasAnswered && showFeedback}
      >{choice}</button>
    {/each}
  </div>
  {#if hasAnswered && showFeedback && selectedAnswer}
    <div class={`mcq-feedback ${selectedAnswer === correctAnswer ? 'correct' : 'incorrect'}`}>
      {#if correctAnswer}
        {selectedAnswer === correctAnswer ? '✓ Correct!' : `✗ Incorrect. The correct answer is: ${correctAnswer}`}
      {:else}
        You selected: {selectedAnswer}
      {/if}
    </div>
  {/if}
  
</div>

