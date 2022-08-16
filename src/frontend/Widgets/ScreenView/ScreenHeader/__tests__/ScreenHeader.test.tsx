import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { ScreenHeader } from '../ScreenHeader';

describe('WHEN "ScreenHeader" is mounted', () => {
  const onBackMock = jest.fn();
  const onSettingsMock = jest.fn();

  describe('AND "onBackClick" callback is provided', () => {
    it('MUST render back button icon', () => {
      const component = render(<ScreenHeader onBackClick={onBackMock} title="test-title" />);

      expect(component.getByTestId('chevron')).toBeDefined();
    });

    it('AND user click on "onBack", MUST call provided callback', () => {
      const component = render(<ScreenHeader onBackClick={onBackMock} title="test-title" />);

      fireEvent.press(component.getByTestId('chevron'));

      expect(onBackMock).toHaveBeenCalled();
    });
  });

  it('MUST render title', () => {
    const component = render(<ScreenHeader title="test-title" />);

    expect(component.getByText('test-title')).toBeDefined();
  });

  it('AND "subtitle" is provided, MUST render subtitle', () => {
    const component = render(<ScreenHeader title="test-title" subtitle="subtitle" />);

    expect(component.getByText('subtitle')).toBeDefined();
  });

  describe('AND "onSettingClick" callback is provided', () => {
    it('MUST render subtitle', () => {
      const component = render(<ScreenHeader onRightIconClick={onSettingsMock} title="test-title" rightIconType="gear" />);

      expect(component.getByTestId('gear')).toBeDefined();
    });

    it('AND user click on "settings" icon, MUST call provided callback', () => {
      const component = render(<ScreenHeader onRightIconClick={onSettingsMock} title="test-title" rightIconType="gear" />);

      fireEvent.press(component.getByTestId('gear'));

      expect(onSettingsMock).toHaveBeenCalled();
    });
  });
});
