export interface TextAreaProps {
  title: string;
  maxLength?: number;
  value: string;
  onValueChanged: (newValue: string) => void;
  placeholder?: string;
}
