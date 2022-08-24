import { Plot } from '../../../../entities/Plot/Plot';
import { PlainWorld } from '../../../../entities/World/PlainWorld/PlainWorld';
import { IGetWorldWorldList } from '../interface';
import { PlotConstructor } from '../PlotConstructor';

const mockPlot = new Plot();
const mockWorld = new PlainWorld();

mockPlot.setId('1234');
mockWorld.setId('3241');

const plotRepository = {
  create: jest.fn(),
  delete: jest.fn().mockResolvedValue(true),
  get: jest.fn(),
  update: jest.fn().mockResolvedValue(true),
  list: jest.fn().mockResolvedValue([mockPlot]),
};

const worldConstructor: IGetWorldWorldList = {
  getWorldsByPlotId: jest.fn(),
};

describe('PlotConstructor', () => {
  const plotConstructor = new PlotConstructor();

  Object.defineProperty(plotConstructor, 'repository', {
    writable: true,
    value: plotRepository,
  });

  Object.defineProperty(plotConstructor, 'worldConstructor', {
    writable: true,
    value: worldConstructor,
  });

  describe('WHEN "get" is called', () => {
    beforeEach(() => {
      plotRepository.get.mockResolvedValue(mockPlot);
    });

    it('AND entity is not found, MUST return "null"', async () => {
      plotRepository.get.mockResolvedValue(null);

      expect(await plotConstructor.get('1111')).toBeNull();
    });

    it('AND entity is found, MUST get worlds from "WorldConstructor"', async () => {
      await plotConstructor.get('1234');

      expect(worldConstructor.getWorldsByPlotId).toHaveBeenCalledWith(mockPlot.id);
    });

    it('MUST return plot entity"', async () => {
      expect(await plotConstructor.get('1234')).toEqual(mockPlot);
    });
  });

  describe('WHEN "list" is called', () => {
    beforeEach(() => {
      plotRepository.list.mockResolvedValue([mockPlot]);
    });

    it('MUST get entity list from repository', async () => {
      await plotConstructor.list({ pagination: { count: 1, page: 1 } });

      expect(plotRepository.list).toHaveBeenCalledWith({ pagination: { count: 1, page: 1 } });
    });

    it('AND list is empty, MUST return empty array', async () => {
      plotRepository.list.mockResolvedValue([]);

      expect(await plotConstructor.list({ pagination: { count: 1, page: 1 } })).toEqual([]);
    });

    it('AND entities is found, MUST return array of plots', async () => {
      expect(await plotConstructor.list({ pagination: { count: 1, page: 1 } })).toEqual([mockPlot]);
    });
  });
});
