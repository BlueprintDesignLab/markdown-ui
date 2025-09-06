import React, { useState, useMemo } from 'react';

export interface QuizProps {
  title: string;
  questions: QuizQuestion[];
  showScore?: boolean;
  showProgress?: boolean;
  passingScore?: number;
  onchange: (value: QuizState) => void;
}

interface QuizQuestion {
  id: string;
  type: "mcq" | "short-answer";
  question: string;
  points: number;
  // MCQ specific
  choices?: string[];
  correctAnswer?: string;
  // Short answer specific  
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

export const Quiz: React.FC<QuizProps> = ({ 
  title,
  questions,
  showScore = true,
  showProgress = true,
  passingScore,
  onchange 
}) => {
  const [answers, setAnswers] = useState<Record<string, QuizAnswer>>({});

  const quizState = useMemo<QuizState>(() => {
    const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
    const totalScore = Object.values(answers).reduce((sum, a) => sum + a.points, 0);
    const questionsAnswered = Object.keys(answers).length;
    const isCompleted = questionsAnswered === questions.length;

    return {
      answers,
      totalScore,
      maxScore,
      questionsAnswered,
      isCompleted
    };
  }, [answers, questions]);

  const handleQuestionAnswer = (questionId: string, userAnswer: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question || answers[questionId]?.submitted) return;

    let isCorrect = false;
    
    if (question.type === "mcq") {
      isCorrect = question.correctAnswer === userAnswer;
    } else if (question.type === "short-answer") {
      if (question.correctAnswers) {
        isCorrect = question.correctAnswers.some(
          correct => correct.toLowerCase() === userAnswer.toLowerCase()
        );
      }
    }

    const newAnswer: QuizAnswer = {
      answer: userAnswer,
      isCorrect,
      points: isCorrect ? question.points : 0,
      submitted: true
    };

    const newAnswers = { ...answers, [questionId]: newAnswer };
    setAnswers(newAnswers);

    // Trigger onChange with updated state
    const updatedState = {
      answers: newAnswers,
      totalScore: Object.values(newAnswers).reduce((sum, a) => sum + a.points, 0),
      maxScore: quizState.maxScore,
      questionsAnswered: Object.keys(newAnswers).length,
      isCompleted: Object.keys(newAnswers).length === questions.length
    };

    onchange(updatedState);
  };

  const getProgressPercentage = () => {
    return Math.round((quizState.questionsAnswered / questions.length) * 100);
  };

  const getScorePercentage = () => {
    return quizState.maxScore > 0 ? Math.round((quizState.totalScore / quizState.maxScore) * 100) : 0;
  };

  const isPassing = () => {
    return passingScore ? getScorePercentage() >= passingScore : null;
  };

  const renderMCQQuestion = (question: QuizQuestion) => {
    const answer = answers[question.id];
    const isAnswered = answer?.submitted;

    return (
      <div key={question.id} className="quiz-question">
        <div className="quiz-question-header">
          <h3 className="quiz-question-text">{question.question}</h3>
          <span className="quiz-question-points">{question.points} pts</span>
        </div>
        
        <div className="quiz-choices">
          {question.choices?.map((choice, index) => {
            let choiceClass = 'quiz-choice';
            
            if (isAnswered) {
              if (choice === question.correctAnswer) {
                choiceClass += ' quiz-choice-correct';
              } else if (choice === answer.answer && choice !== question.correctAnswer) {
                choiceClass += ' quiz-choice-incorrect';
              }
            } else if (choice === answer?.answer) {
              choiceClass += ' quiz-choice-selected';
            }

            return (
              <button
                key={index}
                className={choiceClass}
                onClick={() => handleQuestionAnswer(question.id, choice)}
                disabled={isAnswered}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`quiz-feedback ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
            {answer.isCorrect 
              ? `✓ Correct! (+${answer.points} pts)` 
              : `✗ Incorrect. The correct answer is: ${question.correctAnswer}`}
          </div>
        )}
      </div>
    );
  };

  const renderShortAnswerQuestion = (question: QuizQuestion) => {
    const answer = answers[question.id];
    const isAnswered = answer?.submitted;
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
      if (!inputValue.trim() || isAnswered) return;
      handleQuestionAnswer(question.id, inputValue.trim());
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !isAnswered) {
        handleSubmit();
      }
    };

    return (
      <div key={question.id} className="quiz-question">
        <div className="quiz-question-header">
          <h3 className="quiz-question-text">{question.question}</h3>
          <span className="quiz-question-points">{question.points} pts</span>
        </div>
        
        <div className="quiz-input-container">
          <input
            type="text"
            value={isAnswered ? answer.answer : inputValue}
            onChange={(e) => !isAnswered && setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={question.placeholder || "Type your answer here..."}
            disabled={isAnswered}
            className={`quiz-input ${
              isAnswered 
                ? answer.isCorrect ? 'quiz-input-correct' : 'quiz-input-incorrect'
                : ''
            }`}
          />
          {!isAnswered && (
            <button 
              onClick={handleSubmit} 
              disabled={!inputValue.trim()}
              className="quiz-submit"
            >
              Submit
            </button>
          )}
        </div>

        {isAnswered && (
          <div className={`quiz-feedback ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
            {answer.isCorrect 
              ? `✓ Correct! (+${answer.points} pts)` 
              : `✗ Incorrect. Accepted answers: ${question.correctAnswers?.join(', ') || 'N/A'}`}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="widget-quiz">
      {/* Quiz Header */}
      <div className="quiz-header">
        <h2 className="quiz-title">{title}</h2>
        
        <div className="quiz-stats">
          {showProgress && (
            <div className="quiz-progress">
              <span className="quiz-progress-text">
                Progress: {quizState.questionsAnswered}/{questions.length} questions
              </span>
              <div className="quiz-progress-bar">
                <div 
                  className="quiz-progress-fill"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>
          )}
          
          {showScore && (
            <div className="quiz-score">
              <span className="quiz-score-text">
                Score: {quizState.totalScore}/{quizState.maxScore} ({getScorePercentage()}%)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Questions */}
      <div className="quiz-questions">
        {questions.map((question) => 
          question.type === "mcq" 
            ? renderMCQQuestion(question)
            : renderShortAnswerQuestion(question)
        )}
      </div>

      {/* Quiz Summary */}
      {quizState.isCompleted && (
        <div className="quiz-summary">
          <h3>Quiz Complete!</h3>
          <div className="quiz-final-score">
            Final Score: {quizState.totalScore}/{quizState.maxScore} points ({getScorePercentage()}%)
          </div>
          {passingScore && (
            <div className={`quiz-result ${isPassing() ? 'passed' : 'failed'}`}>
              {isPassing() ? '🎉 Passed!' : '❌ Failed'} 
              (Passing: {passingScore}%)
            </div>
          )}
        </div>
      )}
    </div>
  );
};