import React, { ReactElement } from 'react';

import { IconButton } from '../Buttons/IconButton';
import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography/Typography';

import { ICON_SIZE } from './constants';
import { ListItemProps } from './interface';

export const ListItem = (props: ListItemProps): ReactElement => {
  const { caption, onEdit, onDelete, propertyId, noBorder, onOpen, icon = 'pencil', selected, customIcon } = props;

  function onListItemPressedHandler(): void {
    onOpen?.(propertyId);
  }

  function onEditItemPressedHandler(): void {
    onEdit?.(propertyId);
  }

  function onDeleteItemPressedHandler(): void {
    onDelete?.(propertyId);
  }

  return (
    <Card color="accentWhite" bordered={!noBorder}>
      <Flex onPress={onListItemPressedHandler} padX={4} align="center">
        {!!customIcon && <IconButton size={ICON_SIZE} iconType={customIcon} />}

        <Flex flex={2} marginX={4}>
          <Typography color="accentDarkBlue" mode="body-bold">
            {caption}
          </Typography>
        </Flex>

        {selected ? <Icon type="tick" size={ICON_SIZE} color="primary" /> : <Flex width={selected !== undefined ? ICON_SIZE : 8} />}

        {!!onEdit && <IconButton size={ICON_SIZE} iconType={icon} onPress={onEditItemPressedHandler} />}

        {!!onDelete && <IconButton size={ICON_SIZE} iconType="close" onPress={onDeleteItemPressedHandler} />}
      </Flex>
    </Card>
  );
};
