import React from 'react';
import { plotController, PlotInfoResponse } from '@backend';
import { waitEffectAsync } from '@mocks/functions';
import { MOCKED_CALL, MOCKED_CHALLENGE, MOCKED_EDGE, MOCKED_REWARD } from '@mocks/mockedChallenge';
import { MOCKED_MESSENGER, MOCKED_SHADOW } from '@mocks/mockedCharacter';
import { MOCKED_PLOT } from '@mocks/mockedPlot';
import { MOCKED_WATERHOLE, MOCKED_WATERHOLE_2 } from '@mocks/mockedWaterhole';
import { MOCKED_HIDDEN_CAVE_WORLD, MOCKED_LAW, MOCKED_PRIVATE_WORLD, MOCKED_WORLD } from '@mocks/mockedWorld';
import * as Navigation from '@react-navigation/core';
import { fireEvent, render } from '@testing-library/react-native';

import store from '../../../store/Store';
import { ROUTES } from '../../routes';
import { Home } from '../Home';

jest.mock('@react-navigation/core');

describe('WHEN "Home" is mounted', () => {
  const navigate = jest.fn();
  const plotInfoMock: PlotInfoResponse = {
    calls: [MOCKED_CALL],
    challenges: [MOCKED_CHALLENGE],
    characters: [MOCKED_SHADOW, MOCKED_MESSENGER],
    edges: [MOCKED_EDGE],
    laws: [MOCKED_LAW],
    plot: MOCKED_PLOT,
    rewards: [MOCKED_REWARD],
    waterholes: [MOCKED_WATERHOLE, MOCKED_WATERHOLE_2],
    worlds: [MOCKED_WORLD, MOCKED_PRIVATE_WORLD, MOCKED_HIDDEN_CAVE_WORLD],
  };

  jest.spyOn(Navigation, 'useNavigation').mockReturnValue({
    navigate,
  });

  const getPlotMock = jest.spyOn(plotController, 'getPlot');

  beforeEach(async () => {
    await store.setCurrentPlot('1');
    getPlotMock.mockResolvedValue(plotInfoMock);
  });

  it('MUST render header', async () => {
    const component = render(<Home />);

    await waitEffectAsync();

    expect(component.getByText('pages.home.caption')).toBeDefined();
  });

  it('AND no one plot selected, MUST navigate user plot list', async () => {
    await store.setCurrentPlot('');
    render(<Home />);

    await waitEffectAsync();

    expect(navigate).toHaveBeenCalledWith(ROUTES.plotList);
  });

  describe('AND no one world provided', () => {
    it('MUST render "Create first world" message', async () => {
      const component = render(<Home />);

      await waitEffectAsync();

      expect(component.getByText('pages.home.greetingMessage')).toBeDefined();
    });

    it('MUST render "Create first world" button', async () => {
      const component = render(<Home />);

      await waitEffectAsync();

      expect(component.getByText('pages.home.buttons.createFirstWorld')).toBeDefined();
    });

    it('AND user click on "Create first world" button, MUST navigate to world constructor', async () => {
      const component = render(<Home />);

      await waitEffectAsync();

      fireEvent.press(component.getByText('pages.home.buttons.createFirstWorld'));

      expect(navigate).toHaveBeenCalledWith(ROUTES.worldConstructor);
    });
  });

  describe('AND less then 5 worlds provided', () => {
    beforeEach(() => {
      getPlotMock.mockResolvedValue(plotInfoMock);
    });

    it('MUST render "World widget" for each world', async () => {
      const component = render(<Home />);

      await waitEffectAsync();

      expect(component.getByTestId('worldWidget.npc.caption')).toHaveBeenCalledWith(ROUTES.worldConstructor);
    });

    it('MUST render "Create next world" button', async () => {
      const component = render(<Home />);

      await waitEffectAsync();

      expect(component.getByText('pages.home.buttons.createNextWorld')).toBeDefined();
    });
  });

  describe('AND 5 worlds provided', () => {
    it('MUST render "World widget" for each world', () => {});

    it('MUST NOT render "Create next world" message', () => {});

    it('MUST NOT render "Create next world" button', () => {});
  });
});
