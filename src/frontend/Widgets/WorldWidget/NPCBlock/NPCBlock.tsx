import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '../../../UI/Card/Card';
import { WorldWidgetProps } from '../interface';
import { PropertyRow } from '../parts/PropertyRow/PropertyRow';

export const NPCBlock = ({ onOpenWorldProperty }: Pick<WorldWidgetProps, 'onOpenWorldProperty'>): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Card title={t('widget.worldWidgetNPC.caption')} flex={1} height="100%" align="flex-start" testID="npc-block">
      {Object.keys([]).map((type: string) => (
        <PropertyRow key={type} onPress={onOpenWorldProperty} caption={t(`widget.worldWidgetNPC.labels.${type}`)} quantity={`${0}`} id="aboutEdge" />
      ))}
    </Card>
  );
};
