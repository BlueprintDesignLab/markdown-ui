export interface TextInputWidget {
  type: "textInput";
  id?: string;
  label?: string;
  placeholder?: string;
  default?: string;
}

export interface ButtonGroupWidget {
  type: "buttonGroup";
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
  type: "selectMulti";
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

export type Widget = 
  | TextInputWidget 
  | ButtonGroupWidget 
  | SelectWidget 
  | SelectMultiWidget 
  | SliderWidget 
  | FormWidget;

export interface ParseResult {
  success: boolean;
  widget?: Widget;
  error?: string;
}