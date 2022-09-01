import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';

import { UI_COLORS } from '../colors';
import { Flex } from '../Flex/Flex';
import { Typography } from '../Typography/Typography';

import { UIInputProps } from './interface';

const InputStyles = {
  width: '100%',
  padding: 10,
  borderBottomColor: UI_COLORS.accentGray,
  borderBottomWidth: 1,
};

export const UIInput = ({ label, value, onChange, name, multiline = true, error, maxValueLength, autoFocus, minValueLength }: UIInputProps): ReactElement => {
  const { t } = useTranslation();

  function validateValueLength(value: string): boolean {
    if (!maxValueLength) {
      return true;
    }

    return value.length < maxValueLength;
  }

  function onInputChanged(value: string): void {
    if (!validateValueLength(value)) {
      return;
    }

    onChange(name, value);
  }

  return (
    <Flex fullWidth radius={8} marginY={4} direction="column" gap={8} backgroundColor="accentWhite" shadowType="l1">
      <Flex justify="space-between" align="flex-start" fullWidth>
        <Flex flex={3}>
          <Typography mode="caption-medium">{label}</Typography>
        </Flex>

        {maxValueLength && (
          <Flex flex={1} justify="flex-end">
            <Typography mode="caption-medium" color={!validateValueLength(value) ? 'neutralRed' : undefined}>
              {`(${value.length}/${maxValueLength})`}
            </Typography>
          </Flex>
        )}
      </Flex>

      <TextInput autoFocus={autoFocus} testID={`input-${name}`} value={value} onChangeText={onInputChanged} multiline={multiline} style={InputStyles} />

      {!!error && (
        <Typography color="neutralRed" mode="caption-medium">
          {error}
        </Typography>
      )}

      {!!minValueLength && !error && (
        <Typography mode="caption-medium" color="accentGray">
          {t('messages.minimalRequiredValue', { quantity: minValueLength })}
        </Typography>
      )}
    </Flex>
  );
};
