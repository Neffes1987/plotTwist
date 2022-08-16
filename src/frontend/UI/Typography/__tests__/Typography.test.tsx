import React from 'react';
import { ReactTestInstance } from 'react-test-renderer';
import { render } from '@testing-library/react-native';

import { UI_COLORS } from '../../colors';
import { TypographyProps } from '../../interface';
import { TYPOGRAPHY_STYLES } from '../constnatns';
import { Typography } from '../Typography';

describe('WHEN "Typography" is mounted', () => {
  it.each([
    ['AND "mode" is not provided, MUST use "default" set', {} as TypographyProps, TYPOGRAPHY_STYLES.default],
    ['AND "mode" is equal "title", MUST use "title" set', { mode: 'title' } as TypographyProps, TYPOGRAPHY_STYLES.title],
    ['AND "mode" is equal "subtitle", MUST use "subtitle" set', { mode: 'subtitle' } as TypographyProps, TYPOGRAPHY_STYLES.subtitle],
    ['AND "mode" is equal "body-bold", MUST use "body-bold" set', { mode: 'body-bold' } as TypographyProps, TYPOGRAPHY_STYLES['body-bold']],
    ['AND "mode" is equal "body-medium", MUST use "body-medium" set', { mode: 'body-medium' } as TypographyProps, TYPOGRAPHY_STYLES['body-medium']],
    ['AND "mode" is equal "caption-medium", MUST use "caption-medium" set', { mode: 'caption-medium' } as TypographyProps, TYPOGRAPHY_STYLES['caption-medium']],
    ['AND "mode" is equal "caption-bold", MUST use "caption-bold" set', { mode: 'caption-bold' } as TypographyProps, TYPOGRAPHY_STYLES['caption-bold']],
    ['AND "mode" is equal "label", MUST use "label" set', { mode: 'label' } as TypographyProps, TYPOGRAPHY_STYLES.label],
    [
      'AND "color" is provided, MUST use provided "color" over set',
      { color: 'primary' } as TypographyProps,
      { ...TYPOGRAPHY_STYLES.default, color: UI_COLORS.primary },
    ],
  ])('%s', (_, props: TypographyProps, expectation) => {
    const component = render(<Typography {...props}>test</Typography>);

    expect((component.toJSON()?.children?.[0] as ReactTestInstance).props.style).toEqual(expect.objectContaining(expectation));
  });
});
