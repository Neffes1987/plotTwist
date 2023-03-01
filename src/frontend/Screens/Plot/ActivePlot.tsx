import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { WorldEnum } from '../../../constants/world.enum';
import { WorldDTO } from '../../../types/entities/world';
import activePlotStore from '../../Stores/ActivePlot.store';
import { UIButton } from '../../UI/Buttons/UIButton';
import { Flex } from '../../UI/Flex/Flex';
import { Typography } from '../../UI/Typography/Typography';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';
import { WorldWidget } from '../../Widgets/WorldWidget/WorldWidget';
import { ROUTES } from '../routes';

export const ActivePlot = observer(
  (): ReactElement => {
    const { t } = useTranslation();
    const { navigate } = useNavigation<Navigation>();
    const isFocused = useIsFocused();

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
      navigate(ROUTES.worldConstructor, { state: { worldType: activePlotStore.nextStep, id: null, plotId: activePlotStore?.plot?.plotData?.id } });
    }

    function onEditWorldHandler(worldType: WorldDTO['type'], id: string): void {
      navigate(ROUTES.worldConstructor, { state: { worldType, id, plotId: activePlotStore?.plot?.plotData?.id } });
    }

    function onNavigateToListHandler(): void {
      navigate(ROUTES.plotList);
    }

    function onOpenPropertyHandler(route: string, worldId: string): void {
      navigate(route, {
        state: {
          id: worldId,
        },
      });
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
                <WorldWidget key={world.worldData.type} worldInfo={world} onEditWorld={onEditWorldHandler} onOpenWorldProperty={onOpenPropertyHandler} />
              ))}

              {activePlotStore.nextStep && <UIButton onPress={onCreateNewWorldHandler}>{t('pages.home.actions.createNextWorld')}</UIButton>}
            </Flex>
          )}
        </Flex>
      </ScreenView>
    );
  },
);
