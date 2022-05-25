import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { WorldWidgetProps } from '../interface';
import { WorldWidget } from '../WorldWidget';

describe('WHEN "WorldWidget" is mounted', () => {
  const defaultProps: WorldWidgetProps = {
    edge: {
      challenges: {
        active: 4,
        failed: 3,
        passed: 1,
        total: 12,
      },
      rewards: {
        collected: 1,
        total: 10,
      },
    },
    onOpenWorldProperty: jest.fn(),
    calls: {
      total: 12,
      active: 7,
    },
    waterholes: 4,
    laws: {
      total: 10,
      broken: 7,
    },
    worldType: 'plainWorld',
    onEditWorld: jest.fn(),
    characters: [
      { characterType: 'ally', quantity: 2 },
      { characterType: 'guard', quantity: 1 },
      { characterType: 'enemy', quantity: 1 },
      { characterType: 'mentor', quantity: 1 },
      { characterType: 'messenger', quantity: 1 },
      { characterType: 'shadow', quantity: 1 },
    ],
  };

  it('MUST render wold title', () => {
    const component = render(<WorldWidget {...defaultProps} />);

    expect(component.getByText(`worldWidget.${defaultProps.worldType}.caption`)).toBeDefined();
  });

  it('MUST render wold "faq" icon', () => {
    const component = render(<WorldWidget {...defaultProps} />);

    expect(component.getByTestId('faq')).toBeDefined();
  });

  it('AND user click on "faq" icon, MUST open info popover', () => {
    const component = render(<WorldWidget {...defaultProps} />);

    fireEvent.press(component.getByTestId('faq'));

    expect(component.getByText(`worldWidget.${defaultProps.worldType}.faq.caption`)).toBeDefined();
  });

  it('MUST render wold edit icon', () => {
    const component = render(<WorldWidget {...defaultProps} />);

    expect(component.getByTestId('pencil')).toBeDefined();
  });

  it('AND user click on "edit" icon, MUST open edit popover', () => {
    const component = render(<WorldWidget {...defaultProps} />);

    fireEvent.press(component.getByTestId('pencil'));

    expect(defaultProps.onEditWorld).toHaveBeenCalledWith(defaultProps.worldType);
  });

  it('AND "World" closed, MUST NOT show world body', () => {
    const component = render(<WorldWidget {...defaultProps} />);

    expect(component.queryAllByText('worldWidget.npc.ally')).toHaveLength(0);
  });

  describe('AND "isOpen" is provided', () => {
    const worldInfoProps = ['brokenLaws', 'activeCalls', 'waterholes', 'aboutWorld'].map((propName: string) => [propName, 'worldWidget.worldInfo.']);
    const edgeInfoProps = ['aboutEdge', 'rewards', 'activeChallenges', 'failedChallenges', 'passedChallenges'].map((propName: string) => [
      propName,
      'worldWidget.edgeInfo.',
    ]);
    const charactersInfoProps = defaultProps.characters.map(({ characterType }) => [characterType, 'worldWidget.npc.']);

    const propsNamesUnion = [...worldInfoProps, ...charactersInfoProps, ...edgeInfoProps];

    it.each(propsNamesUnion)('MUST print %p property', (propertyName: string, translation: string) => {
      const component = render(<WorldWidget {...defaultProps} />);

      fireEvent.press(component.getByText(`worldWidget.${defaultProps.worldType}.caption`));

      expect(component.getByText(`${translation}${propertyName}`)).toBeDefined();
    });

    it.each(propsNamesUnion)('MUST call "onOpenWorldProperty" with %p property', (propertyName: string, translation: string) => {
      const component = render(<WorldWidget {...defaultProps} />);

      fireEvent.press(component.getByText(`worldWidget.${defaultProps.worldType}.caption`));

      fireEvent.press(component.getByText(`${translation}${propertyName}`));

      expect(defaultProps.onOpenWorldProperty).toHaveBeenCalledWith(propertyName);
    });
  });
});
