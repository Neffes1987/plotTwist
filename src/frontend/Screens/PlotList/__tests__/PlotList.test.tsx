import React from 'react';
import { render } from '@testing-library/react-native';

import { PlotList } from '../PlotList';

describe('WHEN "PlotList" is mounted', () => {
  it('MUST render header', () => {
    const component = render(<PlotList />);

    expect(component.getByText('pages.plotList.caption')).toBeDefined();
  });

  describe('AND plot list empty', () => {
    it('MUST render "Create first plot" message', () => {});

    it('MUST render "Create first plot" button', () => {});

    it('AND user clicks on "Create first plot" button, MUST open "Create plot" popup', () => {});
  });

  describe('AND plot list is not empty', () => {
    it('MUST render plots list', () => {});

    it('MUST render "Create plot" button', () => {});

    it('AND user clicks on "Create plot" button, MUST open "Create plot" popup', () => {});
  });

  describe('AND user fills create plot form', () => {
    it('MUST send query to bd', () => {});

    it('MUST close popup', () => {});

    it('MUST navigate user to home screen', () => {});

    it('MUST mark plot as selected', () => {});
  });
});
