import { ReactElement } from 'react';

export interface UIStepperProps {
  currentStep?: number;
  content: ReactElement[];
  onValidateNext?: () => boolean;
  invalidPoints?: boolean[];
}
