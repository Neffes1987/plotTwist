import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { ValidationError } from '../../../app/errors/ValidationError';
import { useErrorContext } from '../../App/hooks/ErrorBoundaryContext/useErrorContext';
import notify from '../../App/notify/notify';

export function useStepperFinished<T extends CommonEntityDTO>(onCreate: (data: T) => Promise<string>, onClearData: () => void): (form: T) => Promise<void> {
  const { goBack } = useNavigation<Navigation>();
  const { t } = useTranslation();
  const { updateContextErrors } = useErrorContext();

  async function onStepperFinished(form: T): Promise<void> {
    try {
      const isSuccess = await onCreate(form);

      if (isSuccess) {
        notify.showMessage(t('messages.success'), '', false);
        goBack();
      }
    } catch (e) {
      if (!(e instanceof ValidationError)) {
        onClearData();
      }

      updateContextErrors?.(e);
    }
  }

  return onStepperFinished;
}
