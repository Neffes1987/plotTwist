import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../../Screens/routes';
import { Card } from '../../../UI/Card/Card';
import { WorldWidgetProps } from '../interface';
import { PropertyRow } from '../parts/PropertyRow/PropertyRow';
import { worldWidgetInfoTranslations } from '../worldWidgetTranslations';

export const WorldInfoBlock = ({ onOpenWorldProperty, worldInfo }: Pick<WorldWidgetProps, 'onOpenWorldProperty' | 'worldInfo'>): JSX.Element => {
  const { t } = useTranslation();
  const { laws, worldData, waterholes } = worldInfo;
  const lawsQuantity = laws?.length ?? 0;
  const brokenLawsQuantity = useMemo(() => laws?.filter(({ isBroken }) => isBroken).length ?? 0, [laws]);
  const waterholesQuantity = waterholes?.length ?? 0;

  function handlePressProperty(id: string): void {
    onOpenWorldProperty(id, worldData.id);
  }

  return (
    <Card title={t(worldWidgetInfoTranslations.caption)} flex={1} height="100%" align="flex-start" testID="world-info-block">
      <PropertyRow
        showAlert={!!0}
        onPress={handlePressProperty}
        caption={t(worldWidgetInfoTranslations.labels.brokenLaws)}
        quantity={`${brokenLawsQuantity}/${lawsQuantity}`}
        id={ROUTES.laws}
      />

      <PropertyRow onPress={handlePressProperty} caption={t(worldWidgetInfoTranslations.labels.activeCalls)} quantity={`${0}/${0}`} id={ROUTES.activeCalls} />

      <PropertyRow
        showAlert={!waterholesQuantity}
        onPress={handlePressProperty}
        caption={t(worldWidgetInfoTranslations.labels.waterholes)}
        quantity={`${waterholesQuantity}`}
        id={ROUTES.waterholes}
      />

      <PropertyRow onPress={handlePressProperty} caption={t(worldWidgetInfoTranslations.labels.aboutWorld)} id={ROUTES.aboutWorld} />
    </Card>
  );
};
