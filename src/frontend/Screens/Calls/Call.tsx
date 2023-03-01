import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ValidationError } from '../../../app/errors/ValidationError';
import { CallDTO } from '../../../types/entities/call';
import { useErrorContext } from '../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { useForm } from '../../App/hooks/useForm';
import { CALL_FIELDS_CONFIG, DEFAULT_FORM_VALUES } from '../../App/initI18n/schemas/callsTranslationSchema';
import { optionsListTranslations } from '../../App/initI18n/schemas/common-options';
import notify from '../../App/notify/notify';
import { callsStore } from '../../Stores/Calls.store';
import { Flex } from '../../UI/Flex/Flex';
import { UIStepper } from '../../UI/Stepper/UiStepper';
import { Typography } from '../../UI/Typography/Typography';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';
import { RouteParams } from '../interface';

export const CallEditor = observer(
  (): Nullable<JSX.Element> => {
    const { t } = useTranslation();
    const { params } = useRoute<RouteParams>();
    const callId = params?.state.id;

    const { goBack } = useNavigation<Navigation>();
    const { updateContextErrors } = useErrorContext();
    const store = callsStore;
    const { form, setFormFieldData, formErrors, resetForm, setFormErrors, formErrorsQuantity } = useForm<Partial<CallDTO>>(
      DEFAULT_FORM_VALUES,
      DEFAULT_FORM_VALUES,
    );

    useEffect(() => {
      if (callId) {
        store.get(callId).then(() => {
          if (store.activeCall) {
            resetForm(store.activeCall);
            setFormErrors({});
          }
        });
      }
    }, [callId]);

    function onNavigateToHomeHandler(): void {
      goBack();
    }

    async function onStepperFinished(): Promise<void> {
      try {
        const isSuccess = await store.create(form as CallDTO);

        if (isSuccess) {
          notify.showMessage(t('messages.success'), '', false);
          onNavigateToHomeHandler();
        }
      } catch (e) {
        if (!(e instanceof ValidationError)) {
          resetForm(DEFAULT_FORM_VALUES);
        }

        updateContextErrors?.(e);
      }
    }

    return (
      <ScreenView
        header={{
          title: callId ? t(optionsListTranslations.lists.actions.edit) : t(optionsListTranslations.lists.actions.create),
          onBackClick: onNavigateToHomeHandler,
          rightIconType: 'tick',
          onRightIconClick: onStepperFinished,
        }}
      >
        {!!formErrorsQuantity && (
          <Typography color="neutralRed" mode="caption-medium">
            {t('errors.quantity', { quantity: formErrorsQuantity })}
          </Typography>
        )}

        <UIStepper<CallDTO> isError={!!formErrorsQuantity} errors={formErrors} onChangeValue={setFormFieldData} values={form} list={CALL_FIELDS_CONFIG} />

        <Flex height={100} />
      </ScreenView>
    );
  },
);
