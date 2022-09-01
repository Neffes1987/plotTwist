import { ReactElement } from 'react';

export interface UIStepperProps {
  currentStep?: number;
  content: ReactElement[];
  onFinish: () => void;
  onValidateNext?: () => boolean;
  invalidPoints?: boolean[];
}
