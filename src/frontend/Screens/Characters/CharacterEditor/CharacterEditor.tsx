import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';

import { CharacterEnum } from '../../../../constants/character.enum';
import { CharacterDTO } from '../../../../types/entities/character';
import { useForm } from '../../../App/hooks/useForm';
import {
  ALLY_FIELDS,
  charactersTranslations,
  COMMON_CHARACTER_FIELDS_CONFIG,
  GUARD_FIELDS,
  MENTORS_FIELDS,
  MESSENGER_SHADOW_FIELDS,
} from '../../../App/initI18n/schemas/characterTranslation';
import { optionsListTranslations } from '../../../App/initI18n/schemas/common-options';
import { useAppNavigation } from '../../../Hooks/useAppNavigation';
import { useStepperFinished } from '../../../Hooks/useStepperFinished';
import { charactersStore } from '../../../Stores/Characters.store';
import { Flex } from '../../../UI/Flex/Flex';
import { UIStepper } from '../../../UI/Stepper/UiStepper';
import { Typography } from '../../../UI/Typography/Typography';
import { ScreenView } from '../../../Widgets/ScreenView/ScreenView';
import { CHARACTER_FORM_DEFAULTS } from '../characterDefaults';

export const CharacterEditor = observer(
  (): Nullable<JSX.Element> => {
    const { t } = useTranslation();

    const { goBack, state } = useAppNavigation();
    const characterId = state?.id;
    const characterType = state?.characterType;
    const store = charactersStore;
    const { form, setFormFieldData, formErrors, resetForm, setFormErrors, formErrorsQuantity } = useForm<Partial<CharacterDTO>>(
      { ...CHARACTER_FORM_DEFAULTS, type: characterType },
      CHARACTER_FORM_DEFAULTS,
    );

    const onStepperFinished = useStepperFinished<CharacterDTO>(
      data => store.save(data),
      () => resetForm(CHARACTER_FORM_DEFAULTS),
    );

    const currentList = useMemo(() => {
      let listConfig = [...COMMON_CHARACTER_FIELDS_CONFIG];

      if (characterType) {
        listConfig = listConfig.filter(({ name }) => name !== 'type');
      }

      switch (form.type) {
        case CharacterEnum.Ally:
          listConfig.push(...ALLY_FIELDS);

          break;
        case CharacterEnum.Mentor:
          listConfig.push(...MENTORS_FIELDS);

          break;
        case CharacterEnum.Enemy:
        case CharacterEnum.Shadow:
        case CharacterEnum.Messenger:
          listConfig.push(...MESSENGER_SHADOW_FIELDS);

          break;
        case CharacterEnum.Guard:
          listConfig.push(...GUARD_FIELDS);

          break;

        default:
          return listConfig;
      }

      return listConfig;
    }, [form.type]);

    useEffect(() => {
      if (characterId) {
        store.get(characterId).then(() => {
          if (store.activeCharacter) {
            resetForm(store.activeCharacter);
            setFormErrors({});
          }
        });
      }
    }, [characterId]);

    function onNavigateToHomeHandler(): void {
      goBack();
    }

    return (
      <ScreenView
        header={{
          title: `${characterId ? t(optionsListTranslations.lists.actions.edit) : t(optionsListTranslations.lists.actions.create)} (${
            form?.type ? t(charactersTranslations.lists.types[form?.type.toLowerCase()]) : ''
          })`,
          onBackClick: onNavigateToHomeHandler,
          rightIconType: 'tick',
          onRightIconClick: () => onStepperFinished(form as CharacterDTO),
        }}
      >
        {!!formErrorsQuantity && (
          <Typography color="neutralRed" mode="caption-medium">
            {t('errors.quantity', { quantity: formErrorsQuantity })}
          </Typography>
        )}

        <UIStepper<CharacterDTO> isError={!!formErrorsQuantity} errors={formErrors} onChangeValue={setFormFieldData} values={form} list={currentList} />

        <Flex height={100} />
      </ScreenView>
    );
  },
);
