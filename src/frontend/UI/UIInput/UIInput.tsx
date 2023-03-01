import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, TextInput, TextStyle } from 'react-native';

import { UI_COLORS } from '../colors';
import { Flex } from '../Flex/Flex';
import { Typography } from '../Typography/Typography';

import { UIInputProps } from './interface';

const InputStyles: StyleProp<TextStyle> = {
  alignSelf: 'stretch',
  padding: 10,
  borderBottomColor: UI_COLORS.accentGray,
  color: UI_COLORS.accentDarkBlue,
  borderBottomWidth: 1,
};

export const UIInput = ({
  label,
  value,
  onChange,
  name,
  multiline = true,
  error,
  maxValueLength,
  autoFocus,
  minValueLength,
  keyboardType,
}: UIInputProps): ReactElement => {
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
    <Flex radius={8} marginY={4} direction="column" pad={8}>
      <Flex justify="space-between" align="flex-start">
        <Flex flex={3}>
          <Typography mode="caption-medium">{label}</Typography>
        </Flex>

        {maxValueLength && (
          <Flex flex={1} justify="flex-end">
            <Typography mode="caption-medium" color={!validateValueLength(value as string) ? 'neutralRed' : undefined}>
              {`(${(value as string).length}/${maxValueLength})`}
            </Typography>
          </Flex>
        )}
      </Flex>

      <TextInput
        keyboardType={keyboardType}
        autoFocus={autoFocus}
        testID={`input-${name}`}
        value={value as string}
        onChangeText={onInputChanged}
        multiline={multiline}
        style={InputStyles}
      />

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
