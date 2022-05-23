import React from 'react';
import { render } from '@testing-library/react-native';

import { UIButtonProps } from '../../interface';
import { BUTTON_STYLES_CONFIG } from '../constants';
import { UIButton } from '../UIButton';

describe('WHEN "UIButton" is mounted', () => {
  it.each([
    ['MUST use "secondary" set as default', {} as UIButtonProps, BUTTON_STYLES_CONFIG.secondary],
    ['AND "type" is equal "primary", MUST use "primary" set', { type: 'primary' } as UIButtonProps, BUTTON_STYLES_CONFIG.primary],
  ])('%s', (_, props: UIButtonProps, expectation) => {
    const component = render(<UIButton {...props} />);

    expect(component.toJSON()?.props.style).toEqual(expect.objectContaining(expectation));
  });
});
