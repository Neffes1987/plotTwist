import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useIsFocused } from '@react-navigation/native';

import { WorldEnum } from '../../../constants/world.enum';
import { WorldDTO } from '../../../types/entities/world';
import { useAppNavigation } from '../../Hooks/useAppNavigation';
import { UIButton } from '../../UI/Buttons/UIButton';
import { Flex } from '../../UI/Flex/Flex';
import { Typography } from '../../UI/Typography/Typography';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';
import { WorldWidget } from '../../Widgets/WorldWidget/WorldWidget';
import { worldsCharactersStore } from '../Characters/stores/WorldCharacters.store';
import { worldLawsStore } from '../Laws/stores/WorldLaws.store';
import { edgeRewardsStore } from '../Rewards/stores/EdgeRewards.store';
import { ROUTES } from '../routes';
import { edgeTasksStore } from '../Tasks/stores/EdgeTask.store';
import { worldEdgeStore } from '../Tasks/stores/WorldEdge.store';
import { worldWaterholesStore } from '../Waterholes/stores/WorldWaterholes.store';
import { worldsStore } from '../WorldEditor/stores/Worlds.store';

import activePlotStore from './stores/ActivePlot.store';

export const ActivePlot = observer(
  (): ReactElement => {
    const { t } = useTranslation();
    const { navigate, state } = useAppNavigation();
    const isFocused = useIsFocused();

    function getPlot(): void {
      activePlotStore.loadPlot().catch(() => {
        navigate(ROUTES.oops, { state: { error: { key: 'pages.home.errors.cantGetWorlds' } } });
      });
    }

    useEffect(() => {
      const worldId = worldsStore.selectedWorld;

      if (worldId) {
        worldsCharactersStore.list(worldId);
        worldLawsStore.list(worldId);
        worldWaterholesStore.list(worldId);
        worldEdgeStore.list(worldId);
      }
    }, [worldsStore.selectedWorld]);

    useEffect(() => {
      const edgeId = worldEdgeStore.edge?.id;

      if (edgeId) {
        edgeRewardsStore.list(edgeId);
        edgeTasksStore.list(edgeId);
      }
    }, [worldEdgeStore.edge]);

    useEffect(() => {
      const selectedItems = state?.selectedItems;

      if (state?.isBack && selectedItems) {
        const selectedType = selectedItems?.type;
        const selectedIds = selectedItems?.ids;
        const worldId = worldsStore.selectedWorld;

        if (selectedType === 'character') {
          worldsCharactersStore.toggleWorldCharacters(selectedIds, worldId);
        }

        if (selectedType === 'law') {
          worldLawsStore.toggleWorldLaws(selectedIds, worldId);
        }

        if (selectedType === 'waterholes') {
          worldWaterholesStore.toggleWorldWaterholes(selectedIds, worldId);
        }

        if (selectedType === 'task') {
          edgeTasksStore.toggleEdgeTasks(selectedIds, worldEdgeStore.edge?.id);
        }
      }
    }, [state]);

    useEffect(() => {
      if (!isFocused) {
        return;
      }

      getPlot();
    }, [isFocused]);

    useEffect(() => {
      if (!activePlotStore.selectedPlotId) {
        onNavigateToListHandler();
      }

      getPlot();
    }, [activePlotStore.selectedPlotId]);

    useEffect(() => {
      if (activePlotStore.error) {
        navigate(ROUTES.oops, { state: { error: activePlotStore.error } });
      }
    }, []);

    function onCreateNewWorldHandler(): void {
      navigate(ROUTES.worldConstructor, { state: { worldType: activePlotStore.nextStep as WorldEnum, id: null, plotId: activePlotStore?.plot?.plotData?.id } });
    }

    function onEditWorldHandler(worldType: WorldDTO['type'], id: string): void {
      navigate(ROUTES.worldConstructor, { state: { worldType, id, plotId: activePlotStore?.plot?.plotData?.id } });
    }

    function onNavigateToListHandler(): void {
      navigate(ROUTES.plotList);
    }

    return (
      <ScreenView
        header={{
          title: t('pages.home.caption', { name: activePlotStore.plotName }),
          onBackClick: onNavigateToListHandler,
        }}
      >
        <Flex direction="column" flex={1} fullWidth padX={12}>
          {activePlotStore.nextStep === WorldEnum.PlainWorld ? (
            <Flex direction="column" grow={1} align="center" justify="center">
              <Typography align="center">{t('pages.home.messages.greetingMessage')}</Typography>

              <Flex padY={8} />

              <UIButton type="primary" onPress={onCreateNewWorldHandler}>
                {t('pages.home.actions.createFirstWorld')}
              </UIButton>
            </Flex>
          ) : (
            <Flex direction="column" fullWidth>
              {activePlotStore?.plot?.worlds?.map(world => (
                <WorldWidget
                  tasks={edgeTasksStore.tasks}
                  onToggleWorld={(worldId: string): void => worldsStore.setWorldId(worldId)}
                  isOpenWorld={worldsStore.selectedWorld === world?.worldData?.id}
                  laws={worldLawsStore.laws}
                  waterholes={worldWaterholesStore.waterholeDTOS}
                  characters={worldsCharactersStore.characters}
                  edge={worldEdgeStore.edge}
                  rewards={edgeRewardsStore.rewards}
                  key={world.worldData.id}
                  worldInfo={world}
                  onEditWorld={onEditWorldHandler}
                />
              ))}

              {activePlotStore.nextStep && <UIButton onPress={onCreateNewWorldHandler}>{t('pages.home.actions.createNextWorld')}</UIButton>}
            </Flex>
          )}
        </Flex>
      </ScreenView>
    );
  },
);
