import React from 'react';
import { FlexStyle, Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { FlexProps } from '../../interface';
import { Flex } from '../Flex';

describe('WHEN "Flex" is mounted', () => {
  it.each([
    ['MUST contain flex "direction" row by default', {} as FlexProps, ['flexDirection', 'row']],
    ['AND "direction" was provided, MUST provide "direction" to view', { direction: 'column' } as FlexProps, ['flexDirection', 'column']],
    ['MUST NOT contain "justifyContent" by default', {} as FlexProps, ['justifyContent', undefined]],
    ['AND "justify" is provided, MUST provide "justifyContent" to view', { justify: 'space-between' } as FlexProps, ['justifyContent', 'space-between']],
    ['MUST contain "alignItems" with value "center" by default', {} as FlexProps, ['alignItems', 'center']],
    ['AND "align" is provided, MUST contain "alignItems" by default', { align: 'flex-start' } as FlexProps, ['alignItems', 'flex-start']],
    ['MUST NOT contain "flexGrow" by default', {} as FlexProps, ['flexGrow', undefined]],
    ['AND "grow" is provided, MUST contain "flexGrow" by default', { grow: 1 } as FlexProps, ['flexGrow', 1]],
    ['MUST NOT contain "flexShrink" by default', {} as FlexProps, ['flexShrink', undefined]],
    ['AND "shrink" is provided, MUST contain "flexShrink" by default', { shrink: 1 } as FlexProps, ['flexShrink', 1]],
    ['MUST NOT contain "flexWrap" by default', {} as FlexProps, ['flexWrap', undefined]],
    ['AND "wrap" is provided, MUST contain "flexWrap" by default', { wrap: 'wrap' } as FlexProps, ['flexWrap', 'wrap']],
    ['AND "styles" is provided, MUST provide "styles" to view', { styles: { fontSize: 12 } } as FlexProps, ['fontSize', 12]],
  ])('%s', (_, props: FlexProps, result) => {
    const [property, expectation] = result;

    const component = render(
      <Flex {...props}>
        <Text>test</Text>
      </Flex>,
    );

    expect(component.toJSON()?.props.style[property as keyof FlexStyle]).toEqual(expectation);
  });
});
