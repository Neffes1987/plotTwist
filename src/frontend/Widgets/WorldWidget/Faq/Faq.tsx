import React from 'react';

import { Flex } from '../../../UI/Flex/Flex';
import { WorldWidgetProps } from '../interface';

import { GeneralFields } from './GeneralFields';

export const Faq = (props: Pick<WorldWidgetProps, 'worldInfo'>): JSX.Element => {
  const { worldInfo } = props;

  return (
    <Flex testID="faq-block">
      <GeneralFields worldInfo={worldInfo} />
    </Flex>
  );
};
