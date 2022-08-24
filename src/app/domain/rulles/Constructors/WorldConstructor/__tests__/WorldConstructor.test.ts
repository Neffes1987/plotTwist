import { PlainWorld } from '../../../../entities/World/PlainWorld/PlainWorld';
import { WorldConstructor } from '../WorldConstructor';

const mockWorld = new PlainWorld();

mockWorld.setId('3241');

const worldRepository = {
  create: jest.fn(),
  delete: jest.fn().mockResolvedValue(true),
  get: jest.fn(),
  update: jest.fn().mockResolvedValue(true),
  list: jest.fn().mockResolvedValue([mockWorld]),
};

describe('WorldConstructor', () => {
  const worldConstructor = new WorldConstructor();

  Object.defineProperty(worldConstructor, 'repository', {
    writable: true,
    value: worldRepository,
  });

  describe('WHEN "getWorldsByPlotId" is called', () => {
    beforeEach(() => {
      worldRepository.list.mockResolvedValue([mockWorld]);
    });

    it('MUST call "list" from world repository', async () => {
      await worldConstructor.getWorldsByPlotId('1234');

      expect(worldRepository.list).toHaveBeenCalledWith({ pagination: { count: 5, page: 1 }, queryParams: { plotId: '1234' } });
    });

    it('MUST return list of Worlds', async () => {
      expect(await worldConstructor.getWorldsByPlotId('1234')).toEqual([mockWorld]);
    });

    it('AND answer is empty, MUST return empty list', async () => {
      worldRepository.list.mockResolvedValue([]);

      expect(await worldConstructor.getWorldsByPlotId('1234')).toEqual([]);
    });
  });
});
