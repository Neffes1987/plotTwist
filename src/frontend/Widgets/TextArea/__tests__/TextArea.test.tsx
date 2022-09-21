import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { TextAreaProps } from '../interface';
import { TextArea } from '../TextArea';

describe('WHEN "TextArea" is mounted', () => {
  const defaultProps: TextAreaProps = {
    onValueChanged: jest.fn(),
    title: 'test-title',
    value: 'some textarea value',
  };

  it('MUST render "title"', () => {
    const component = render(<TextArea {...defaultProps} />);

    expect(component.getByText(defaultProps.title)).toBeDefined();
  });

  it('MUST render provided value', () => {
    const component = render(<TextArea {...defaultProps} />);

    expect(component.getByTestId('text-area-input').props.value).toEqual(defaultProps.value);
  });

  it('AND "maxLength" was not provided AND provided value less then max value, MUST call "onValueChanged"', () => {
    const bigValueProps = {
      ...defaultProps,
      maxLength: undefined,
    };

    const component = render(<TextArea {...bigValueProps} />);

    fireEvent.changeText(component.getByTestId('text-area-input'), `${bigValueProps.value} additional value`);

    expect(bigValueProps.onValueChanged).toHaveBeenCalled();
  });

  describe('AND "maxLength" was provided', () => {
    it('MUST render value counter', () => {
      const component = render(<TextArea {...defaultProps} maxLength={20} />);

      expect(component.getByText(`(${defaultProps.value.length}/20)`)).toBeDefined();
    });

    describe('AND provided value more then max value', () => {
      const bigValueProps = {
        ...defaultProps,
        maxLength: 4,
      };

      it('AND user adds additional chars to value,  MUST NOT call "onValueChanged"', () => {
        (bigValueProps.onValueChanged as jest.Mock).mockReset();

        const component = render(<TextArea {...bigValueProps} />);

        fireEvent.changeText(component.getByTestId('text-area-input'), `${bigValueProps.value} additional value`);

        expect(bigValueProps.onValueChanged).not.toHaveBeenCalled();
      });

      it('AND user removes chars from value, MUST call "onValueChanged"', () => {
        const component = render(<TextArea {...bigValueProps} />);

        fireEvent.changeText(component.getByTestId('text-area-input'), 'new');

        expect(bigValueProps.onValueChanged).toHaveBeenCalledWith('new');
      });
    });
  });
});
