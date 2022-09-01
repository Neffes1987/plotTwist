import React, { useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, ScrollView } from 'react-native';

import { IconButton } from '../Buttons/IconButton';
import { Flex } from '../Flex/Flex';
import { ColorType } from '../interface';
import { Typography } from '../Typography/Typography';

import { FULL_STEP_BUBBLE_SIZE, STEP_BUBBLE_MARGIN, STEP_BUBBLE_SIZE } from './constants';
import { UIStepperProps } from './interface';

export const UIStepper = (props: UIStepperProps): JSX.Element => {
  const { currentStep = 0, content, onFinish, onValidateNext, invalidPoints } = props;
  const [activeStepIndex, setActiveStepIndex] = useState(currentStep);
  const scrollRef = useRef<ScrollView>(null);
  const [stepsPosition, setStepsPosition] = useState(0);
  const [visibleStepsQuantity, setVisibleStepsQuantity] = useState(0);

  useEffect(() => {
    setActiveStepIndex(currentStep);
  }, [currentStep]);

  function calculateOffset(newActiveIndex: number): void {
    const newActiveIndexOffset = FULL_STEP_BUBBLE_SIZE * newActiveIndex;
    const middleFrameOffset = FULL_STEP_BUBBLE_SIZE * (visibleStepsQuantity / 2);

    const offset = newActiveIndexOffset - middleFrameOffset;

    setStepsPosition(offset);
  }

  function onChangeStepHandler(newActiveIndex: number): void {
    if (onValidateNext && !onValidateNext()) {
      return;
    }

    calculateOffset(newActiveIndex);
    setActiveStepIndex(newActiveIndex);
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({
      x: stepsPosition,
      animated: true,
    });
  }, [stepsPosition]);

  function onScrollLayoutFinished(event: LayoutChangeEvent): void {
    const { width } = event.nativeEvent.layout;

    setVisibleStepsQuantity(Math.floor(width / FULL_STEP_BUBBLE_SIZE));
    setStepsPosition(Math.floor(width / FULL_STEP_BUBBLE_SIZE));
  }

  return (
    <Flex gapY={STEP_BUBBLE_MARGIN} direction="column" fullHeight>
      <Flex>
        <ScrollView
          testID="stepper-content"
          horizontal
          ref={scrollRef}
          onLayout={onScrollLayoutFinished}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        >
          {content.map((component, index) => {
            const isActive = index === activeStepIndex;
            let bgColor: ColorType = 'accentLightGray';
            const isError = !!invalidPoints?.[index];

            if (isError) {
              bgColor = 'neutralRed';
            }

            if (isActive) {
              bgColor = 'primary';
            }

            return (
              <Flex key={component.key} testID="stepper-item" onPress={() => onChangeStepHandler(index)}>
                <Flex
                  marginY={STEP_BUBBLE_MARGIN}
                  marginX={STEP_BUBBLE_MARGIN}
                  justify="center"
                  align="center"
                  width={STEP_BUBBLE_SIZE}
                  height={STEP_BUBBLE_SIZE}
                  backgroundColor={bgColor}
                  radius={100}
                  shadowType="l2"
                >
                  <Typography color={isActive || isError ? 'accentWhite' : 'accentDarkBlue'}>{index + 1}</Typography>
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
    </Flex>
  );
};
