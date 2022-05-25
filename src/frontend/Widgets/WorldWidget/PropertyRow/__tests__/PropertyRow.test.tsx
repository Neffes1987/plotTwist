import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { PropertyRowProps } from '../../interface';
import { PropertyRow } from '../PropertyRow';

describe('WHEN "PropertyRow" is mounted', () => {
  const defaultProps: PropertyRowProps = {
    onPress: jest.fn(),
    caption: 'caption',
    quantity: '1',
    id: 'enemy',
  };

  it('MUST render "chevron" icon', () => {
    const component = render(<PropertyRow {...defaultProps} />);

    expect(component.getByTestId('chevron')).toBeDefined();
  });

  it('MUST render property "caption"', () => {
    const component = render(<PropertyRow {...defaultProps} />);

    expect(component.getByText(defaultProps.caption)).toBeDefined();
  });

  it('MUST render property "quantity"', () => {
    const component = render(<PropertyRow {...defaultProps} />);

    expect(component.getByText(defaultProps.quantity?.toString() ?? '')).toBeDefined();
  });

  it('AND user click on it, MUST mast call press callback', () => {
    const component = render(<PropertyRow {...defaultProps} />);

    fireEvent.press(component.getByText(defaultProps.caption));

    expect(defaultProps.onPress).toHaveBeenCalledWith(defaultProps.id);
  });
});
