import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { ListItemProps } from '../interface';
import { ListItem } from '../ListItem';

describe('WHEN "ListItem" is mounted', () => {
  const defultProps: ListItemProps = {
    onOpen: jest.fn(),
    caption: 'test caption',
    onEdit: jest.fn(),
    propertyId: 'test id',
    icon: undefined,
  };

  it('MUST render provided "caption"', () => {
    const component = render(<ListItem {...defultProps} />);

    expect(component.getByText(defultProps.caption)).toBeDefined();
  });

  it('AND icon is provided, MUST render provided icon', () => {
    const component = render(<ListItem {...defultProps} icon="gear" />);

    expect(component.getByTestId('gear')).toBeDefined();
  });

  it('AND user clicks on it, MUST call callback function', () => {
    const component = render(<ListItem {...defultProps} />);

    fireEvent.press(component.getByText(defultProps.caption));

    expect(defultProps.onOpen).toHaveBeenCalledWith(defultProps.propertyId);
  });

  it('AND user clicks on edit icon, MUST call callback function', () => {
    const component = render(<ListItem {...defultProps} icon="gear" />);

    fireEvent.press(component.getByTestId('gear'));

    expect(defultProps.onEdit).toHaveBeenCalledWith(defultProps.propertyId);
  });

  it('AND "selected" prop was provided, MUST render "tick" icon', () => {
    const component = render(<ListItem {...defultProps} selected />);

    expect(component.queryAllByTestId('tick')).toHaveLength(1);
  });
});
