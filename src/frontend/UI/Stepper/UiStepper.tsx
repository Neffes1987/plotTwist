import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UIButton } from '../Buttons/UIButton';
import { Flex } from '../Flex/Flex';
import { UIInput } from '../UIInput/UIInput';
import { UIRadio } from '../UIRadio/UIRadio';

import { UIStepperProps } from './interface';

export function UIStepper<T>(props: UIStepperProps<T>): JSX.Element {
  const { errors, currentStep = 0, list, values, onChangeValue, isError } = props;
  const [activeStepIndex, setActiveStepIndex] = useState(currentStep);
  const item = list[activeStepIndex] ?? {};
  const { name, label, type } = item;
  const { t } = useTranslation();

  useEffect(() => {
    setActiveStepIndex(currentStep);
  }, [currentStep]);

  useEffect(() => {
    if (isError) {
      setActiveStepIndex(Object.values(errors).findIndex(value => !!value));
    }
  }, [isError]);

  function onChangeStepHandler(fieldName: string, value: string): void {
    onChangeValue(fieldName, value);

    if (type === 'list') {
      onNextStep();
    }
  }

  function onNextStep(): void {
    if (activeStepIndex < list?.length - 1) {
      setActiveStepIndex(index => index + 1);
    }
  }

  function onPrevStep(): void {
    setActiveStepIndex(index => index - 1);
  }

  return (
    <Flex fullWidth direction="column" shadowType="l1" backgroundColor="accentWhite" radius={8} padY={8} marginY={8}>
      {item.type === 'text' && (
        <UIInput
          autoFocus
          keyboardType={item.keyboardType}
          label={t(label)}
          error={errors?.[name] as string}
          value={values?.[name] ?? ''}
          onChange={onChangeStepHandler}
          name={name as string}
          maxValueLength={item.maxValueLength}
          minValueLength={item.minValueLength}
        />
      )}

      {item.type === 'list' && (
        <UIRadio
          options={item.options}
          label={t(label)}
          name={name as string}
          error={errors?.[name] as string}
          value={values?.[name] ?? ''}
          onChange={onChangeStepHandler}
        />
      )}

      <Flex fullWidth justify="space-between" padX={16} padY={8}>
        {activeStepIndex > 0 ? <UIButton onPress={onPrevStep}>Назад</UIButton> : <Flex />}

        {activeStepIndex < list?.length - 1 ? <UIButton onPress={onNextStep}>Вперед</UIButton> : <Flex />}
      </Flex>
    </Flex>
  );
}
