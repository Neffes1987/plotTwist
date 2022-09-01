import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { Icon } from '../../Icon/Icon';
import { ListItemProps } from '../interface';
import { ListItem } from '../ListItem';

describe('WHEN "ListItem" is mounted', () => {
  const defultProps: ListItemProps = {
    caption: 'test caption',
    onEdit: jest.fn(),
    propertyId: 'test id',
  };

  it('MUST render provided "caption"', () => {
    const component = render(<ListItem {...defultProps} />);

    expect(component.getByText(defultProps.caption)).toBeDefined();
  });

  it('AND icon is provided, MUST render provided icon', () => {
    const component = render(<ListItem {...defultProps} icon={<Icon type="gear" />} />);

    expect(component.getByTestId('gear')).toBeDefined();
  });

  it('AND user clicks on it, MUST call callback function', () => {
    const component = render(<ListItem {...defultProps} />);

    fireEvent.press(component.getByText(defultProps.caption));

    expect(defultProps.onEdit).toHaveBeenCalledWith(defultProps.propertyId);
  });
});
