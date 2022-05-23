import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { Drawer } from '../Drawer';

describe('WHEN "Drawer" is mounted', () => {
  const onClose = jest.fn();

  it('MUST render caption', () => {
    const component = render(<Drawer caption="test" isOpen onClose={onClose} />);

    expect(component.getByText('test')).toBeDefined();
  });

  it('MUST render body', () => {
    const component = render(
      <Drawer caption="test" isOpen onClose={onClose}>
        <Text>body</Text>
      </Drawer>,
    );

    expect(component.getByText('body')).toBeDefined();
  });

  it('AND user close drawer, MUST call "onClose"', () => {
    const component = render(
      <Drawer caption="test" isOpen onClose={onClose}>
        <Text>body</Text>
      </Drawer>,
    );

    fireEvent.press(component.getByTestId('drawer-close-section'));

    expect(onClose).toHaveBeenCalled();
  });
});
