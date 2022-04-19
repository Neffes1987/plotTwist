import { MOCKED_PLOT } from '@mocks/mockedPlot';

import { UxException } from '../../../base/errors/uxException';
import { ServiceMediator } from '../../../controller/serviceMediator';
import { PlotModel } from '../plot/plotModel';
import { PlotRepository } from '../plot/plotRepository';

jest.mock('../plot/plotRepository');

describe('PlotService', () => {
  const mediator = new ServiceMediator();
  const page = 1;
  const limit = 1;
  const plot = new PlotModel(MOCKED_PLOT);
  const mockedPlotRepository = new PlotRepository();

  Object.defineProperty(mediator.plotService, '_plotRepository', {
    writable: true,
    value: mockedPlotRepository,
  });

  describe('WHEN call "getPlotsList"', () => {
    beforeEach(() => {
      (mockedPlotRepository.list as jest.Mock).mockReturnValue([plot]);
    });

    it('MUST return list of plots', async () => {
      expect(await mediator.plotService.getPlotsList(page, limit)).toEqual([plot]);
    });
  });

  describe('WHEN call "getPlot"', () => {
    beforeEach(() => {
      (mockedPlotRepository.get as jest.Mock).mockReturnValue(plot);
    });

    it('MUST call "plotRepository.get"', async () => {
      await mediator.plotService.getPlot(plot.id);
    });

    describe('AND "plotRepository.get" returns "PlotModel"', () => {
      it('MUST returns plot data', async () => {
        expect(await mediator.plotService.getPlot(plot.id)).toEqual(plot);
      });
    });

    it('AND repository returns null, MUST throw ui error', async () => {
      try {
        await mediator.plotService.getPlot(plot.id);
      } catch (e) {
        expect(e).toEqual(new UxException('empty_fields', { plotId: '1' }));
      }
    });
  });

  describe('WHEN call "createPlot"', () => {
    beforeEach(() => {
      (mockedPlotRepository.add as jest.Mock).mockReturnValue(plot.id);
    });

    it('MUST call "plotRepository.add"', async () => {
      await mediator.plotService.createPlot(MOCKED_PLOT);
    });

    it('MUST returns "plotId"', async () => {
      expect(await mediator.plotService.createPlot(MOCKED_PLOT)).toEqual(plot.id);
    });
  });

  describe('WHEN call "updatePlot"', () => {
    beforeEach(() => {
      (mockedPlotRepository.replace as jest.Mock).mockReturnValue(true);
    });

    it('MUST call "plotRepository.replace"', async () => {
      await mediator.plotService.updatePlot(MOCKED_PLOT);
    });

    it('MUST returns boolean value', async () => {
      expect(await mediator.plotService.updatePlot(MOCKED_PLOT)).toEqual(true);
    });
  });

  describe('WHEN call "removePlot"', () => {
    beforeEach(() => {
      (mockedPlotRepository.remove as jest.Mock).mockReturnValue(true);
    });

    it('MUST call "plotRepository.remove"', async () => {
      await mediator.plotService.removePlot(plot.id);
    });

    it('MUST returns boolean value', async () => {
      expect(await mediator.plotService.removePlot(plot.id)).toEqual(true);
    });
  });

  describe('WHEN call "changePlotStatus"', () => {
    beforeEach(() => {
      (mockedPlotRepository.get as jest.Mock).mockReturnValue(plot);
    });

    it('MUST call "plotRepository.get"', async () => {
      await mediator.plotService.changePlotStatus(plot.id, true);
    });

    it('AND repository returns plot data, MUST change plot status', async () => {
      await mediator.plotService.changePlotStatus(plot.id, true);
      expect(plot.status).toEqual(true);
    });

    it('AND repository returns null, MUST throw ui error', async () => {
      try {
        await mediator.plotService.changePlotStatus(plot.id, true);
      } catch (e) {
        expect(e).toEqual(new UxException('empty_fields', { plotId: '1' }));
      }
    });

    it('MUST call "plotRepository.replace"', async () => {
      await mediator.plotService.changePlotStatus(plot.id, true);
    });
  });
});
