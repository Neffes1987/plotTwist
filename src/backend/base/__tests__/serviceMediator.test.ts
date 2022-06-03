import { MOCKED_SHADOW } from '@mocks/mockedCharacter';
import { MOCKED_PLOT } from '@mocks/mockedPlot';
import { MOCKED_WORLD } from '@mocks/mockedWorld';

import { WorldInfo } from '../../controller/interface';
import { ServiceMediator } from '../../controller/serviceMediator';
import { ShadowModel } from '../../models/character/character/shadowModel';

describe('ServiceMediator', () => {
  describe('WHEN "getPlotInfo" is called', () => {
    const serviceMediator = new ServiceMediator();
    const getPlotDTOMock = jest.fn();
    const getWorldsListMock = jest.fn();
    const getCharactersListMock = jest.fn();

    const worldInfo: WorldInfo = {
      world: MOCKED_WORLD,
      waterholes: [],
      laws: [],
      edge: {
        info: null,
        challenges: [],
        calls: [],
        rewards: [],
      },
    };

    Object.defineProperty(serviceMediator, 'plotService', {
      writable: true,
      value: {
        getPlotDTO: getPlotDTOMock,
      },
    });

    Object.defineProperty(serviceMediator, 'worldService', {
      writable: true,
      value: {
        getWorldsInfo: getWorldsListMock,
      },
    });

    Object.defineProperty(serviceMediator, 'characterService', {
      writable: true,
      value: {
        getCharactersList: getCharactersListMock,
      },
    });

    beforeEach(() => {
      getPlotDTOMock.mockResolvedValue(MOCKED_PLOT);
      getWorldsListMock.mockResolvedValue([worldInfo]);
      getCharactersListMock.mockResolvedValue([new ShadowModel(MOCKED_SHADOW)]);
    });

    it('Must return "plot" information', async () => {
      const result = await serviceMediator.getPlotInfo('test');

      expect(result.plot).toEqual(MOCKED_PLOT);
    });

    it('Must return "world" set', async () => {
      const result = await serviceMediator.getPlotInfo('testId');

      expect(result.worlds.length).toEqual(1);
    });
  });
});
