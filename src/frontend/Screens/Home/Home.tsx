import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { WorldDTO } from 'backend';
import { observer } from 'mobx-react';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { UIButton } from '../../UI/Buttons/UIButton';
import { Flex } from '../../UI/Flex/Flex';
import { Typography } from '../../UI/Typography/Typography';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';
import { WorldWidget } from '../../Widgets/WorldWidget/WorldWidget';
import { ROUTES } from '../routes';

import homeData from './HomeStore';

export const Home = observer(
  (): ReactElement => {
    const { t } = useTranslation();
    const { navigate } = useNavigation<Navigation>();
    const { selectedPlot, plotName, nextStep, worlds } = homeData;
    const isFocused = useIsFocused();

    function getPlot(): void {
      homeData.getPlot().catch(() => {
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
      getPlot();
    }, [selectedPlot]);

    useEffect(() => {
      if (homeData.error) {
        navigate(ROUTES.oops, { state: { error: homeData.error } });

        return;
      }

      if (homeData.isPlotLoaded === false) {
        onNavigateToListHandler();
      }
    }, [homeData.isPlotLoaded]);

    function onCreateNewWorldHandler(): void {
      navigate(ROUTES.worldConstructor, { state: { caption: nextStep, id: null } });
    }

    function onEditWorldHandler(worldType: WorldDTO['type'], id: string): void {
      navigate(ROUTES.worldConstructor, { state: { caption: worldType, id } });
    }

    function onNavigateToListHandler(): void {
      navigate(ROUTES.plotList);
    }

    function onOpenPropertyHandler(route: string): void {
      navigate(route);
    }

    return (
      <ScreenView
        header={{
          title: t('pages.home.caption', { name: plotName }),
          onBackClick: onNavigateToListHandler,
        }}
      >
        <Flex direction="column" flex={1}>
          {nextStep === 'plainWorld' ? (
            <Flex direction="column" grow={1} align="center" justify="center">
              <Typography align="center">{t('pages.home.messages.greetingMessage')}</Typography>

              <Flex gapY={8} />

              <UIButton type="primary" onPress={onCreateNewWorldHandler}>
                {t('pages.home.actions.createFirstWorld')}
              </UIButton>
            </Flex>
          ) : (
            <Flex direction="column" fullWidth>
              {worlds.map(world => (
                <WorldWidget key={world.type} worldInfo={world} onEditWorld={onEditWorldHandler} onOpenWorldProperty={onOpenPropertyHandler} />
              ))}

              {nextStep && <UIButton onPress={onCreateNewWorldHandler}>{t('pages.home.actions.createNextWorld')}</UIButton>}
            </Flex>
          )}
        </Flex>
      </ScreenView>
    );
  },
);
