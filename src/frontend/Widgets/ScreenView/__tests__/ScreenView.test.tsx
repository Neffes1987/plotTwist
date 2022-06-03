import React from 'react';
import { render } from '@testing-library/react-native';

import { ScreenView } from '../ScreenView';

describe('WHEN "ScreenView" is mounted', () => {
  it('AND header is provided, MUST render header', () => {
    const component = render(<ScreenView header={{ title: 'test' }} />);

    expect(component.getByText('test')).toBeDefined();
  });
});
