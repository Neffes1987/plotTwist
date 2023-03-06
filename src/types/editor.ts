import { TextInputProps } from 'react-native';

export interface CommonStepperField<RecordType> {
  label: string;
  name: keyof RecordType;
  type: 'text' | 'list';
}

export interface TextStepperField<RecordType> extends CommonStepperField<RecordType> {
  maxValueLength?: number;
  minValueLength?: number;
  type: 'text';
  keyboardType?: TextInputProps['keyboardType'];
}

export interface OptionsStepperField<RecordType> extends CommonStepperField<RecordType> {
  options: SelectOption[];
  type: 'list';
}

export type StepperFieldField<Type> = TextStepperField<Type> | OptionsStepperField<Type>;

export interface CommonEntityWidgetProps<T extends CommonEntityDTO> {
  data: T;
  onSelect?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isSelect?: boolean;
}
