import React, { ReactElement } from 'react';
import { observer } from 'mobx-react';

import { homeButtons, homeTranslations } from '../../App/initI18n/schemas/homeTranslations';
import { useAppNavigation } from '../../Hooks/useAppNavigation';
import { CommonListView } from '../../Widgets/CommonListView/CommonListView';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';

export const Home = observer(
  (): ReactElement => {
    const { navigate } = useAppNavigation();

    return (
      <ScreenView header={{ title: homeTranslations.caption }}>
        <CommonListView title="" list={homeButtons} onOpen={navigate} />
      </ScreenView>
    );
  },
);
