import { IListQuery } from '../../base/abstractRepository';
import { UnexpectedErrorCode } from '../../base/errors/errorLog';
import { AbstractService } from '../../base/service/abstractService';
import { ServiceMediator } from '../../controller/serviceMediator';

import { CallModel, CallStatus, ICallModel } from './call/callModel';
import { CallRepository } from './call/callRepository';
import { ChallengeModel, IChallengeModel } from './challenge/challengeModel';
import { ChallengeRepository, ChallengeRepositoryProps } from './challenge/challengeRepository';
import { EdgeModel } from './challenge/edgeModel';
import { IRewardModel, RewardModel } from './reward/rewardModel';
import { RewardRepository } from './reward/rewardRepository';

export class ChallengeService extends AbstractService {
  private readonly _challengeRepository: ChallengeRepository;
  private readonly _callRepository: CallRepository;
  private readonly _rewardRepository: RewardRepository;

  constructor(mediator: ServiceMediator) {
    super(mediator);

    this._challengeRepository = new ChallengeRepository();
    this._callRepository = new CallRepository();
    this._rewardRepository = new RewardRepository();
  }

  async getRewards(props: IListQuery): Promise<RewardModel[]> {
    return this._rewardRepository.list(props);
  }

  async getReward(rewardId: string): Promise<Nullable<RewardModel>> {
    return this._rewardRepository.get(rewardId);
  }

  async createReward(data: IRewardModel): Promise<string> {
    const call = this._rewardRepository.generateModel(data);

    this._rewardRepository.generateModelId(call);

    return this._rewardRepository.add(call);
  }

  async updateReward(data: IRewardModel): Promise<boolean> {
    const call = this._rewardRepository.generateModel(data);

    return this._rewardRepository.replace(call);
  }

  async removeReward(rewardId: string): Promise<boolean> {
    const reward = await this.getReward(rewardId);

    if (!reward) {
      return true;
    }

    const challenge = await this.getChallenge(reward.challengeId);

    if (challenge) {
      throw this.errorLog.formatUnexpectedError(UnexpectedErrorCode.rewardAssignedToChallenge);
    }

    return this._rewardRepository.remove(rewardId);
  }

  // cals
  async getCallsList(props: IListQuery): Promise<CallModel[]> {
    return this._callRepository.list(props);
  }

  async getCall(callId: string): Promise<Nullable<CallModel>> {
    return this._callRepository.get(callId);
  }

  async removeCall(callId: string): Promise<boolean> {
    const call = await this.getCall(callId);

    if (!call) {
      return true;
    }

    const challenge = await this.getChallenge(call.challengeId);

    if (challenge) {
      throw this.errorLog.formatUnexpectedError(UnexpectedErrorCode.challengeAssignedToThisCall);
    }

    return this._callRepository.remove(callId);
  }

  async createCall(data: ICallModel): Promise<string> {
    const call = this._callRepository.generateModel(data);

    this._callRepository.generateModelId(call);

    return this._callRepository.add(call);
  }

  async updateCall(data: ICallModel): Promise<boolean> {
    const call = this._callRepository.generateModel(data);

    return this._callRepository.replace(call);
  }

  async activateCall(callId: string, status: CallStatus): Promise<boolean> {
    const call = await this.getCall(callId);

    if (!call) {
      throw this.errorLog.formatUnexpectedError(UnexpectedErrorCode.unableToFindCallById);
    }

    call.setStatus(status);

    await this._callRepository.replace(call);

    if (call.status === 'active') {
      await this.changeChallengeWeight(call.challengeId);
    }

    return true;
  }

  // challenge

  async createChallenge(data: IChallengeModel): Promise<string> {
    const model = this._challengeRepository.generateModel(data);

    this._challengeRepository.generateModelId(model);

    return this._challengeRepository.add(model);
  }

  async updateChallenge(data: IChallengeModel): Promise<boolean> {
    const model = this._challengeRepository.generateModel(data);

    return this._challengeRepository.replace(model);
  }

  async getChallenge(challengeId: string): Promise<Nullable<ChallengeModel>> {
    return this._challengeRepository.get(challengeId);
  }

  async getChallengesList(props: ChallengeRepositoryProps): Promise<ChallengeModel[]> {
    return this._challengeRepository.list(props);
  }

  async toggleEdgeStatus(challengeId: string, isPassed: boolean): Promise<boolean> {
    const edge = await this._challengeRepository.get(challengeId);

    if (!edge) {
      throw this.errorLog.formatUnexpectedError(UnexpectedErrorCode.providedIdNotAChallenge);
    }

    (edge as EdgeModel).setIsActive(isPassed);

    await this._challengeRepository.replace(edge);

    if (edge.type === 'edge' || edge.type === 'mainEdge') {
      const worlds = await this.mediator.worldService.getWorldsList({ edgeId: edge.id });

      await this.mediator.worldService.activateWorld(worlds[0].id, isPassed ? 'finished' : 'release');
    }

    return true;
  }

  async changeChallengeWeight(challengeId: string, weight?: number): Promise<boolean> {
    const challenge = await this._challengeRepository.get(challengeId);

    if (!challenge) {
      throw this.errorLog.formatUnexpectedError(UnexpectedErrorCode.challengeNotFound);
    }

    challenge.setWeight(weight ?? challenge.weight + 1);

    return this._challengeRepository.replace(challenge);
  }

  async removeChallenge(challengeId: string): Promise<boolean> {
    const challenge = await this.getChallenge(challengeId);

    if (!challenge) {
      return true;
    }

    if (challenge.type === 'mainEdge') {
      throw this.errorLog.formatUnexpectedError(UnexpectedErrorCode.mainEdgeCanNotBeDeleted);
    }

    if (challenge.type === 'edge') {
      throw this.errorLog.formatUnexpectedError(UnexpectedErrorCode.edgeCanNotBeDeleted);
    }

    const edge = await this._challengeRepository.getEdgeByChallengeId(challenge.id);

    if (!edge) {
      return this._challengeRepository.remove(challenge.id);
    }

    const challengesIds = (edge as EdgeModel).challengeIds;

    if (challengesIds.length - 1 < EdgeModel.CHALLENGE_IDS_MIN_VALUE) {
      throw this.errorLog.formatUnexpectedError(UnexpectedErrorCode.notEnoughChallenges);
    }

    return true;
  }
}
