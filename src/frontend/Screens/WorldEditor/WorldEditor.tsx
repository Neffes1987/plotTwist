import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { WorldDTO } from 'backend';
import { observer } from 'mobx-react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { FORM_DEFAULT_STATE } from '../../../constants';
import { useForm } from '../../App/hooks/useForm';
import notify from '../../App/notify/notify';
import { Flex } from '../../UI/Flex/Flex';
import { UIStepper } from '../../UI/Stepper/Stepper';
import { Typography } from '../../UI/Typography/Typography';
import { UIInput } from '../../UI/UIInput/UIInput';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';
import { worldWidgetInfoTranslations } from '../../Widgets/WorldWidget/worldWidgetTranslations';
import { RouteParams } from '../interface';
import { ROUTES } from '../routes';

import worldEditStore from './WorldEditStore';

export const WorldEditor = observer(
  (): Nullable<JSX.Element> => {
    const { t } = useTranslation();
    const { navigate } = useNavigation<Navigation>();
    const { params } = useRoute<RouteParams>();
    const { state } = params;
    const worldType = state?.caption as WorldDTO['type'];
    const defaultFormData = FORM_DEFAULT_STATE[worldType];
    const { form, setFormFieldData, formErrors, formatBackendError, setFormErrors, resetForm } = useForm<Omit<WorldDTO, 'id' | 'laws' | 'waterholes'>>(
      defaultFormData,
      defaultFormData,
    );

    useEffect(() => {
      if (!worldType) {
        navigate(ROUTES.home);

        return;
      }

      worldEditStore.setWorld({ ...defaultFormData, id: state.id ?? '' });
      worldEditStore
        .loadWorld()
        .then(isSuccess => {
          if (isSuccess && worldEditStore.world) {
            resetForm(worldEditStore.world);
          }
        })
        .catch(console.error);
    }, [worldType]);

    useEffect(() => {
      if (worldEditStore.error) {
        formatBackendError(worldEditStore.error);
      } else {
        setFormErrors(defaultFormData);
      }
    }, [worldEditStore.error]);

    function onNavigateToHomeHandler(): void {
      navigate(ROUTES.home, {});
    }

    async function onStepperFinished(): Promise<void> {
      const world: Omit<WorldDTO, 'laws' | 'waterholes'> = {
        ...form,
        id: worldEditStore.world?.id ?? state.id ?? '',
      };

      worldEditStore.setWorld(world as WorldDTO);
      await worldEditStore.saveWorld().then(isSuccess => {
        if (isSuccess) {
          notify.showMessage(t('messages.success'), '', false);
        }
      });
    }

    if (!worldType) {
      return null;
    }

    console.log(worldType, worldWidgetInfoTranslations.lists.captions);

    return (
      <ScreenView
        header={{
          title: t(worldWidgetInfoTranslations.lists.captions[worldType]),
          onBackClick: onNavigateToHomeHandler,
        }}
      >
        {formErrors?.common && (
          <Typography color="neutralRed" mode="caption-medium">
            {formErrors.common}
          </Typography>
        )}

        <UIStepper
          onFinish={onStepperFinished}
          currentStep={worldEditStore.firstErrorStep}
          content={[
            ...worldEditStore.getStepperConfig().map(({ name, maxValueLength, label }) => (
              <Flex key={name as string}>
                <UIInput
                  autoFocus
                  label={t(label)}
                  error={formErrors?.[name]}
                  value={form?.[name] ?? ''}
                  onChange={setFormFieldData}
                  name={name as string}
                  maxValueLength={maxValueLength}
                />
              </Flex>
            )),
          ]}
        />
      </ScreenView>
    );
  },
);
