import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ValidationError } from '../../../app/errors/ValidationError';
import { MainEdgeType } from '../../../constants/edge.enum';
import { EdgeDTO } from '../../../types/entities/edge';
import { useErrorContext } from '../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { useForm } from '../../App/hooks/useForm';
import notify from '../../App/notify/notify';
import { EDGE_FORM_DEFAULT_STATE } from '../../constants';
import { edgeStore } from '../../Stores/Edge.store';
import { Flex } from '../../UI/Flex/Flex';
import { UIStepper } from '../../UI/Stepper/Stepper';
import { Typography } from '../../UI/Typography/Typography';
import { UIInput } from '../../UI/UIInput/UIInput';
import { UIRadio } from '../../UI/UIRadio/UIRadio';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';
import { RouteParams } from '../interface';
import { ROUTES } from '../routes';

import { EDGE_FIELDS_CONFIG, edgeTranslations } from './constants';

export const EdgeEditor = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<Navigation>();
  const { params } = useRoute<RouteParams>();
  const { updateContextErrors } = useErrorContext();
  const { state } = params;
  const worldId = state?.id;
  const { edge } = edgeStore;
  const { form, setFormFieldData, formErrors, resetForm } = useForm<Omit<EdgeDTO, 'rewards' | 'tasks'>>(EDGE_FORM_DEFAULT_STATE, EDGE_FORM_DEFAULT_STATE);

  const currentFirldsConfig = useMemo(() => {
    const { mainEdgeType, type } = form;

    return EDGE_FIELDS_CONFIG.filter(config => {
      if (config.name === 'mainEdgeType') {
        return type === 'mainEdge';
      }

      if (config.name === 'shadowEncounterType') {
        return mainEdgeType === MainEdgeType.ShadowEncounter;
      }

      return true;
    });
  }, [form]);

  useEffect(() => {
    if (!worldId) {
      navigate(ROUTES.home);

      return;
    }

    if (edge) {
      resetForm(edge);
    }

    edgeStore.get(worldId);
  }, [worldId]);

  function onNavigateToHomeHandler(): void {
    navigate(ROUTES.home, {});
  }

  async function onStepperFinished(): Promise<void> {
    try {
      const isSuccess = await edgeStore.save(worldId ?? '', form);

      if (isSuccess) {
        notify.showMessage(t('messages.success'), '', false);
        onNavigateToHomeHandler();
      }
    } catch (e) {
      if (!(e instanceof ValidationError)) {
        resetForm(EDGE_FORM_DEFAULT_STATE);
      }

      updateContextErrors?.(e);
    }
  }

  if (!worldId) {
    return null;
  }

  const errorsQuantity = Object.keys(formErrors)?.length;

  return (
    <ScreenView
      header={{
        title: t(edgeTranslations.caption),
        onBackClick: onNavigateToHomeHandler,
        rightIconType: 'tick',
        onRightIconClick: onStepperFinished,
      }}
    >
      {!!errorsQuantity && (
        <Typography color="neutralRed" mode="caption-medium">
          {t('errors.quantity', { quantity: errorsQuantity })}
        </Typography>
      )}

      <UIStepper
        invalidPoints={currentFirldsConfig.map(({ name }) => !!formErrors?.[name])}
        content={[
          ...currentFirldsConfig.map(config => {
            const { type, name, label } = config;

            switch (type) {
              case 'text':
                return (
                  <Flex key={name} align="flex-start">
                    <UIInput
                      autoFocus
                      label={t(label)}
                      error={formErrors?.[name]}
                      value={form?.[name] ?? ''}
                      onChange={setFormFieldData}
                      name={name}
                      maxValueLength={config.maxValueLength}
                      minValueLength={config.minValueLength}
                    />
                  </Flex>
                );
              case 'list':
                return (
                  <Flex key={name} align="flex-start">
                    <UIRadio
                      options={config.options}
                      label={t(label)}
                      name={name}
                      error={formErrors?.[name]}
                      value={form?.[name] ?? ''}
                      onChange={setFormFieldData}
                    />
                  </Flex>
                );
            }
          }),
        ]}
      />

      <Flex height={100} />
    </ScreenView>
  );
};
