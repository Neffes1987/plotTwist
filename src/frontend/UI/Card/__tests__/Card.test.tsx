import React from 'react';
import { render } from '@testing-library/react-native';

import { UI_COLORS } from '../../colors';
import { Flex } from '../../Flex/Flex';
import { Card } from '../Card';

describe('Card', () => {
  it('MUST have vertical align "flex-start"', () => {
    const component = render(<Card />);

    expect(component.toJSON()?.props.style.alignItems).toEqual('flex-start');
  });

  it('MUST have flex direction "column"', () => {
    const component = render(<Card />);

    expect(component.toJSON()?.props.style.flexDirection).toEqual('column');
  });

  it('MUST have gap between blocks as "4"', () => {
    const component = render(<Card />);

    expect(component.toJSON()?.props.style.paddingVertical).toEqual(4);
    expect(component.toJSON()?.props.style.paddingHorizontal).toEqual(4);
  });

  it('MUST render provided children element', () => {
    const component = render(
      <Card>
        <Flex testID="test-children" />
      </Card>,
    );

    expect(component.queryAllByTestId('test-children')).toHaveLength(1);
  });

  it('AND "title" is provided, MUST render provided title', () => {
    const component = render(<Card title="test-title" />);

    expect(component.queryAllByText('test-title')).toHaveLength(1);
  });

  it('AND "bordered" is provided, MUST apply border stiles', () => {
    const component = render(<Card />);

    expect(component.toJSON()?.props.style.borderWidth).toEqual(1);
  });

  it('AND "bordered" is not provided, MUST NOT apply border stiles', () => {
    const component = render(<Card bordered={false} />);

    expect(component.toJSON()?.props.style.borderWidth).toBeUndefined();
  });

  it('MUST set background color by provided "color" prop', () => {
    const component = render(<Card color="primary" />);

    expect(component.toJSON()?.props.style.backgroundColor).toEqual(UI_COLORS.primary);
  });
});
