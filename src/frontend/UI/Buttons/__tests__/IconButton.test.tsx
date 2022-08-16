import React from 'react';
import { render } from '@testing-library/react-native';

import { IconButton } from '../IconButton';

describe('WHEN "IconButton" is mounted', () => {
  it('MUST use "round" set as default', () => {
    const component = render(<IconButton iconType="close" />);

    expect(component.toJSON()?.props.style).toEqual(expect.objectContaining({ width: 20, height: 20 }));
  });

  it('AND "size is provided", MUST use provided "size"', () => {
    const component = render(<IconButton size={33} iconType="close" />);

    expect(component.toJSON()?.props.style).toEqual(expect.objectContaining({ width: 33, height: 33 }));
  });
});
