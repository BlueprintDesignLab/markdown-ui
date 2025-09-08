import React, { useState } from 'react';

export interface ShortAnswerQuestionProps {
  question: string;
  placeholder?: string;
  correctAnswer?: string;
  correctAnswers?: string[];
  showFeedback?: boolean;
  onchange: (value: { answer: string; isCorrect?: boolean }) => void;
}

export const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({ 
  question, 
  placeholder = "Type your answer here...",
  correctAnswer,
  correctAnswers,
  showFeedback = false,
  onchange 
}) => {
  const [answer, setAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

  const handleSubmit = () => {
    if (!answer.trim()) return;
    
    setHasAnswered(true);
    
    const normalized = (correctAnswers && correctAnswers.length > 0)
      ? correctAnswers
      : (typeof correctAnswer === 'string' ? [correctAnswer] : undefined);

    const correct = normalized
      ? normalized.some(a => a.toLowerCase() === answer.trim().toLowerCase())
      : undefined;
    
    setIsCorrect(correct);
    onchange({ answer: answer.trim(), isCorrect: correct });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !hasAnswered) {
      handleSubmit();
    }
  };

  const getFeedbackMessage = () => {
    if (!hasAnswered || !showFeedback) return null;
    
    const hasAnswers = (correctAnswers && correctAnswers.length > 0) || typeof correctAnswer !== 'undefined';
    if (!hasAnswers) {
      return `Your answer: ${answer.trim()}`;
    }
    
    if (correctAnswers && correctAnswers.length > 0) {
      return isCorrect 
        ? '✓ Correct!'
        : `✗ Incorrect. Accepted answers: ${correctAnswers.join(', ')}`;
    }
    return isCorrect ? '✓ Correct!' : `✗ Incorrect. The correct answer is: ${correctAnswer}`;
  };

  return (
    <div className="widget-saq">
      <div className="saq-question">{question}</div>
      <div className="saq-input-container">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={hasAnswered && showFeedback}
          className={`saq-input ${
            hasAnswered && showFeedback
              ? isCorrect ? 'saq-input-correct' : 'saq-input-incorrect'
              : ''
          }`}
        />
        {!hasAnswered && (
          <button 
            onClick={handleSubmit} 
            disabled={!answer.trim()}
            className="saq-submit"
          >
            Submit
          </button>
        )}
      </div>
      {hasAnswered && showFeedback && getFeedbackMessage() && (
        <div className={`saq-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {getFeedbackMessage()}
        </div>
      )}
    </div>
  );
};
