import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '../../../UI/Card/Card';
import { WorldWidgetProps } from '../interface';
import { PropertyRow } from '../parts/PropertyRow/PropertyRow';
import { worldWidgetInfoTranslations } from '../worldWidgetTranslations';

export const WorldInfoBlock = ({ onOpenWorldProperty }: Pick<WorldWidgetProps, 'onOpenWorldProperty'>): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Card title={t(worldWidgetInfoTranslations.caption)} flex={1} height="100%" align="flex-start" testID="world-info-block">
      <PropertyRow onPress={onOpenWorldProperty} caption={t(worldWidgetInfoTranslations.labels.brokenLaws)} quantity={`${0}/${0}`} id="brokenLaws" />

      <PropertyRow onPress={onOpenWorldProperty} caption={t(worldWidgetInfoTranslations.labels.activeCalls)} quantity={`${0}/${0}`} id="activeCalls" />

      <PropertyRow onPress={onOpenWorldProperty} caption={t(worldWidgetInfoTranslations.labels.waterholes)} quantity={`${0}`} id="waterholes" />

      <PropertyRow onPress={onOpenWorldProperty} caption={t(worldWidgetInfoTranslations.labels.aboutWorld)} id="aboutWorld" />
    </Card>
  );
};
