import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CharacterEnum } from '../../../../constants/character.enum';
import { useAppNavigation } from '../../../Hooks/useAppNavigation';
import { worldsCharactersStore } from '../../../Screens/Characters/stores/WorldCharacters.store';
import { ROUTES } from '../../../Screens/routes';
import { Card } from '../../../UI/Card/Card';
import { WorldWidgetProps } from '../interface';
import { PropertyRow } from '../parts/PropertyRow/PropertyRow';
import { worldWidgetNPCTranslations } from '../worldWidgetTranslations';

export const NPCBlock = ({ characters }: Pick<WorldWidgetProps, 'characters'>): JSX.Element => {
  const { t } = useTranslation();
  const { navigate } = useAppNavigation();
  const charactersList = useMemo(() => {
    const result = {
      [CharacterEnum.Ally]: 0,
      [CharacterEnum.Mentor]: 0,
      [CharacterEnum.Shadow]: 0,
      [CharacterEnum.Enemy]: 0,
      [CharacterEnum.Guard]: 0,
      [CharacterEnum.Messenger]: 0,
    };

    characters?.forEach(character => {
      result[character.type] += 1;
    });

    return result;
  }, [characters]);

  function handlePressProperty(id: string): void {
    navigate(ROUTES.characters, {
      state: {
        characterType: id as CharacterEnum,
        selectable: true,
        selectedItems: {
          ids: worldsCharactersStore.characters.map(({ id }) => id),
          type: 'character',
        },
      },
    });
  }

  return (
    <Card title={t(worldWidgetNPCTranslations.caption)} flex={1} height="100%" align="flex-start" testID="npc-block">
      {Object.keys(charactersList).map((type: string) => (
        <PropertyRow
          key={type}
          showAlert={!charactersList[type]}
          onPress={handlePressProperty}
          caption={t(worldWidgetNPCTranslations.labels[type])}
          quantity={charactersList[type]}
          id={type}
        />
      ))}
    </Card>
  );
};
