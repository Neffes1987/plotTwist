import React from 'react';

import { Flex } from '../Flex/Flex';
import { Typography } from '../Typography/Typography';

import { TagProps } from './interface';

export const Tag = (props: TagProps): JSX.Element => {
  const { margin, text, color = 'accentGray', textColor = 'accentWhite', size = 'caption-medium' } = props;

  return (
    <Flex backgroundColor={color} radius={30} padY={4} padX={8} marginY={margin} marginX={margin}>
      <Typography mode={size} color={textColor}>
        {text}
      </Typography>
    </Flex>
  );
};
