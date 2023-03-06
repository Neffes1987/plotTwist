import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { WorldEnum } from '../../../../constants/world.enum';
import { useAppNavigation } from '../../../Hooks/useAppNavigation';
import { ROUTES } from '../../../Screens/routes';
import { Card } from '../../../UI/Card/Card';
import { WorldWidgetProps } from '../interface';
import { PropertyRow } from '../parts/PropertyRow/PropertyRow';
import { worldWidgetEdgeTranslations } from '../worldWidgetTranslations';

export const EdgeBlock = ({
  edge,
  worldType,
  rewards,
  tasks,
}: Pick<WorldWidgetProps, 'edge' | 'rewards' | 'tasks'> & { worldType: WorldEnum }): JSX.Element => {
  const { t } = useTranslation();
  const { navigate } = useAppNavigation();

  function handleOpenAboutProperty(): void {
    navigate(ROUTES.tasks, {
      state: {
        edgeType: worldType === WorldEnum.HiddenCaveWorld ? 'mainEdge' : 'edge',
        selectable: true,
        selectedItems: {
          single: true,
          ids: edge ? [edge.id] : [],
          type: 'edge',
        },
      },
    });
  }

  function handleOpenRewardsProperty(): void {
    navigate(ROUTES.rewards, {
      state: {
        selectable: true,
        selectedItems: {
          ids: rewards.map(({ id }) => id),
          type: 'reward',
        },
      },
    });
  }

  function handleOpenTasksProperty(): void {
    navigate(ROUTES.tasks, {
      state: {
        edgeType: 'task',
        selectable: true,
        selectedItems: {
          ids: tasks.map(({ id }) => id),
          type: 'task',
        },
      },
    });
  }

  const achievedRewards = useMemo(() => {
    let result = 0;

    rewards.forEach(({ isAchieved }) => {
      if (isAchieved) {
        result += 1;
      }
    });

    return result;
  }, [rewards]);

  const taskLength = tasks?.length ?? 0;

  return (
    <Card title={t(worldWidgetEdgeTranslations.caption)} align="flex-start" fullWidth testID="edge-block">
      <PropertyRow showAlert={!edge?.id} onPress={handleOpenAboutProperty} caption={t(worldWidgetEdgeTranslations.caption)} id="tasks" />

      {!!edge?.id && (
        <>
          <PropertyRow
            onPress={handleOpenRewardsProperty}
            quantity={`${achievedRewards}/${rewards?.length}`}
            caption={t(worldWidgetEdgeTranslations.labels.rewards)}
            showAlert={!rewards?.length}
            id="rewards"
          />

          {!!rewards?.length && (
            <PropertyRow
              onPress={handleOpenTasksProperty}
              quantity={taskLength.toString()}
              caption={t(worldWidgetEdgeTranslations.labels.activeChallenges)}
              showAlert={!taskLength}
              id="activeChallenges"
            />
          )}
        </>
      )}
    </Card>
  );
};
