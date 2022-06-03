import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { plotController, PlotInfoResponse, WorldInfo } from '@backend';
import { useNavigation } from '@react-navigation/native';

import notifier from '../../App/notify/notify';
import store from '../../store/Store';
import { UIButton } from '../../UI/Buttons/UIButton';
import { Flex } from '../../UI/Flex/Flex';
import { Typography } from '../../UI/Typography/Typography';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';
import { WorldWidget } from '../../Widgets/WorldWidget/WorldWidget';
import { ROUTES } from '../routes';

export const Home = (): ReactElement => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<Navigation>();
  const [currentPlotInfo, setCurrentPlotInfo] = useState<Nullable<PlotInfoResponse>>();
  const { plot, worlds, characters } = currentPlotInfo ?? {};

  async function getPlot(selectedPlot: string): Promise<void> {
    const plotInfo = await plotController.getPlot(selectedPlot);

    setCurrentPlotInfo(plotInfo);
  }

  useEffect(() => {
    try {
      const selectedPlot = store.settings.currentPlotId;

      if (!selectedPlot) {
        navigate(ROUTES.plotList);
      }

      getPlot(selectedPlot);
    } catch (e) {
      notifier.showMessage(t('errors.oops'), t('pages.home.errors.cantGetWorlds'));
    }
  }, []);

  function onCreateNewWorldHandler(): void {
    navigate(ROUTES.worldConstructor);
  }

  return (
    <ScreenView
      header={{
        title: t('pages.home.caption', { name: plot?.name }),
      }}
    >
      <Flex>
        {!currentPlotInfo?.worlds.length && (
          <Flex>
            <Typography>{t('pages.home.greetingMessage')}</Typography>

            <UIButton onPress={onCreateNewWorldHandler}>{t('pages.home.buttons.createFirstWorld')}</UIButton>
          </Flex>
        )}

        {!!worlds?.length && (
          <Flex>
            {worlds.map((world: WorldInfo) => (
              <WorldWidget key={world.world.id} worldInfo={world} onEditWorld={console.error} onOpenWorldProperty={console.error} characters={characters} />
            ))}

            <UIButton onPress={onCreateNewWorldHandler}>{t('pages.home.buttons.createFirstWorld')}</UIButton>
          </Flex>
        )}
      </Flex>
    </ScreenView>
  );
};
