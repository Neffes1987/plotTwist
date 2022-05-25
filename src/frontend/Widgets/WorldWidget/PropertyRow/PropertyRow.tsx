import React, { ReactElement } from 'react';

import { Flex } from '../../../UI/Flex/Flex';
import { Icon } from '../../../UI/Icon/Icon';
import { Typography } from '../../../UI/Typography/Typography';
import { PropertyRowProps } from '../interface';

export const PropertyRow = (props: PropertyRowProps): ReactElement => {
  const { caption, onPress, quantity, id } = props;

  return (
    <Flex justify="flex-start" gapY={2}>
      <Icon type="chevron" rotate={180} />

      <Flex onPress={(): void => onPress(id)}>
        <Typography>{caption}</Typography>
      </Flex>

      {quantity && <Typography>{quantity}</Typography>}
    </Flex>
  );
};
