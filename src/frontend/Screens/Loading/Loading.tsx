import React, { ReactElement, useEffect } from 'react';
import { observer } from 'mobx-react';

import { useAppNavigation } from '../../Hooks/useAppNavigation';
import { Flex } from '../../UI/Flex/Flex';
import { Icon } from '../../UI/Icon/Icon';
import { Spinner } from '../../UI/Spinner/Spinner';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';
import { ROUTES } from '../routes';

import { LOGO_CONTAINER_STYLES, LOGO_SIZE } from './constants';

export const Loading = observer(
  (): ReactElement => {
    const { navigate } = useAppNavigation();

    useEffect(() => {
      navigate(ROUTES.home);
    }, []);

    return (
      <ScreenView bgColor="primary">
        <Flex fullHeight direction="column" align="center" justify="center" fullWidth>
          <Flex>
            <Flex styles={LOGO_CONTAINER_STYLES} backgroundColor="accentWhite" justify="center" align="center">
              <Icon type="logo" size={LOGO_SIZE} />
            </Flex>
          </Flex>

          <Flex>
            <Spinner />
          </Flex>
        </Flex>
      </ScreenView>
    );
  },
);
