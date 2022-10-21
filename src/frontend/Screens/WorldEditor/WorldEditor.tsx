import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ValidationError } from '../../../app/errors/ValidationError';
import { WorldDTO } from '../../../types/entities/world';
import { useErrorContext } from '../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { useForm } from '../../App/hooks/useForm';
import notify from '../../App/notify/notify';
import { FORM_DEFAULT_STATE } from '../../constants';
import activePlotStore from '../../Stores/ActivePlot.store';
import activeWorldStore from '../../Stores/ActiveWorld.store';
import { Flex } from '../../UI/Flex/Flex';
import { UIStepper } from '../../UI/Stepper/Stepper';
import { Typography } from '../../UI/Typography/Typography';
import { UIInput } from '../../UI/UIInput/UIInput';
import { UIRadio } from '../../UI/UIRadio/UIRadio';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';
import { worldWidgetInfoTranslations } from '../../Widgets/WorldWidget/worldWidgetTranslations';
import { RouteParams } from '../interface';
import { ROUTES } from '../routes';

export const WorldEditor = observer(
  (): Nullable<JSX.Element> => {
    const { t } = useTranslation();
    const { navigate } = useNavigation<Navigation>();
    const { params } = useRoute<RouteParams>();
    const { updateContextErrors } = useErrorContext();
    const { state } = params;
    const plotId = activePlotStore.selectedPlotId;
    const worldType = state?.caption as WorldDTO['type'];
    const defaultFormData = FORM_DEFAULT_STATE[worldType];
    const { firstErrorStep } = activeWorldStore;
    const { form, setFormFieldData, formErrors, resetForm } = useForm<WorldDTO>(defaultFormData, defaultFormData);

    useEffect(() => {
      if (!worldType || !plotId) {
        navigate(ROUTES.home);

        return;
      }

      if (activeWorldStore.world) {
        resetForm(activeWorldStore.world);
      }

      activeWorldStore.plotId = plotId;

      activeWorldStore.setWorld({ ...defaultFormData, id: state.id ?? '' });
      activeWorldStore.loadWorld().catch(updateContextErrors);
    }, [plotId, worldType]);

    function onNavigateToHomeHandler(): void {
      navigate(ROUTES.home, {});
    }

    async function onStepperFinished(): Promise<void> {
      const world: Omit<WorldDTO, 'laws' | 'waterholes'> = {
        ...(activeWorldStore.world ?? {}),
        ...form,
        id: activeWorldStore.world?.id ?? state.id ?? '',
      };

      activeWorldStore.setWorld(world as WorldDTO);

      try {
        const isSuccess = await activeWorldStore.saveWorld();

        if (isSuccess) {
          notify.showMessage(t('messages.success'), '', false);
          onNavigateToHomeHandler();
        }
      } catch (e) {
        if (!(e instanceof ValidationError)) {
          resetForm(defaultFormData);
        }

        updateContextErrors?.(e);
      }
    }

    if (!worldType) {
      return null;
    }

    const errorsQuantity = Object.keys(formErrors)?.length;
    const worldConstructorSteps = activeWorldStore.getStepperConfig();

    return (
      <ScreenView
        header={{
          title: t(worldWidgetInfoTranslations.lists.captions[worldType]),
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
          currentStep={firstErrorStep}
          invalidPoints={worldConstructorSteps.map(({ name }) => !!formErrors?.[name])}
          content={[
            ...worldConstructorSteps.map(config => {
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
                        label={label}
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
  },
);
