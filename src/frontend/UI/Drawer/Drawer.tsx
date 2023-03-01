import React, { PropsWithChildren, ReactElement } from 'react';
import { Modal, View } from 'react-native';

import { Divider } from '../Divider/Divider';
import { Flex } from '../Flex/Flex';
import { DrawerProps } from '../interface';
import { Typography } from '../Typography/Typography';

import { DRAWER_CAPTION_MARGIN, DRAWER_OVERLAY } from './constants';
import { DRAWER_STYLES } from './style';

export const Drawer = (props: PropsWithChildren<DrawerProps>): ReactElement => {
  const { isOpen = false, onClose, children, caption } = props;

  return (
    <Modal onDismiss={onClose} animationType="slide" visible={isOpen} transparent>
      <Flex grow={33} onPress={onClose} testID="drawer-close-section" styles={DRAWER_OVERLAY} />

      <Flex shrink={1} direction="column" styles={DRAWER_STYLES.body}>
        <Flex styles={DRAWER_STYLES.barContainer} justify="center">
          <View style={DRAWER_STYLES.divider} />
        </Flex>

        <Divider verticalGap={2} />

        {typeof caption === 'string' ? (
          <Typography mode="caption-bold" color="accentDarkBlue">
            {caption}
          </Typography>
        ) : (
          caption
        )}

        <Divider verticalGap={DRAWER_CAPTION_MARGIN} />

        <Flex marginX="1%" width="98%" direction="column">
          {children}
        </Flex>

        <Divider verticalGap={DRAWER_CAPTION_MARGIN} />
      </Flex>
    </Modal>
  );
};
