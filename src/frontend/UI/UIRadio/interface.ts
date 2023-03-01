export interface UIRadioProps {
  label: string;
  value: any;
  onChange: (name: string, value: string) => void;
  name: string;
  options: SelectOption[];
  error?: string;
}
