export interface CommonStepperField<RecordType> {
  label: string;
  name: keyof RecordType;
  type: string;
}

export interface TextStepperField<RecordType> extends CommonStepperField<RecordType> {
  maxValueLength?: number;
  minValueLength?: number;
  type: 'text';
}

export interface OptionsStepperField<RecordType> extends CommonStepperField<RecordType> {
  options: SelectOption[];
  type: 'list';
}

export type StepperFieldField<Type> = TextStepperField<Type> | OptionsStepperField<Type>;
