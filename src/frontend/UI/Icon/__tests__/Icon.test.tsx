import React from 'react';
import { render } from '@testing-library/react-native';

import { UI_COLORS } from '../../colors';
import { IconType } from '../../interface';
import { Icon } from '../Icon';

const IconTypes: IconType[] = ['search', 'close', 'gear', 'tick', 'chevron', 'faq', 'attention', 'flame', 'logo', 'pencil', 'plus'];

describe('WHEN "Icon" is mounted', () => {
  it.each(IconTypes.map(type => [type]))('AND %p provided, MUST render icon', type => {
    const component = render(<Icon type={(type as unknown) as IconType} />);

    expect(component.toJSON()?.props.testID).toEqual(type);
  });

  it('AND "type" is not provided, MUST render empty image', () => {
    // @ts-ignore
    const component = render(<Icon />);

    expect(component.toJSON()).toBeNull();
  });

  it('AND "color" is provided, MUST setup color to icon', () => {
    const component = render(<Icon type="close" color="primary" />);

    expect(component.toJSON()?.props.fill).toEqual(UI_COLORS.primary);
  });

  it('AND "rotate" is provided, MUST provide rotate setting to icon', () => {
    const component = render(<Icon type="close" rotate={90} />);

    expect(component.toJSON()?.props.style.transform[0].rotate).toEqual('90deg');
  });
});
