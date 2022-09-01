export interface UIRadioProps {
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  name: string;
  options: SelectOption[];
  error?: string;
}
