import React, { ReactElement } from 'react';
import { TextInput } from 'react-native';

import { Flex } from '../../UI/Flex/Flex';
import { Typography } from '../../UI/Typography/Typography';

import { TextAreaProps } from './interface';
import { styles } from './styles';

export const TextArea = (props: TextAreaProps): ReactElement => {
  const { title, maxLength, value, onValueChanged, placeholder } = props;

  function onTextInputChanged(newValue: string): void {
    if (!maxLength) {
      onValueChanged(newValue);

      return;
    }

    if (newValue.length <= maxLength) {
      onValueChanged(newValue);
    }
  }

  return (
    <Flex direction="column" gap={8} backgroundColor="accentLightGray" styles={styles.container}>
      <Flex justify="space-between">
        <Flex>
          <Typography mode="caption-bold" color="accentGray">
            {title}
          </Typography>
        </Flex>

        {maxLength && (
          <Typography mode="caption-bold" color="accentGray">
            {`(${value.length}/${maxLength})`}
          </Typography>
        )}
      </Flex>

      <TextInput
        placeholder={placeholder}
        maxLength={maxLength}
        multiline
        style={styles.textarea}
        testID="text-area-input"
        value={value}
        onChangeText={onTextInputChanged}
      />
    </Flex>
  );
};
