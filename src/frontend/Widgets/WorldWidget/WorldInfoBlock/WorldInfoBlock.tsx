import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '../../../UI/Card/Card';
import { WorldWidgetProps } from '../interface';
import { PropertyRow } from '../parts/PropertyRow/PropertyRow';
import { worldWidgetInfoTranslations } from '../worldWidgetTranslations';

export const WorldInfoBlock = ({ onOpenWorldProperty, worldInfo }: Pick<WorldWidgetProps, 'onOpenWorldProperty' | 'worldInfo'>): JSX.Element => {
  const { t } = useTranslation();
  const { laws, waterholes } = worldInfo;
  const lawsQuantity = laws?.length ?? 0;
  const brokenLawsQuantity = laws?.filter(({ isBroken }) => isBroken).length ?? 0;
  const waterholesQuantity = waterholes?.length ?? 0;

  return (
    <Card title={t(worldWidgetInfoTranslations.caption)} flex={1} height="100%" align="flex-start" testID="world-info-block">
      <PropertyRow
        showAlert={!lawsQuantity}
        onPress={onOpenWorldProperty}
        caption={t(worldWidgetInfoTranslations.labels.brokenLaws)}
        quantity={`${brokenLawsQuantity}/${lawsQuantity}`}
        id="brokenLaws"
      />

      <PropertyRow onPress={onOpenWorldProperty} caption={t(worldWidgetInfoTranslations.labels.activeCalls)} quantity={`${0}/${0}`} id="activeCalls" />

      <PropertyRow
        showAlert={!waterholesQuantity}
        onPress={onOpenWorldProperty}
        caption={t(worldWidgetInfoTranslations.labels.waterholes)}
        quantity={`${waterholesQuantity}`}
        id="waterholes"
      />

      <PropertyRow onPress={onOpenWorldProperty} caption={t(worldWidgetInfoTranslations.labels.aboutWorld)} id="aboutWorld" />
    </Card>
  );
};
