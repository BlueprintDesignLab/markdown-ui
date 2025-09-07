export interface TextInputWidget {
    type: "text-input";
    id?: string;
    label?: string;
    placeholder?: string;
    default?: string;
}
export interface ButtonGroupWidget {
    type: "button-group";
    id?: string;
    label?: string;
    choices: string[];
    default?: string;
}
export interface SelectWidget {
    type: "select";
    id?: string;
    label?: string;
    choices: string[];
    default?: string;
}
export interface SelectMultiWidget {
    type: "select-multi";
    id?: string;
    label?: string;
    choices: string[];
    default?: string | string[];
}
export interface SliderWidget {
    type: "slider";
    id?: string;
    label?: string;
    min: number;
    max: number;
    step?: number;
    default?: number;
}
export interface FormWidget {
    type: "form";
    id?: string;
    submitLabel?: string;
    fields: Widget[];
}
export interface ChartWidget {
    type: "chart-line" | "chart-bar" | "chart-pie" | "chart-scatter";
    id?: string;
    title?: string;
    height?: number;
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
    }>;
    options?: Record<string, any>;
}
export interface MultipleChoiceQuestionWidget {
    type: "multiple-choice-question";
    id?: string;
    question: string;
    choices: string[];
    correctAnswer?: string;
    showFeedback?: boolean;
}
export interface ShortAnswerQuestionWidget {
    type: "short-answer-question";
    id?: string;
    question: string;
    placeholder?: string;
    correctAnswer?: string;
    showFeedback?: boolean;
}
export interface QuizQuestion {
    id: string;
    type: "mcq" | "short-answer";
    question: string;
    points: number;
    choices?: string[];
    correctAnswer?: string;
    placeholder?: string;
    correctAnswers?: string[];
}
export interface QuizWidget {
    type: "quiz";
    id?: string;
    title: string;
    questions: QuizQuestion[];
    showScore?: boolean;
    showProgress?: boolean;
    passingScore?: number;
}
export type Widget = TextInputWidget | ButtonGroupWidget | SelectWidget | SelectMultiWidget | SliderWidget | FormWidget | ChartWidget | MultipleChoiceQuestionWidget | ShortAnswerQuestionWidget | QuizWidget;
export interface ParseResult {
    success: boolean;
    widget?: Widget;
    error?: string;
}
