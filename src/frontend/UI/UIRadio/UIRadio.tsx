import React, { ReactElement } from 'react';

import { UI_COLORS } from '../colors';
import { Flex } from '../Flex/Flex';
import { Typography } from '../Typography/Typography';

import { UIRadioProps } from './interface';

const InputStyles = {
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: UI_COLORS.accentDarkBlue,
};

export const UIRadio = ({ label, value, onChange, name, error, options }: UIRadioProps): ReactElement => {
  function onInputChanged(value: string): void {
    onChange(name, value);
  }

  return (
    <Flex fullWidth radius={8} marginY={4} direction="column" gap={8} backgroundColor="accentWhite" shadowType="l1">
      <Flex justify="space-between" align="flex-start" fullWidth>
        <Typography mode="caption-medium">{label}</Typography>
      </Flex>

      {options.map(({ id, name }) => (
        <Flex key={id} onPress={(): void => onInputChanged(id)}>
          <Flex radius={100} width={16} />

          <Flex radius={100} styles={InputStyles} width={16} height={16} marginX={4} marginY={4}>
            {value === id && <Flex width={12} height={12} backgroundColor="accentDarkBlue" radius={100} marginX={1} marginY={1} />}
          </Flex>

          <Flex justify="space-between" align="flex-start" fullWidth>
            <Typography mode="caption-medium">{name}</Typography>
          </Flex>

          {!!error && (
            <Typography color="neutralRed" mode="caption-medium">
              {error}
            </Typography>
          )}
        </Flex>
      ))}
    </Flex>
  );
};
