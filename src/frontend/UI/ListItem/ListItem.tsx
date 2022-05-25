import React, { ReactElement } from 'react';

import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { Typography } from '../Typography/Typography';

import { ListItemProps } from './interface';

export const ListItem = (props: ListItemProps): ReactElement => {
  const { caption, onPress, propertyId, noBorder, icon = null } = props;

  function onListItemPressedHandler(): void {
    onPress(propertyId);
  }

  return (
    <Card color="accentWhite" bordered={!noBorder}>
      <Flex onPress={onListItemPressedHandler}>
        <Flex>
          <Typography color="accentDarkBlue" mode="caption-bold">
            {caption}
          </Typography>
        </Flex>

        {icon}
      </Flex>
    </Card>
  );
};
