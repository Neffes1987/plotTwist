import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useIsFocused } from '@react-navigation/native';

import { CharacterEnum } from '../../../constants/character.enum';
import { WorldEnum } from '../../../constants/world.enum';
import { WorldDTO } from '../../../types/entities/world';
import { useAppNavigation } from '../../Hooks/useAppNavigation';
import activePlotStore from '../../Stores/ActivePlot.store';
import { UIButton } from '../../UI/Buttons/UIButton';
import { Flex } from '../../UI/Flex/Flex';
import { Typography } from '../../UI/Typography/Typography';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';
import { PropertyProps } from '../../Widgets/WorldWidget/interface';
import { WorldWidget } from '../../Widgets/WorldWidget/WorldWidget';
import { ROUTES } from '../routes';

export const ActivePlot = observer(
  (): ReactElement => {
    const { t } = useTranslation();
    const { navigate, state } = useAppNavigation();
    const isFocused = useIsFocused();

    console.log(state);

    function getPlot(): void {
      activePlotStore.loadPlot().catch(() => {
        navigate(ROUTES.oops, { state: { error: { key: 'pages.home.errors.cantGetWorlds' } } });
      });
    }

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

    function onOpenPropertyHandler(options: PropertyProps): void {
      const { type, id, parentId } = options;

      if (type === 'world') {
        navigate(id, {
          state: {
            id: parentId,
          },
        });
      }

      if (type === 'npc' && id) {
        navigate(ROUTES.characters, {
          state: {
            characterType: id as CharacterEnum,
            selectable: true,
          },
        });
      }

      if (type === 'reward') {
        navigate(ROUTES.rewards, {
          state: {
            worldId: parentId,
          },
        });
      }

      if (type === 'edge') {
        navigate(ROUTES.rewards, {
          state: {
            edgeType: id,
            worldId: parentId,
          },
        });
      }
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
                <WorldWidget key={world.worldData.id} worldInfo={world} onEditWorld={onEditWorldHandler} onOpenWorldProperty={onOpenPropertyHandler} />
              ))}

              {activePlotStore.nextStep && <UIButton onPress={onCreateNewWorldHandler}>{t('pages.home.actions.createNextWorld')}</UIButton>}
            </Flex>
          )}
        </Flex>
      </ScreenView>
    );
  },
);
