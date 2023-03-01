import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { WorldEnum } from '../../../constants/world.enum';
import { WorldDTO } from '../../../types/entities/world';
import { useForm } from '../../App/hooks/useForm';
import {
  COMMON_WORLD_FIELDS_CONFIG,
  HIDDEN_CAVE_WORLD_FIELDS_CONFIG,
  HOLIDAY_WORLD_FIELDS_CONFIG,
  PLAIN_WORLD_FIELDS_CONFIG,
  PRIVATE_WORLD_FIELDS_CONFIG,
  RETURN_WITH_POTION_WORLD_FIELDS_CONFIG,
} from '../../App/initI18n/schemas/worldTranslations';
import { useStepperFinished } from '../../Hooks/useStepperFinished';
import { worldsStore } from '../../Stores/Worlds.store';
import { Flex } from '../../UI/Flex/Flex';
import { UIStepper } from '../../UI/Stepper/UiStepper';
import { Typography } from '../../UI/Typography/Typography';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';
import { worldWidgetInfoTranslations } from '../../Widgets/WorldWidget/worldWidgetTranslations';
import { RouteParams } from '../interface';

import { DEFAULT_WORLD_FORM_STATE } from './constants';

export const WorldEditor = observer(
  (): Nullable<JSX.Element> => {
    const { t } = useTranslation();
    const { goBack } = useNavigation<Navigation>();
    const { params } = useRoute<RouteParams>();
    const worldId = params?.state?.id ?? '';
    const worldType = params?.state?.worldType ?? '';
    const plotId = params?.state?.plotId ?? '';
    const defaultFormData = DEFAULT_WORLD_FORM_STATE as WorldDTO;
    const { form, setFormFieldData, formErrors, resetForm, formErrorsQuantity } = useForm<WorldDTO>(
      { ...defaultFormData, type: worldType as WorldEnum },
      defaultFormData,
    );

    const onStepperFinished = useStepperFinished<WorldDTO>(
      async (data): Promise<string> => {
        if (data.id) {
          return worldsStore.updateWorld(data);
        }

        return worldsStore.createWorld(plotId, data);
      },
      () => resetForm(defaultFormData),
    );

    useEffect(() => {
      if (worldId) {
        worldsStore.getWorld(worldId).then(() => {
          if (worldsStore.selectedWorldDto) {
            resetForm(worldsStore.selectedWorldDto);
          }
        });
      }
    }, []);

    function onNavigateToHomeHandler(): void {
      goBack();
    }

    const worldConstructorSteps = useMemo(() => {
      if (form.type === 'PlainWorld') {
        return PLAIN_WORLD_FIELDS_CONFIG;
      }

      if (form.type === 'PrivateWorld') {
        return PRIVATE_WORLD_FIELDS_CONFIG;
      }

      if (form.type === 'HiddenCaveWorld') {
        return HIDDEN_CAVE_WORLD_FIELDS_CONFIG;
      }

      if (form.type === 'HolidayWorld') {
        return HOLIDAY_WORLD_FIELDS_CONFIG;
      }

      if (form.type === 'ReturnWithPotionWorld') {
        return RETURN_WITH_POTION_WORLD_FIELDS_CONFIG;
      }

      return COMMON_WORLD_FIELDS_CONFIG;
    }, [form.type]);

    return (
      <ScreenView
        header={{
          title: t(worldWidgetInfoTranslations.lists.captions[form.type]),
          onBackClick: onNavigateToHomeHandler,
          rightIconType: 'tick',
          onRightIconClick: () => onStepperFinished(form),
        }}
      >
        {!!formErrorsQuantity && (
          <Typography color="neutralRed" mode="caption-medium">
            {t('errors.quantity', { quantity: formErrorsQuantity })}
          </Typography>
        )}

        <UIStepper<WorldDTO> isError={!!formErrorsQuantity} errors={formErrors} onChangeValue={setFormFieldData} values={form} list={worldConstructorSteps} />

        <Flex height={100} />
      </ScreenView>
    );
  },
);
