import React from 'react';

import { IconButton } from '../../UI/Buttons/IconButton';
import { Drawer } from '../../UI/Drawer/Drawer';
import { Flex } from '../../UI/Flex/Flex';
import { Typography } from '../../UI/Typography/Typography';

import { CreateEntityWidgetProps } from './interface';

export const CreateEntityWidget = (props: CreateEntityWidgetProps): JSX.Element => {
  const { children, caption, isOpen, onClose, onApply, onDelete } = props;

  return (
    <Drawer
      caption={
        <Flex justify="space-between" fullWidth gapX={4}>
          {!!onDelete && <IconButton iconType="close" size={28} color="accentDarkBlue" onPress={onDelete} />}

          <Typography>{caption}</Typography>

          <IconButton size={28} iconType="tick" color="accentDarkBlue" onPress={onApply} />
        </Flex>
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      {children}
    </Drawer>
  );
};
