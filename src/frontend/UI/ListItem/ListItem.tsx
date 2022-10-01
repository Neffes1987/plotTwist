import React, { ReactElement } from 'react';

import { IconButton } from '../Buttons/IconButton';
import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography/Typography';

import { ICON_SIZE } from './constants';
import { ListItemProps } from './interface';

export const ListItem = (props: ListItemProps): ReactElement => {
  const { caption, onEdit, propertyId, noBorder, onOpen, icon = 'pencil', selected } = props;

  function onListItemPressedHandler(): void {
    onOpen(propertyId);
  }

  function onEditItemPressedHandler(): void {
    onEdit?.(propertyId);
  }

  return (
    <Card color="accentWhite" bordered={!noBorder}>
      <Flex onPress={onListItemPressedHandler}>
        {selected ? <Icon type="tick" size={ICON_SIZE} color="primary" /> : <Flex width={ICON_SIZE} />}

        <Flex flex={2}>
          <Typography color="accentDarkBlue" mode="caption-bold">
            {caption}
          </Typography>
        </Flex>

        {!!onEdit && <IconButton size={ICON_SIZE} iconType={icon} onPress={onEditItemPressedHandler} />}
      </Flex>
    </Card>
  );
};
