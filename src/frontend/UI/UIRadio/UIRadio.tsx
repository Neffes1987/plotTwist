import React, { ReactElement } from 'react';

import { Flex } from '../Flex/Flex';
import { Typography } from '../Typography/Typography';
import { UIList } from '../UIList/UIList';

import { UIRadioProps } from './interface';

export const UIRadio = ({ label, value, onChange, name, error, options }: UIRadioProps): ReactElement => {
  function onInputChanged(value: string): void {
    onChange(name, value);
  }

  return (
    <Flex align="flex-start" direction="column" pad={8} fullWidth>
      <Typography mode="caption-medium">{label}</Typography>

      <UIList selected={value} list={options} onOpen={onInputChanged} />

      {!!error && (
        <Typography color="neutralRed" mode="caption-medium">
          {error}
        </Typography>
      )}
    </Flex>
  );
};
