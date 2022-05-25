import React, { PropsWithChildren, ReactElement, useState } from 'react';

import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography/Typography';

import { AccordionProps } from './interface';

export const Accordion = (props: PropsWithChildren<AccordionProps>): ReactElement => {
  const { caption, expanded = false, children } = props;
  const [isOpen, setIsOpen] = useState(expanded);

  return (
    <Card>
      <Flex onPress={(): void => setIsOpen((prevState: boolean) => !prevState)}>
        <Flex>
          <Typography mode="caption-bold" color="accentGray">
            {caption}
          </Typography>
        </Flex>

        <Icon type="chevron" rotate={isOpen ? 90 : -90} />
      </Flex>

      {isOpen && children}
    </Card>
  );
};
