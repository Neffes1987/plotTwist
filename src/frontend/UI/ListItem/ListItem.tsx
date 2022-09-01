import React, { ReactElement } from 'react';

import { IconButton } from '../Buttons/IconButton';
import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { Typography } from '../Typography/Typography';

import { ListItemProps } from './interface';

export const ListItem = (props: ListItemProps): ReactElement => {
  const { caption, onEdit, propertyId, noBorder, onOpen, icon = 'pencil' } = props;

  function onListItemPressedHandler(): void {
    onOpen(propertyId);
  }

  function onEditItemPressedHandler(): void {
    onEdit?.(propertyId);
  }

  return (
    <Card color="accentWhite" bordered={!noBorder}>
      <Flex onPress={onListItemPressedHandler}>
        <Flex fullWidth>
          <Typography color="accentDarkBlue" mode="caption-bold">
            {caption}
          </Typography>
        </Flex>

        {!!onEdit && <IconButton size={32} iconType={icon} onPress={onEditItemPressedHandler} />}
      </Flex>
    </Card>
  );
};
