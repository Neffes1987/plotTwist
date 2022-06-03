import { ICallModel, IChallengeModel, IMainEdgeModel, IRewardModel } from '@backend';
import { MOCKED_CALL, MOCKED_CHALLENGE, MOCKED_EDGE, MOCKED_MAIN_EDGE, MOCKED_REWARD } from '@mocks/mockedChallenge';
import { MOCKED_PLOT } from '@mocks/mockedPlot';
import { MOCKED_WORLD } from '@mocks/mockedWorld';

import { UxException } from '../../../base/errors/uxException';
import { EdgeInfo } from '../../../controller/interface';
import { ServiceMediator } from '../../../controller/serviceMediator';
import { PlotModel } from '../../plot/plot/plotModel';
import { PlotRepository } from '../../plot/plot/plotRepository';
import { PlainWorldModel } from '../../world/world/plainWorldModel';
import { WorldRepository } from '../../world/world/worldRepository';
import { CallModel } from '../call/callModel';
import { CallRepository } from '../call/callRepository';
import { ChallengeModel } from '../challenge/challengeModel';
import { ChallengeRepository } from '../challenge/challengeRepository';
import { EdgeModel } from '../challenge/edgeModel';
import { MainEdgeModel } from '../challenge/mainEdgeModel';
import { RewardModel } from '../reward/rewardModel';
import { RewardRepository } from '../reward/rewardRepository';

jest.mock('../call/callRepository');
jest.mock('../reward/rewardRepository');
jest.mock('../challenge/challengeRepository');
jest.mock('../../world/world/worldRepository');
jest.mock('../../plot/plot/plotRepository');

describe('challengeService', () => {
  const mediator = new ServiceMediator();
  const mockedRewardRepository = new RewardRepository();
  const mockedChallengeRepository = new ChallengeRepository();
  const mockedCallRepository = new CallRepository();
  const mockedPlotRepository = new PlotRepository();
  const mockedWorldRepository = new WorldRepository();
  const mainEdge = new MainEdgeModel(MOCKED_MAIN_EDGE);

  Object.defineProperty(mediator.challengeService, '_challengeRepository', {
    writable: true,
    value: mockedChallengeRepository,
  });

  Object.defineProperty(mediator.challengeService, '_rewardRepository', {
    writable: true,
    value: mockedRewardRepository,
  });

  Object.defineProperty(mediator.challengeService, '_callRepository', {
    writable: true,
    value: mockedCallRepository,
  });

  Object.defineProperty(mediator.worldService, '_worldRepository', {
    writable: true,
    value: mockedWorldRepository,
  });

  Object.defineProperty(mediator.plotService, '_plotRepository', {
    writable: true,
    value: mockedPlotRepository,
  });

  beforeEach(() => {
    (mockedChallengeRepository.list as jest.Mock).mockResolvedValue([mainEdge]);
    (mockedChallengeRepository.get as jest.Mock).mockResolvedValue(mainEdge);
    (mockedChallengeRepository.getEdgeByChallengeId as jest.Mock).mockResolvedValue(mainEdge);
    (mockedChallengeRepository.add as jest.Mock).mockResolvedValue(mainEdge.id);
    (mockedChallengeRepository.replace as jest.Mock).mockResolvedValue(true);
    (mockedChallengeRepository.generateModel as jest.Mock).mockReturnValue(mainEdge);
  });

  describe('challenge', () => {
    describe('WHEN "removeChallenge" is called', () => {
      it('AND type of challenge is "edge", MUST return ui error', async () => {
        const edge = new EdgeModel(MOCKED_EDGE);

        (mockedChallengeRepository.get as jest.Mock).mockResolvedValue(edge);

        let error;

        try {
          await mediator.challengeService.removeChallenge(edge.id);
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(new UxException('edge_can_not_be_deleted'));
      });

      it('AND type of challenge is "mainEdge", MUST return ui error', async () => {
        let error;

        try {
          await mediator.challengeService.removeChallenge(mainEdge.id);
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(new UxException('main_edge_can_not_be_deleted'));
      });

      describe('AND type of challenge is "challenge"', () => {
        it('AND quantity of challenges is less then threshold, MUST return ui error', async () => {
          const challenge = new ChallengeModel(MOCKED_CHALLENGE);

          (mockedChallengeRepository.get as jest.Mock).mockResolvedValue(challenge);

          let error;

          try {
            await mediator.challengeService.removeChallenge(challenge.id);
          } catch (e) {
            error = e;
          }

          expect(error).toEqual(new UxException('not_enough_challenges'));
        });

        it('AND quantity of challenges is more then threshold, MUST return boolean value', async () => {
          const challenge = new ChallengeModel(MOCKED_CHALLENGE);
          const edge = new EdgeModel(MOCKED_EDGE);

          (mockedChallengeRepository.get as jest.Mock).mockResolvedValue(challenge);

          edge.setChallengeIds(['id1', 'id2', 'id3', 'id4']);

          (mockedChallengeRepository.getEdgeByChallengeId as jest.Mock).mockResolvedValue(edge);

          expect(await mediator.challengeService.removeChallenge(challenge.id)).toBeTruthy();
        });
      });
    });

    describe('WHEN "toggleChallengeStatus" is called', () => {
      const world = new PlainWorldModel(MOCKED_WORLD);
      const plot = new PlotModel(MOCKED_PLOT);

      beforeEach(() => {
        (mockedChallengeRepository.get as jest.Mock).mockResolvedValue(mainEdge);
        (mockedChallengeRepository.replace as jest.Mock).mockResolvedValue(true);
        (mockedWorldRepository.replace as jest.Mock).mockResolvedValue(true);
        (mockedWorldRepository.list as jest.Mock).mockResolvedValue([world]);
        (mockedWorldRepository.get as jest.Mock).mockResolvedValue(world);
        (mockedPlotRepository.get as jest.Mock).mockResolvedValue(plot);
      });

      it('AND provided id not for "challenge", MUST throw ui error', async () => {
        const challenge = new ChallengeModel(MOCKED_CHALLENGE);
        let error;

        (mockedChallengeRepository.get as jest.Mock).mockResolvedValue(null);

        try {
          await mediator.challengeService.toggleEdgeStatus(challenge.id, true);
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(new UxException('provided_id_is_not_for_challenge'));
      });

      it('MUST update data in repository', async () => {
        const mainEdge = new MainEdgeModel(MOCKED_MAIN_EDGE);

        (mockedChallengeRepository.get as jest.Mock).mockResolvedValue(mainEdge);

        await mediator.challengeService.toggleEdgeStatus(mainEdge.id, true);

        expect(mockedChallengeRepository.replace).toHaveBeenCalledWith(mainEdge);
      });

      it('AND provided id for "edge", MUST update world repository', async () => {
        const mainEdge = new MainEdgeModel(MOCKED_MAIN_EDGE);

        await mediator.challengeService.toggleEdgeStatus(mainEdge.id, true);

        expect(mockedWorldRepository.replace).toHaveBeenCalledWith(world);
      });

      it('MUST return boolean value', async () => {
        const mainEdge = new MainEdgeModel(MOCKED_MAIN_EDGE);

        expect(await mediator.challengeService.toggleEdgeStatus(mainEdge.id, true)).toBeTruthy();
      });
    });

    describe('WHEN "changeChallengeWeight" is called', () => {
      it('MUST get challenge from repository', async () => {
        await mediator.challengeService.changeChallengeWeight(mainEdge.id, 1);

        expect(mockedChallengeRepository.get).toHaveBeenCalledWith(mainEdge.id);
      });

      it('MUST update data in repository', async () => {
        await mediator.challengeService.changeChallengeWeight(mainEdge.id, 1);

        mainEdge.setWeight(1);

        expect(mockedChallengeRepository.replace).toHaveBeenCalledWith(mainEdge);
      });

      it('MUST return boolean value', async () => {
        expect(await mediator.challengeService.changeChallengeWeight(mainEdge.id, 1)).toBeTruthy();
      });
    });

    describe('WHEN "getChallengesList" is called', () => {
      it('MUST get list from repository', async () => {
        await mediator.challengeService.getChallengesList({});

        expect(mockedChallengeRepository.list).toHaveBeenCalledWith({});
      });

      it('MUST return list of challenges', async () => {
        expect(await mediator.challengeService.getChallengesList({})).toEqual([mainEdge]);
      });
    });

    describe('WHEN "getChallenge" is called', () => {
      it('MUST get data from repository', async () => {
        await mediator.challengeService.getChallenge(mainEdge.id);

        expect(mockedChallengeRepository.get).toHaveBeenCalledWith(mainEdge.id);
      });

      it('MUST return challenges data', async () => {
        expect(await mediator.challengeService.getChallenge(mainEdge.id)).toEqual(mainEdge);
      });
    });

    describe('WHEN "updateChallenge" is called', () => {
      it('MUST convert input data to model', async () => {
        await mediator.challengeService.updateChallenge(MOCKED_MAIN_EDGE);

        expect(mockedChallengeRepository.generateModel).toHaveBeenCalledWith(MOCKED_MAIN_EDGE);
      });

      it('MUST update data in repository', async () => {
        await mediator.challengeService.updateChallenge(MOCKED_MAIN_EDGE);

        expect(mockedChallengeRepository.replace).toHaveBeenCalledWith(mainEdge);
      });

      it('MUST return boolean value', async () => {
        expect(await mediator.challengeService.updateChallenge(MOCKED_MAIN_EDGE)).toBeTruthy();
      });
    });

    describe('WHEN "createChallenge" is called', () => {
      it('MUST convert input data to model', async () => {
        await mediator.challengeService.createChallenge(MOCKED_MAIN_EDGE);

        expect(mockedChallengeRepository.generateModel).toHaveBeenCalledWith(MOCKED_MAIN_EDGE);
      });

      it('MUST generate id for model', async () => {
        await mediator.challengeService.createChallenge(MOCKED_MAIN_EDGE);

        expect(mockedChallengeRepository.generateModelId).toHaveBeenCalledWith(mainEdge);
      });

      it('MUST add data to repository', async () => {
        await mediator.challengeService.createChallenge(MOCKED_MAIN_EDGE);

        expect(mockedChallengeRepository.add).toHaveBeenCalledWith(mainEdge);
      });

      it('MUST return challenge id', async () => {
        expect(await mediator.challengeService.createChallenge(MOCKED_MAIN_EDGE)).toEqual(mainEdge.id);
      });
    });

    describe('WHEN "getEdgeInfo" is called', () => {
      it('MUST return edge info', async () => {
        const call = new CallModel(MOCKED_CALL);
        const challenge = new ChallengeModel(MOCKED_CHALLENGE);
        const reward = new RewardModel(MOCKED_REWARD);

        (mockedCallRepository.list as jest.Mock).mockResolvedValue([call]);
        (mockedChallengeRepository.list as jest.Mock).mockResolvedValue([challenge]);
        (mockedChallengeRepository.get as jest.Mock).mockResolvedValue(mainEdge);
        (mockedRewardRepository.list as jest.Mock).mockResolvedValue([reward]);

        const expected: EdgeInfo = {
          calls: [call.serialize() as ICallModel],
          challenges: [challenge.serialize() as IChallengeModel],
          info: mainEdge.serialize() as IMainEdgeModel,
          rewards: [reward.serialize() as IRewardModel],
        };

        expect(await mediator.challengeService.getEdgeInfo('test')).toEqual(expected);
      });
    });
  });

  describe('call', () => {
    const call = new CallModel(MOCKED_CALL);

    beforeEach(() => {
      (mockedCallRepository.generateModel as jest.Mock).mockReturnValue(call);
      (mockedCallRepository.list as jest.Mock).mockResolvedValue([call]);
      (mockedChallengeRepository.get as jest.Mock).mockResolvedValue(mainEdge);
      (mockedCallRepository.remove as jest.Mock).mockReturnValue(true);
      (mockedCallRepository.generateModelId as jest.Mock).mockReturnValue(true);
      (mockedCallRepository.replace as jest.Mock).mockResolvedValue(true);
      (mockedCallRepository.get as jest.Mock).mockResolvedValue(call);
      (mockedCallRepository.add as jest.Mock).mockResolvedValue(call.id);
    });

    describe('WHEN "activateCall" is called', () => {
      it('MUST get call data from repository', async () => {
        await mediator.challengeService.activateCall(call.id, 'active');

        expect(mockedCallRepository.get).toHaveBeenCalledWith(call.id);
      });

      it('MUST update call data in repository', async () => {
        await mediator.challengeService.activateCall(call.id, 'active');

        expect(mockedCallRepository.replace).toHaveBeenCalledWith(call);
      });

      it('AND new call status is "active", MUST increase challenge weight by call status', async () => {
        await mediator.challengeService.activateCall(call.id, 'active');

        expect(mockedChallengeRepository.replace).toHaveBeenCalledWith(mainEdge);
      });

      it('MUST return boolean value', async () => {
        expect(await mediator.challengeService.activateCall(call.id, 'active')).toBeTruthy();
      });
    });

    describe('WHEN "updateCall" is called', () => {
      it('MUST convert input data to model', async () => {
        await mediator.challengeService.updateCall(MOCKED_CALL);

        expect(mockedCallRepository.generateModel).toHaveBeenCalledWith(MOCKED_CALL);
      });

      it('MUST update data in repository', async () => {
        await mediator.challengeService.updateCall(MOCKED_CALL);

        expect(mockedCallRepository.replace).toHaveBeenCalledWith(call);
      });

      it('MUST return boolean value', async () => {
        expect(await mediator.challengeService.updateCall(MOCKED_CALL)).toBeTruthy();
      });
    });

    describe('WHEN "createCall" is called', () => {
      it('MUST convert input data to model', async () => {
        await mediator.challengeService.createCall(MOCKED_CALL);

        expect(mockedCallRepository.generateModel).toHaveBeenCalledWith(MOCKED_CALL);
      });

      it('MUST generate id for model', async () => {
        await mediator.challengeService.createCall(MOCKED_CALL);

        expect(mockedCallRepository.generateModelId).toHaveBeenCalledWith(call);
      });

      it('MUST update data in repository', async () => {
        await mediator.challengeService.createCall(MOCKED_CALL);

        expect(mockedCallRepository.add).toHaveBeenCalledWith(call);
      });

      it('MUST return call id', async () => {
        expect(await mediator.challengeService.createCall(MOCKED_CALL)).toEqual(call.id);
      });
    });

    describe('WHEN "removeCall" is called', () => {
      it('AND call is assigned to challenge, MUST return ui error', async () => {
        let error;

        try {
          await mediator.challengeService.removeCall(call.id);
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(new UxException('challenge_assigned_to_this_call'));
      });

      it('MUST remove call from repository', async () => {
        (mockedChallengeRepository.get as jest.Mock).mockResolvedValue(null);

        await mediator.challengeService.removeCall(call.id);

        expect(mockedCallRepository.remove).toHaveBeenCalledWith(call.id);
      });

      it('MUST return boolean value', async () => {
        (mockedChallengeRepository.get as jest.Mock).mockResolvedValue(null);

        expect(await mediator.challengeService.removeCall(call.id)).toBeTruthy();
      });
    });

    describe('WHEN "getCall" is called', () => {
      it('MUST get data from repository', async () => {
        await mediator.challengeService.getCall(call.id);

        expect(mockedCallRepository.get).toHaveBeenCalledWith(call.id);
      });

      it('MUST return call data', async () => {
        expect(await mediator.challengeService.getCall(call.id)).toEqual(call);
      });
    });

    describe('WHEN "getCallsList" is called', () => {
      it('MUST get list from repository', async () => {
        await mediator.challengeService.getCallsList({});

        expect(mockedCallRepository.list).toHaveBeenCalledWith({});
      });

      it('MUST return calls list', async () => {
        expect(await mediator.challengeService.getCallsList({})).toEqual([call]);
      });
    });
  });

  describe('rewards', () => {
    const reward = new RewardModel(MOCKED_REWARD);

    beforeEach(() => {
      (mockedRewardRepository.list as jest.Mock).mockResolvedValue([reward]);
      (mockedRewardRepository.get as jest.Mock).mockResolvedValue(reward);
      (mockedRewardRepository.add as jest.Mock).mockResolvedValue(reward.id);
      (mockedRewardRepository.replace as jest.Mock).mockResolvedValue(true);
      (mockedRewardRepository.remove as jest.Mock).mockResolvedValue(true);
      (mockedRewardRepository.generateModel as jest.Mock).mockReturnValue(reward);
    });

    describe('WHEN "removeReward" is called', () => {
      it('AND reward is assigned to edge, MUST return ui error', async () => {
        let error;

        try {
          await mediator.challengeService.removeReward(reward.id);
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(new UxException('reward_assigned_to_challenge'));
      });

      it('MUST remove data from repository', async () => {
        (mockedChallengeRepository.get as jest.Mock).mockResolvedValue(null);

        await mediator.challengeService.removeReward(reward.id);

        expect(mockedRewardRepository.remove).toHaveBeenCalledWith(reward.id);
      });

      it('MUST return boolean value', async () => {
        (mockedChallengeRepository.get as jest.Mock).mockResolvedValue(null);

        expect(await mediator.challengeService.removeReward(reward.id)).toBeTruthy();
      });
    });

    describe('WHEN "updateReward" is called', () => {
      it('MUST convert input data to model', async () => {
        await mediator.challengeService.updateReward(MOCKED_REWARD);

        expect(mockedRewardRepository.generateModel).toHaveBeenCalledWith(MOCKED_REWARD);
      });

      it('MUST update data in repository', async () => {
        await mediator.challengeService.updateReward(MOCKED_REWARD);

        expect(mockedRewardRepository.replace).toHaveBeenCalledWith(reward);
      });

      it('MUST return reward id', async () => {
        expect(await mediator.challengeService.updateReward(MOCKED_REWARD)).toEqual(true);
      });
    });

    describe('WHEN "createReward" is called', () => {
      it('MUST convert input data to model', async () => {
        await mediator.challengeService.createReward(MOCKED_REWARD);

        expect(mockedRewardRepository.generateModel).toHaveBeenCalledWith(MOCKED_REWARD);
      });

      it('MUST generate id for model', async () => {
        await mediator.challengeService.createReward(MOCKED_REWARD);

        expect(mockedRewardRepository.generateModelId).toHaveBeenCalledWith(reward);
      });

      it('MUST update data in repository', async () => {
        await mediator.challengeService.createReward(MOCKED_REWARD);

        expect(mockedRewardRepository.add).toHaveBeenCalledWith(reward);
      });

      it('MUST return reward id', async () => {
        expect(await mediator.challengeService.createReward(MOCKED_REWARD)).toEqual(reward.id);
      });
    });

    describe('WHEN "getReward" is called', () => {
      it('MUST get data from repository', async () => {
        await mediator.challengeService.getReward(reward.id);

        expect(mockedRewardRepository.get).toHaveBeenCalledWith(reward.id);
      });

      it('MUST return reward data', async () => {
        expect(await mediator.challengeService.getReward(reward.id)).toBeTruthy();
      });
    });

    describe('WHEN "getRewards" is called', () => {
      it('MUST get list from repository', async () => {
        await mediator.challengeService.getRewards({});

        expect(mockedRewardRepository.list).toHaveBeenCalledWith({});
      });

      it('MUST return rewards list', async () => {
        expect(await mediator.challengeService.getRewards({})).toEqual([reward]);
      });
    });
  });
});
