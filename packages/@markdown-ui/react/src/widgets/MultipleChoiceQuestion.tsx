import React, { useState } from 'react';

export interface MultipleChoiceQuestionProps {
  question: string;
  choices: string[];
  correctAnswer?: string;
  showFeedback?: boolean;
  onchange: (value: { answer: string; isCorrect?: boolean }) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ 
  question, 
  choices, 
  correctAnswer,
  showFeedback = false,
  onchange 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setHasAnswered(true);
    
    const isCorrect = correctAnswer ? answer === correctAnswer : undefined;
    onchange({ answer, isCorrect });
  };

  const getChoiceClassName = (choice: string) => {
    let className = 'mcq-choice';
    
    if (hasAnswered && showFeedback && correctAnswer) {
      if (choice === correctAnswer) {
        className += ' mcq-choice-correct';
      } else if (choice === selectedAnswer && choice !== correctAnswer) {
        className += ' mcq-choice-incorrect';
      }
    } else if (choice === selectedAnswer) {
      className += ' mcq-choice-selected';
    }
    
    return className;
  };

  return (
    <div className="widget-mcq">
      <div className="mcq-question">{question}</div>
      <div className="mcq-choices">
        {choices.map((choice, index) => (
          <button
            key={index}
            className={getChoiceClassName(choice)}
            onClick={() => handleAnswerSelect(choice)}
            disabled={hasAnswered && showFeedback}
          >
            {choice}
          </button>
        ))}
      </div>
      {hasAnswered && showFeedback && selectedAnswer && (
        <div className={`mcq-feedback ${selectedAnswer === correctAnswer ? 'correct' : 'incorrect'}`}>
          {correctAnswer ? 
            (selectedAnswer === correctAnswer ? '✓ Correct!' : `✗ Incorrect. The correct answer is: ${correctAnswer}`) :
            `You selected: ${selectedAnswer}`
          }
        </div>
      )}
    </div>
  );
};