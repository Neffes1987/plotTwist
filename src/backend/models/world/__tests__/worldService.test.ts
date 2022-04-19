import { MOCKED_PLOT } from '@mocks/mockedPlot';
import { MOCKED_LAW, MOCKED_RELEASED_WORLD, MOCKED_WORLD } from '@mocks/mockedWorld';

import { UxException } from '../../../base/errors/uxException';
import { ServiceMediator } from '../../../controller/serviceMediator';
import { PlotModel } from '../../plot/plot/plotModel';
import { PlotRepository } from '../../plot/plot/plotRepository';
import { LawModel } from '../law/lawModel';
import { LawRepository } from '../law/lawRepository';
import { PlainWorldModel } from '../world/plainWorldModel';
import { WorldRepository } from '../world/worldRepository';

jest.mock('../world/worldRepository');
jest.mock('../law/lawRepository');
jest.mock('../../plot/plot/plotRepository');

describe('WorldService', () => {
  const mockedWorldRepository = new WorldRepository();
  const mockedLawRepository = new LawRepository();
  const mockedPlotRepository = new PlotRepository();

  const world = new PlainWorldModel(MOCKED_WORLD);
  const plot = new PlotModel(MOCKED_PLOT);
  const releasedWorld = new PlainWorldModel(MOCKED_RELEASED_WORLD);
  const mediator = new ServiceMediator();

  Object.defineProperty(mediator.worldService, '_worldRepository', {
    writable: true,
    value: mockedWorldRepository,
  });

  Object.defineProperty(mediator.worldService, '_lawRepository', {
    writable: true,
    value: mockedLawRepository,
  });

  Object.defineProperty(mediator.plotService, '_plotRepository', {
    writable: true,
    value: mockedPlotRepository,
  });

  describe('world', () => {
    describe('WHEN "getWorldsList" is called', () => {
      beforeEach(() => {
        (mockedWorldRepository.list as jest.Mock).mockReturnValue([world]);
      });

      it('MUST call "worldRepository.list"', async () => {
        await mediator.worldService.getWorldsList(world.plotId);

        expect(mockedWorldRepository.list).toHaveBeenCalledWith(world.plotId);
      });

      it('MUST returns list of worlds for plot', async () => {
        expect(await mediator.worldService.getWorldsList(world.plotId)).toEqual([world]);
      });
    });

    describe('WHEN "removeWorlds" is called', () => {
      beforeEach(async () => {
        await mediator.worldService.removeWorlds(world.plotId);
      });

      it('MUST call "worldRepository.remove"', async () => {});
    });

    describe('WHEN "getWorld" is called', () => {
      beforeEach(() => {
        (mockedWorldRepository.get as jest.Mock).mockReturnValue(world);
      });

      it('MUST call "worldRepository.get"', async () => {
        await mediator.worldService.getWorld(world.id);
      });

      it('MUST return plot data', async () => {
        expect(await mediator.worldService.getWorld(world.id)).toEqual(world);
      });
    });

    describe('WHEN "createWorld" is called', () => {
      beforeEach(() => {
        (mockedWorldRepository.add as jest.Mock).mockReturnValue(world.id);
      });

      it('MUST call "worldRepository.add"', async () => {
        await mediator.worldService.createWorld(MOCKED_WORLD);

        expect(mockedWorldRepository.add).toHaveBeenCalled();
      });

      it('MUST returns worldId', async () => {
        expect(await mediator.worldService.createWorld(MOCKED_WORLD)).toEqual(world.id);
      });
    });

    describe('WHEN "updateWorld" is called', () => {
      beforeEach(() => {
        (mockedWorldRepository.replace as jest.Mock).mockReturnValue(true);
      });

      it('MUST call "worldRepository.replace"', async () => {
        await mediator.worldService.updateWorld(MOCKED_WORLD);

        expect(mockedWorldRepository.replace).toHaveBeenCalled();
      });

      it('MUST returns boolean value', async () => {
        expect(await mediator.worldService.updateWorld(MOCKED_WORLD)).toBeTruthy();
      });
    });

    describe('WHEN "activateWorld" is called', () => {
      beforeEach(() => {
        (mockedPlotRepository.get as jest.Mock).mockReturnValue(plot);
        (mockedWorldRepository.get as jest.Mock).mockReturnValue(world);
        (mockedWorldRepository.list as jest.Mock).mockReturnValue([world]);
      });

      it('MUST call "worldRepository.get"', async () => {
        await mediator.worldService.activateWorld(world.id, 'release');
      });

      it('AND "worldRepository.get" returns null, MUST throw ui error', async () => {
        try {
          await mediator.worldService.activateWorld(world.id, 'release');
        } catch (e) {
          expect(e).toEqual(new UxException('empty_fields', { wrongWorldId: '1' }));
        }
      });

      it('MUST call "worldRepository.replace"', async () => {
        (mockedWorldRepository.list as jest.Mock).mockReturnValue([releasedWorld, releasedWorld, releasedWorld, releasedWorld, releasedWorld]);

        await mediator.worldService.activateWorld(world.id, 'release');

        expect(mockedWorldRepository.replace).toHaveBeenCalledWith(world);
      });

      it('MUST call "worldRepository.list"', async () => {
        await mediator.worldService.activateWorld(world.id, 'release');

        expect(mockedWorldRepository.list).toHaveBeenCalledWith(world.plotId);
      });

      it('AND all worlds are released, MUST sends command to change plot status to active', async () => {
        (mockedWorldRepository.list as jest.Mock).mockReturnValue([world, releasedWorld, releasedWorld, releasedWorld, releasedWorld]);

        const deactivatedPlot = new PlotModel(MOCKED_PLOT);
        const activatedPlot = new PlotModel(MOCKED_PLOT);

        deactivatedPlot.setIsActive(false);
        activatedPlot.setIsActive(true);

        await mediator.worldService.activateWorld(world.id, 'release');

        expect(mockedPlotRepository.replace).toHaveBeenCalledWith(activatedPlot);
      });

      it('AND any of worlds are not released, MUST sends command to change plot status to deactivate', async () => {
        const deactivatedWorld = new PlainWorldModel(MOCKED_WORLD);
        const deactivatedPlot = new PlotModel(MOCKED_PLOT);

        deactivatedWorld.setStatus('draft');
        (mockedWorldRepository.list as jest.Mock).mockReturnValue([world, deactivatedWorld, deactivatedWorld, deactivatedWorld, deactivatedWorld]);

        deactivatedPlot.setIsActive(false);

        await mediator.worldService.activateWorld(deactivatedPlot.id, 'release');

        expect(mockedPlotRepository.replace).toHaveBeenCalledWith(deactivatedPlot);
      });
    });
  });

  describe('law', () => {
    const law = new LawModel(MOCKED_LAW);

    describe('WHEN "getLawsList" is called', () => {
      beforeEach(() => {
        (mockedLawRepository.list as jest.Mock).mockReturnValue([law]);
      });

      it('MUST call "lawRepository.list"', async () => {
        await mediator.worldService.getLawsList(world.id);

        expect(mockedLawRepository.list).toHaveBeenCalledWith(world.id);
      });

      it('MUST returns list of laws for plot', async () => {
        expect(await mediator.worldService.getLawsList(world.id)).toEqual([law]);
      });
    });

    describe('WHEN "getLaw" is called', () => {
      beforeEach(() => {
        (mockedLawRepository.get as jest.Mock).mockReturnValue(law);
      });

      it('MUST call "lawRepository.get"', async () => {
        await mediator.worldService.getLaw(law.id);

        expect(mockedLawRepository.get).toHaveBeenCalledWith(law.id);
      });

      it('MUST returns law data', async () => {
        expect(await mediator.worldService.getLaw(law.id)).toEqual(law);
      });
    });

    describe('WHEN "createLaw" is called', () => {
      beforeEach(() => {
        (mockedLawRepository.add as jest.Mock).mockReturnValue(law.id);
      });

      it('MUST call "lawRepository.add"', async () => {
        await mediator.worldService.createLaw(MOCKED_LAW);

        expect(mockedLawRepository.add).toHaveBeenCalled();
      });

      it('MUST returns law id', async () => {
        expect(await mediator.worldService.createLaw(MOCKED_LAW)).toEqual(law.id);
      });
    });

    describe('WHEN "updateLaw" is called', () => {
      beforeEach(() => {
        (mockedLawRepository.replace as jest.Mock).mockReturnValue(true);
      });

      it('MUST call "worldRepository.replace"', async () => {
        await mediator.worldService.updateLaw(MOCKED_LAW);

        expect(mockedLawRepository.replace).toHaveBeenCalled();
      });

      it('MUST returns boolean value', async () => {
        expect(await mediator.worldService.updateLaw(MOCKED_LAW)).toEqual(true);
      });
    });

    describe('WHEN "removeLaw" is called', () => {
      beforeEach(() => {
        (mockedLawRepository.remove as jest.Mock).mockReturnValue(true);
        (mockedLawRepository.get as jest.Mock).mockReturnValue(law.id);
      });

      it('MUST call "worldRepository.remove"', async () => {
        (mockedLawRepository.list as jest.Mock).mockReturnValue([law, law, law]);

        await mediator.worldService.removeLaw(law.id);

        expect(mockedLawRepository.remove).toHaveBeenCalledWith(law.id);
      });

      it('AND laws quantity is less then threshold, MUST show ui error', async () => {
        (mockedLawRepository.list as jest.Mock).mockReturnValue([law, law]);

        try {
          await mediator.worldService.removeLaw(law.id);
        } catch (e) {
          // eslint-disable-next-line jest/valid-expect
          expect(new UxException('empty_fields', { lawId: 'not_enough_laws_in_world' }).toString());
        }
      });
    });
  });
});
