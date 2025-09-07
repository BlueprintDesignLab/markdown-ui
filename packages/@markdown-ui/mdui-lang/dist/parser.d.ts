import { ParseResult } from './types.js';
export declare class DSLParser {
    parse(input: string): ParseResult;
    private tokenize;
    private parseArray;
    private parseTextInput;
    private parseButtonGroup;
    private parseSelect;
    private parseSelectMulti;
    private parseSlider;
    private parseForm;
    private parseChart;
    private parseMultipleChoiceQuestion;
    private parseShortAnswerQuestion;
    private parseQuiz;
}
export declare function parseDSL(input: string): ParseResult;
