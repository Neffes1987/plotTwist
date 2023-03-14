import React, { ReactElement } from 'react';

import { Flex } from '../../../../UI/Flex/Flex';
import { Icon } from '../../../../UI/Icon/Icon';
import { Typography } from '../../../../UI/Typography/Typography';
import { PropertyRowProps } from '../../interface';

export const PropertyRow = (props: PropertyRowProps): ReactElement => {
  const { caption, onPress, quantity, id, showAlert, ...rest } = props;

  return (
    <Flex padY={2} justify="space-between">
      <Flex justify="flex-start" flex={1}>
        <Icon type="chevron" rotate={180} />

        <Flex onPress={(): void => onPress?.(id)}>
          <Typography mode="caption-medium" {...rest}>
            {caption}
          </Typography>
        </Flex>
      </Flex>

      {!!quantity && !showAlert && (
        <Typography mode="caption-medium" {...rest}>
          {quantity}
        </Typography>
      )}

      {showAlert && <Icon type="attention" color="neutralRed" />}
    </Flex>
  );
};
