import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutChangeEvent, ScrollView } from 'react-native';

import { IconButton } from '../Buttons/IconButton';
import { UIButton } from '../Buttons/UIButton';
import { Flex } from '../Flex/Flex';
import { Typography } from '../Typography/Typography';

import { FULL_STEP_BUBBLE_SIZE, STEP_BUBBLE_MARGIN, STEP_BUBBLE_SIZE } from './constants';
import { UIStepperProps } from './interface';

export const UIStepper = (props: UIStepperProps): JSX.Element => {
  const { currentStep = 0, content, onFinish, onValidateNext } = props;
  const [activeStepIndex, setActiveStepIndex] = useState(currentStep);
  const scrollRef = useRef<ScrollView>(null);
  const [stepsPosition, setStepsPosition] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    setActiveStepIndex(currentStep);
  }, [currentStep]);

  function onNextStepHandler(): void {
    if (onValidateNext && !onValidateNext()) {
      return;
    }

    const newActiveIndex = activeStepIndex + 1;

    setActiveStepIndex(newActiveIndex);

    if (stepsPosition < FULL_STEP_BUBBLE_SIZE * newActiveIndex) {
      setStepsPosition(stepsPosition + FULL_STEP_BUBBLE_SIZE);
    }
  }

  function onPrevStepHandler(): void {
    const newActiveIndex = activeStepIndex - 1;

    setActiveStepIndex(newActiveIndex);

    if (stepsPosition > FULL_STEP_BUBBLE_SIZE * newActiveIndex) {
      setStepsPosition(stepsPosition - FULL_STEP_BUBBLE_SIZE);
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({
      x: stepsPosition,
      animated: true,
    });
  }, [stepsPosition]);

  function onScrollLayoutFinished(event: LayoutChangeEvent): void {
    const { width } = event.nativeEvent.layout;

    setStepsPosition(Math.floor(width / FULL_STEP_BUBBLE_SIZE));
  }

  return (
    <Flex gapY={STEP_BUBBLE_MARGIN} direction="column">
      <Flex>
        {activeStepIndex > 0 ? (
          <Flex radius={50} gap={4}>
            <IconButton iconType="chevron" size={STEP_BUBBLE_SIZE} onPress={onPrevStepHandler} color="accentDarkBlue" />
          </Flex>
        ) : (
          <Flex width={30} radius={50} />
        )}

        <ScrollView
          testID="stepper-content"
          horizontal
          ref={scrollRef}
          onLayout={onScrollLayoutFinished}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        >
          {content.map((component, index) => {
            const isActive = index <= activeStepIndex;

            return (
              <Flex key={component.key} testID="stepper-item">
                <Flex
                  marginY={STEP_BUBBLE_MARGIN}
                  marginX={STEP_BUBBLE_MARGIN}
                  justify="center"
                  align="center"
                  width={STEP_BUBBLE_SIZE}
                  height={STEP_BUBBLE_SIZE}
                  backgroundColor={isActive ? 'primary' : 'accentLightGray'}
                  radius={100}
                  shadowType="l2"
                >
                  <Typography color={isActive ? 'accentWhite' : 'accentDarkBlue'}>{index + 1}</Typography>
                </Flex>

                {content[index + 1] && <Typography>-</Typography>}
              </Flex>
            );
          })}
        </ScrollView>

        <Flex gap={4} radius={50}>
          <IconButton iconType="tick" size={STEP_BUBBLE_SIZE} onPress={onFinish} color="accentDarkBlue" />
        </Flex>
      </Flex>

      {content[activeStepIndex]}

      <Flex marginY={20} direction="column" align="center" justify="center">
        {activeStepIndex !== content.length - 1 && (
          <UIButton onPress={onNextStepHandler} type="primary">
            {t('actions.next')}
          </UIButton>
        )}
      </Flex>
    </Flex>
  );
};
