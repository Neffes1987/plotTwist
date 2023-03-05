import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../../Screens/routes';
import { Card } from '../../../UI/Card/Card';
import { WorldWidgetProps } from '../interface';
import { PropertyRow } from '../parts/PropertyRow/PropertyRow';
import { worldWidgetEdgeTranslations } from '../worldWidgetTranslations';

export const EdgeBlock = ({ onOpenWorldProperty, worldInfo }: Pick<WorldWidgetProps, 'onOpenWorldProperty' | 'worldInfo'>): JSX.Element => {
  const { t } = useTranslation();

  function handleOpenAboutProperty(id: string): void {
    onOpenWorldProperty({
      parentId: edge.id,
      id,
      type: 'edge',
    });
  }

  function handleOpenRewardsProperty(id: string): void {
    onOpenWorldProperty({
      parentId: edge.id,
      id,
      type: 'reward',
    });
  }

  const { edge } = worldInfo;

  const listRewards = edge?.rewards ?? [];
  const achievedRewards = listRewards.filter((reward: RewardInEdgeDTO) => reward.isAssigned);

  return (
    <Card title={t(worldWidgetEdgeTranslations.caption)} align="flex-start" fullWidth testID="edge-block">
      <PropertyRow showAlert={!edge?.id} onPress={handleOpenAboutProperty} caption={t(worldWidgetEdgeTranslations.caption)} id={ROUTES.aboutEdge} />

      {!!edge?.id && (
        <>
          <PropertyRow
            onPress={handleOpenRewardsProperty}
            quantity={`${achievedRewards?.length}/${listRewards?.length}`}
            caption={t(worldWidgetEdgeTranslations.labels.rewards)}
            showAlert={!listRewards?.length}
            id={ROUTES.rewards}
          />

          {!!listRewards?.length && (
            <PropertyRow
              onPress={handleOpenRewardsProperty}
              quantity={edge.tasks?.length ?? '0'}
              caption={t(worldWidgetEdgeTranslations.labels.activeChallenges)}
              showAlert={!edge.tasks?.length}
              id={ROUTES.activeChallenges}
            />
          )}

          {!!edge.tasks?.length && (
            <>
              <PropertyRow
                onPress={handleOpenRewardsProperty}
                quantity={`${0}/${0}`}
                caption={t(worldWidgetEdgeTranslations.labels.passedChallenges)}
                id={ROUTES.passedChallenges}
              />

              <PropertyRow
                onPress={handleOpenRewardsProperty}
                quantity={`${0}/${0}`}
                caption={t(worldWidgetEdgeTranslations.labels.failedChallenges)}
                id={ROUTES.failedChallenges}
              />
            </>
          )}
        </>
      )}
    </Card>
  );
};
