import React from 'react';
import { render } from '@testing-library/react-native';

import { Loading } from '../Loading';

describe('WHEN "Loading" is mounted', () => {
  it('MUST render "logo" icon', () => {
    const component = render(<Loading />);

    expect(component.getByTestId('logo')).toBeDefined();
  });
});
