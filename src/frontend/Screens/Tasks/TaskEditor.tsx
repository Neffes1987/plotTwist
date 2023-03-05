import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ValidationError } from '../../../app/errors/ValidationError';
import { TaskDTO } from '../../../types/entities/task';
import { useErrorContext } from '../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { useForm } from '../../App/hooks/useForm';
import { EDGE_FIELDS_CONFIG, EDGE_OPTIONS_FIELDS_CONFIG, SHADOW_ENCOUNTER_FIELDS_CONFIG, taskTranslations } from '../../App/initI18n/schemas/taskTranslations';
import notify from '../../App/notify/notify';
import { useAppNavigation } from '../../Hooks/useAppNavigation';
import { taskStore } from '../../Stores/TaskStore';
import { Flex } from '../../UI/Flex/Flex';
import { UIStepper } from '../../UI/Stepper/UiStepper';
import { Typography } from '../../UI/Typography/Typography';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';

import { TASK_FORM_DEFAULT_STATE } from './constants';

export const TaskEditor = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { goBack, state } = useAppNavigation();
  const { updateContextErrors } = useErrorContext();
  const taskId = state?.id;
  const { form, setFormFieldData, formErrors, resetForm, formErrorsQuantity } = useForm<Partial<TaskDTO>>(TASK_FORM_DEFAULT_STATE, TASK_FORM_DEFAULT_STATE);

  const currentFieldsConfig = useMemo(() => {
    const { mainEdgeType, type } = form;

    if (type === 'task') {
      return EDGE_FIELDS_CONFIG;
    }

    if (mainEdgeType === 'shadowEncounter') {
      return [...EDGE_FIELDS_CONFIG, ...EDGE_OPTIONS_FIELDS_CONFIG, ...SHADOW_ENCOUNTER_FIELDS_CONFIG];
    }

    return [...EDGE_FIELDS_CONFIG, ...EDGE_OPTIONS_FIELDS_CONFIG];
  }, [form]);

  useEffect(() => {
    if (taskId) {
      taskStore.get(taskId).then(() => {
        if (taskStore.task) {
          resetForm(taskStore.task);
        }
      });
    }
  }, [taskId]);

  function onNavigateToHomeHandler(): void {
    goBack();
  }

  async function onStepperFinished(): Promise<void> {
    try {
      const isSuccess = await taskStore.save({ ...form, id: taskId ?? '' } as TaskDTO);

      if (isSuccess) {
        notify.showMessage(t('messages.success'), '', false);
        onNavigateToHomeHandler();
      }
    } catch (e) {
      if (!(e instanceof ValidationError)) {
        resetForm(TASK_FORM_DEFAULT_STATE);
      }

      updateContextErrors?.(e);
    }
  }

  return (
    <ScreenView
      header={{
        title: t(taskTranslations.caption),
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

      <UIStepper<TaskDTO> isError={!!formErrorsQuantity} errors={formErrors} onChangeValue={setFormFieldData} values={form} list={currentFieldsConfig} />

      <Flex height={100} />
    </ScreenView>
  );
};
