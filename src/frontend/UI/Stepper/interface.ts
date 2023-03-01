import { StepperFieldField } from '../../../types/editor';

export interface UIStepperProps<T> {
  currentStep?: number;
  isLastStep?: boolean;
  list: StepperFieldField<T>[];
  isError: boolean;
  values: Partial<Record<keyof T, unknown>>;
  errors: Partial<Record<keyof T, unknown>>;
  onChangeValue: (name: string, value: string) => void;
}
