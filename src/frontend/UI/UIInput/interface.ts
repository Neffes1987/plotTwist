export interface UIInputProps {
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  name: string;
  multiline?: boolean;
  autoFocus?: boolean;
  error?: string;
  maxValueLength?: number;
}
