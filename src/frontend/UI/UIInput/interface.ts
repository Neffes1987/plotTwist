import { TextInputProps } from 'react-native';

export interface UIInputProps {
  label: string;
  value: unknown;
  onChange: (name: string, value: string) => void;
  name: string;
  multiline?: boolean;
  autoFocus?: boolean;
  error?: string;
  maxValueLength?: number;
  minValueLength?: number;
  keyboardType?: TextInputProps['keyboardType'];
}
