import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RuleError } from '../../../../app/errors/RuleError';
import { ValidationError } from '../../../../app/errors/ValidationError';
import { UINotifier } from '../../notify/notify';

interface UseSetErrorToErrorsContextResult {
  errors: Record<string, string>;
  onErrorHandler: (error: unknown) => void;
}

export function useSetErrorToErrorsContext(): UseSetErrorToErrorsContextResult {
  const [errors, setErrors] = useState<UseSetErrorToErrorsContextResult['errors']>({});
  const { t } = useTranslation();

  function decodeRuleError(error: RuleError): void {
    const notify = new UINotifier();
    const { code, payload } = error.errorPayload;

    notify.showMessage('', t(`errors.${code}`, payload), true);
  }

  function decodeValidationError(error: ValidationError): void {
    if (Object.keys(error.properties).length) {
      const errorsSet: UseSetErrorToErrorsContextResult['errors'] = {};

      Object.keys(error.properties).forEach(property => {
        const result: string[] = [];
        const propertyPayload = error.properties[property];

        propertyPayload.forEach(({ code, payload }) => {
          result.push(
            t(`errors.${code}`, {
              property,
              ...payload,
            }),
          );
        });

        errorsSet[property] = result.join(', ');
      });

      setErrors(errorsSet);
    }
  }

  function onErrorHandler(error: unknown): void {
    if (error instanceof ValidationError) {
      decodeValidationError(error);

      return;
    }

    if (error instanceof RuleError) {
      decodeRuleError(error);

      return;
    }

    if (error instanceof Error) {
      const notify = new UINotifier();

      notify.showMessage('', error.message, true);
    }
  }

  return { errors, onErrorHandler };
}
