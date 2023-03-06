import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppNavigation } from '../../../Hooks/useAppNavigation';
import { worldLawsStore } from '../../../Screens/Laws/stores/WorldLaws.store';
import { ROUTES } from '../../../Screens/routes';
import { worldWaterholesStore } from '../../../Screens/Waterholes/stores/WorldWaterholes.store';
import { Card } from '../../../UI/Card/Card';
import { WorldWidgetProps } from '../interface';
import { PropertyRow } from '../parts/PropertyRow/PropertyRow';
import { worldWidgetInfoTranslations } from '../worldWidgetTranslations';

export const WorldInfoBlock = ({ worldInfo, laws, waterholes }: Pick<WorldWidgetProps, 'worldInfo' | 'laws' | 'waterholes'>): JSX.Element => {
  const { t } = useTranslation();
  const { worldData } = worldInfo;
  const { navigate } = useAppNavigation();

  const lawsQuantity = laws?.length ?? 0;
  const brokenLawsQuantity = useMemo(() => laws?.filter(({ isBroken }) => isBroken).length ?? 0, [laws]);
  const waterholesQuantity = waterholes?.length ?? 0;

  function handlePressProperty(): void {
    navigate(ROUTES.aboutWorld, {
      state: {
        worldId: worldData?.id ?? '',
      },
    });
  }

  function handlePressLaws(): void {
    navigate(ROUTES.laws, {
      state: {
        selectable: true,
        selectedItems: {
          ids: worldLawsStore.laws.map(({ id }) => id),
          type: 'law',
        },
      },
    });
  }

  function handlePressWaterholes(): void {
    navigate(ROUTES.waterholes, {
      state: {
        selectable: true,
        selectedItems: {
          ids: worldWaterholesStore.waterholeDTOS.map(({ id }) => id),
          type: 'waterholes',
        },
      },
    });
  }

  function handlePressCalls(): void {
    navigate(ROUTES.activeCalls, {
      state: {
        selectable: true,
        selectedItems: {
          ids: worldWaterholesStore.waterholeDTOS.map(({ id }) => id),
          type: 'call',
        },
      },
    });
  }

  return (
    <Card title={t(worldWidgetInfoTranslations.caption)} flex={1} height="100%" align="flex-start" testID="world-info-block">
      <PropertyRow
        showAlert={!!0}
        onPress={handlePressLaws}
        caption={t(worldWidgetInfoTranslations.labels.brokenLaws)}
        quantity={`${brokenLawsQuantity}/${lawsQuantity}`}
        id="laws"
      />

      <PropertyRow onPress={handlePressCalls} caption={t(worldWidgetInfoTranslations.labels.activeCalls)} quantity={`${0}/${0}`} id={ROUTES.activeCalls} />

      <PropertyRow
        showAlert={!waterholesQuantity}
        onPress={handlePressWaterholes}
        caption={t(worldWidgetInfoTranslations.labels.waterholes)}
        quantity={`${waterholesQuantity}`}
        id={ROUTES.waterholes}
      />

      <PropertyRow onPress={handlePressProperty} caption={t(worldWidgetInfoTranslations.labels.aboutWorld)} id="aboutWorld" />
    </Card>
  );
};
