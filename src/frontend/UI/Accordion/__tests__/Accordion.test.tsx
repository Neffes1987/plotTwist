import React from 'react';
import { View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { Accordion } from '../Accordion';
import { AccordionProps } from '../interface';

describe('WHEN "Accordion" is mounted', () => {
  const defaultProps: AccordionProps = { caption: 'Accordion caption', expanded: false };

  it('MUST render provided caption', () => {
    const component = render(<Accordion {...defaultProps} />);

    expect(component.getByText(defaultProps.caption)).toBeDefined();
  });

  it('MUST render "chevron" icon', () => {
    const component = render(<Accordion {...defaultProps} />);

    expect(component.getByTestId('chevron')).toBeDefined();
  });

  it('AND "expanded" is not provided, MUST NOT render body by default', () => {
    const component = render(
      <Accordion {...defaultProps}>
        <View testID="accordion-body" />
      </Accordion>,
    );

    expect(component.queryAllByTestId('accordion-body')).toHaveLength(0);
  });

  it('AND "expanded" is provided, MUST render body by default', () => {
    const component = render(
      <Accordion {...defaultProps} expanded>
        <View testID="accordion-body" />
      </Accordion>,
    );

    expect(component.getByTestId('accordion-body')).toBeDefined();
  });

  it('AND user click on accordion, MUST render body', () => {
    const component = render(
      <Accordion {...defaultProps}>
        <View testID="accordion-body" />
      </Accordion>,
    );

    fireEvent.press(component.getByText(defaultProps.caption));

    expect(component.getByTestId('accordion-body')).toBeDefined();
  });
});
