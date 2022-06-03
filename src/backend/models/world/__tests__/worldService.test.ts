import { MOCKED_CALL, MOCKED_CHALLENGE, MOCKED_EDGE } from '@mocks/mockedChallenge';
import { MOCKED_PLOT } from '@mocks/mockedPlot';
import { MOCKED_WATERHOLE } from '@mocks/mockedWaterhole';
import { MOCKED_LAW, MOCKED_RELEASED_WORLD, MOCKED_WORLD } from '@mocks/mockedWorld';

import { UxException } from '../../../base/errors/uxException';
import { ServiceMediator } from '../../../controller/serviceMediator';
import { CallModel } from '../../challenge/call/callModel';
import { CallRepository } from '../../challenge/call/callRepository';
import { ChallengeModel } from '../../challenge/challenge/challengeModel';
import { ChallengeRepository } from '../../challenge/challenge/challengeRepository';
import { EdgeModel } from '../../challenge/challenge/edgeModel';
import { PlotModel } from '../../plot/plot/plotModel';
import { PlotRepository } from '../../plot/plot/plotRepository';
import { WaterholeModel } from '../../waterhole/waterhole/waterholeModel';
import { WaterholeRepository } from '../../waterhole/waterhole/waterholeRepository';
import { LawModel } from '../law/lawModel';
import { LawRepository } from '../law/lawRepository';
import { PlainWorldModel } from '../world/plainWorldModel';
import { WorldRepository } from '../world/worldRepository';

jest.mock('../world/worldRepository');
jest.mock('../law/lawRepository');
jest.mock('../../plot/plot/plotRepository');
jest.mock('../../challenge/challenge/challengeRepository');
jest.mock('../../waterhole/waterhole/waterholeRepository');
jest.mock('../../challenge/call/callRepository');

describe('WorldService', () => {
  const mockedWorldRepository = new WorldRepository();
  const mockedLawRepository = new LawRepository();
  const mockedPlotRepository = new PlotRepository();
  const mockedChallengeRepository = new ChallengeRepository();
  const mockedWaterholeRepository = new WaterholeRepository();
  const mockedCallRepository = new CallRepository();

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

  Object.defineProperty(mediator.challengeService, '_challengeRepository', {
    writable: true,
    value: mockedChallengeRepository,
  });

  Object.defineProperty(mediator.waterholeService, '_waterholeRepository', {
    writable: true,
    value: mockedWaterholeRepository,
  });

  Object.defineProperty(mediator.challengeService, '_callRepository', {
    writable: true,
    value: mockedCallRepository,
  });

  describe('world', () => {
    describe('WHEN "getWorldsList" is called', () => {
      beforeEach(() => {
        (mockedWorldRepository.list as jest.Mock).mockReturnValue([world]);
      });

      it('MUST call "worldRepository.list"', async () => {
        await mediator.worldService.getWorldsList({ plotId: world.plotId });

        expect(mockedWorldRepository.list).toHaveBeenCalledWith({ plotId: world.plotId });
      });

      it('MUST returns list of worlds for plot', async () => {
        expect(await mediator.worldService.getWorldsList({ plotId: world.plotId })).toEqual([world]);
      });
    });

    describe('WHEN "removeWorlds" is called', () => {
      beforeEach(async () => {
        await mediator.worldService.removeWorlds(world.plotId);
      });

      it('MUST call "worldRepository.removeAllByPlotId"', () => {
        expect(mockedWorldRepository.removeAllByPlotId).toHaveBeenCalledWith(world.plotId);
      });
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

        expect(mockedWorldRepository.list).toHaveBeenCalledWith({ plotId: world.plotId });
      });

      it('AND all worlds are released, MUST sends command to change plot status to "released"', async () => {
        (mockedWorldRepository.list as jest.Mock).mockReturnValue([world, releasedWorld, releasedWorld, releasedWorld, releasedWorld]);

        const deactivatedPlot = new PlotModel(MOCKED_PLOT);
        const activatedPlot = new PlotModel(MOCKED_PLOT);

        deactivatedPlot.setStatus('draft');
        activatedPlot.setStatus('released');

        await mediator.worldService.activateWorld(world.id, 'release');

        expect(mockedPlotRepository.replace).toHaveBeenCalledWith(activatedPlot);
      });

      it('AND any of worlds are not released, MUST sends command to change plot status to "draft"', async () => {
        const deactivatedWorld = new PlainWorldModel(MOCKED_WORLD);
        const deactivatedPlot = new PlotModel(MOCKED_PLOT);

        deactivatedWorld.setStatus('draft');
        (mockedWorldRepository.list as jest.Mock).mockReturnValue([world, deactivatedWorld, deactivatedWorld, deactivatedWorld, deactivatedWorld]);

        deactivatedPlot.setStatus('draft');

        await mediator.worldService.activateWorld(deactivatedPlot.id, 'release');

        expect(mockedPlotRepository.replace).toHaveBeenCalledWith(deactivatedPlot);
      });

      it('AND all worlds are finished, MUST sends command to change plot status to "finished"', async () => {
        const deactivatedWorld = new PlainWorldModel(MOCKED_WORLD);
        const deactivatedPlot = new PlotModel(MOCKED_PLOT);

        deactivatedWorld.setStatus('finished');
        (mockedWorldRepository.list as jest.Mock).mockReturnValue([world, deactivatedWorld, deactivatedWorld, deactivatedWorld, deactivatedWorld]);

        deactivatedPlot.setStatus('finished');

        await mediator.worldService.activateWorld(deactivatedPlot.id, 'finished');

        expect(mockedPlotRepository.replace).toHaveBeenCalledWith(deactivatedPlot);
      });
    });

    describe('WHEN "getWorldsInfo" is called', () => {
      it('MUST return list of worlds for particular plot', async () => {
        const law = new LawModel(MOCKED_LAW);
        const edge = new EdgeModel(MOCKED_EDGE);
        const challenge = new ChallengeModel(MOCKED_CHALLENGE);
        const waterhole = new WaterholeModel(MOCKED_WATERHOLE);
        const call = new CallModel(MOCKED_CALL);

        (mockedWorldRepository.list as jest.Mock).mockReturnValue([world]);
        (mockedLawRepository.list as jest.Mock).mockReturnValue([law]);
        (mockedChallengeRepository.get as jest.Mock).mockResolvedValue(edge);
        (mockedChallengeRepository.list as jest.Mock).mockResolvedValue([challenge]);
        (mockedWaterholeRepository.list as jest.Mock).mockResolvedValue([waterhole]);
        (mockedCallRepository.list as jest.Mock).mockResolvedValue([call]);

        expect(await mediator.worldService.getWorldsInfo(plot.id)).toEqual([
          {
            world: world.serialize(),
            laws: [law.serialize()],
            edge: {
              info: edge.serialize(),
              calls: [call.serialize()],
              challenges: [challenge.serialize()],
              rewards: [],
            },
            waterholes: [waterhole.serialize()],
          },
        ]);
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
        await mediator.worldService.getLawsList({ worldId: world.id });

        expect(mockedLawRepository.list).toHaveBeenCalledWith({ worldId: world.id });
      });

      it('MUST returns list of laws for plot', async () => {
        expect(await mediator.worldService.getLawsList({ worldId: world.id })).toEqual([law]);
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
        let error;

        try {
          await mediator.worldService.removeLaw(law.id);
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(new UxException('empty_fields', { lawId: 'not_enough_laws_in_world' }));
      });
    });
  });
});
