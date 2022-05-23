import React, { PropsWithChildren, ReactElement } from 'react';
import { Modal, Pressable, View } from 'react-native';

import { Divider } from '../Divider/Divider';
import { Flex } from '../Flex/Flex';
import { DrawerProps } from '../interface';
import { Typography } from '../Typography/Typography';

import { DRAWER_CAPTION_MARGIN } from './constants';
import { DRAWER_STYLES } from './style';

export const Drawer = (props: PropsWithChildren<DrawerProps>): ReactElement => {
  const { isOpen = false, onClose, children, caption } = props;

  return (
    <Modal onDismiss={onClose} animationType="slide" visible={isOpen} transparent>
      <Pressable onPress={onClose} testID="drawer-close-section">
        <Divider verticalGap={20} />
      </Pressable>

      <Flex styles={DRAWER_STYLES.barContainer} justify="center">
        <View style={DRAWER_STYLES.divider} />
      </Flex>

      <Flex grow={1} direction="column" styles={DRAWER_STYLES.body}>
        <Divider verticalGap={2} />

        <Typography mode="caption-bold" color="accentDarkBlue">
          {caption}
        </Typography>

        <Divider verticalGap={DRAWER_CAPTION_MARGIN} />

        {children}
      </Flex>
    </Modal>
  );
};
