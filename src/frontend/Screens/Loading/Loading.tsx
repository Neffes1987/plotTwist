import React, { ReactElement, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Flex } from '../../UI/Flex/Flex';
import { Icon } from '../../UI/Icon/Icon';
import { Spinner } from '../../UI/Spinner/Spinner';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';
import { ROUTES } from '../routes';

import { LOGO_CONTAINER_STYLES, LOGO_SIZE } from './constants';

export const Loading = (): ReactElement => {
  const { navigate } = useNavigation<Navigation>();

  useEffect(() => {
    navigate(ROUTES.home);
  }, []);

  return (
    <ScreenView>
      <Flex direction="column" styles={{ height: Dimensions.get('window').height }} backgroundColor="primary">
        <Flex grow={1} />

        <Flex backgroundColor="accentWhite" justify="center" align="center" styles={LOGO_CONTAINER_STYLES}>
          <Icon type="logo" size={LOGO_SIZE} />
        </Flex>

        <Flex grow={1}>
          <Spinner />
        </Flex>
      </Flex>
    </ScreenView>
  );
};
