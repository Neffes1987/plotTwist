import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import { UI_COLORS } from '../colors';
import { Flex } from '../Flex/Flex';

import { bottomCircles, SPINNER_INTERVAL, SPINNER_ROW_SCHEMA, SPINNER_ROWS_DEFAULT_STATE, topCircles } from './constants';
import { SpinnerCircleSchema } from './interface';

export const Spinner = (): ReactElement => {
  const [colorsSet, setColorsSet] = useState<SpinnerCircleSchema>(SPINNER_ROWS_DEFAULT_STATE);

  const interval = useRef(0);

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current);
      setColorsSet(SPINNER_ROWS_DEFAULT_STATE);
    }

    let step = -1;

    interval.current = setInterval(() => {
      if (step > SPINNER_ROW_SCHEMA.length - 2) {
        step = 0;
      } else {
        step += 1;
      }

      const [row, index] = SPINNER_ROW_SCHEMA[step].split(':');

      setColorsSet((prevState: SpinnerCircleSchema) => {
        const newSate = {
          top: [...prevState.top],
          bottom: [...prevState.bottom],
        };

        newSate[row][index] = !newSate[row][index];

        return newSate;
      });
    }, SPINNER_INTERVAL);

    return (): void => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <Flex direction="column" justify="space-around" gapY={20}>
      <Flex>
        {[11, 23, 21].map((size: number, index: number) => (
          <View
            key={size}
            style={{ ...topCircles[index], width: size, height: size, backgroundColor: colorsSet.top[index] ? UI_COLORS.neutralGreen : undefined }}
          />
        ))}
      </Flex>

      <Flex justify="space-around">
        {[12, 15, 18].map((size: number, index: number) => (
          <View
            key={size}
            style={{ ...bottomCircles[index], width: size, height: size, backgroundColor: colorsSet.bottom[index] ? UI_COLORS.neutralGreen : undefined }}
          />
        ))}
      </Flex>
    </Flex>
  );
};
