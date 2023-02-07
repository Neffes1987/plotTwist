import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CharacterEnum } from '../../../../constants/character.enum';
import { ROUTES } from '../../../Screens/routes';
import { Card } from '../../../UI/Card/Card';
import { WorldWidgetProps } from '../interface';
import { PropertyRow } from '../parts/PropertyRow/PropertyRow';
import { worldWidgetNPCTranslations } from '../worldWidgetTranslations';

export const NPCBlock = ({ onOpenWorldProperty, worldInfo }: Pick<WorldWidgetProps, 'onOpenWorldProperty' | 'worldInfo'>): JSX.Element => {
  const { t } = useTranslation();
  const characters = useMemo(() => {
    const result = {
      [CharacterEnum.Ally]: 0,
      [CharacterEnum.Mentor]: 0,
      [CharacterEnum.Shadow]: 0,
      [CharacterEnum.Enemy]: 0,
      [CharacterEnum.Guard]: 0,
      [CharacterEnum.Messenger]: 0,
    };

    worldInfo?.characters?.forEach(character => {
      result[character.type] += 1;
    });

    return result;
  }, [worldInfo.characters]);

  function handlePressProperty(id: string): void {
    onOpenWorldProperty(ROUTES.characters, `${id}_${worldInfo.worldData.id}`);
  }

  return (
    <Card title={t(worldWidgetNPCTranslations.caption)} flex={1} height="100%" align="flex-start" testID="npc-block">
      {Object.keys(characters).map((type: string) => (
        <PropertyRow
          key={type}
          showAlert={!characters[type]}
          onPress={handlePressProperty}
          caption={t(worldWidgetNPCTranslations.labels[type])}
          quantity={characters[type]}
          id={type}
        />
      ))}
    </Card>
  );
};
