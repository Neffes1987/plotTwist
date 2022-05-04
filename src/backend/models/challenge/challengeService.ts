import { AbstractService } from '../../base/service/abstractService';
import { ServiceMediator } from '../../controller/serviceMediator';

import { CallStatus, ICallModel } from './call/callModel';
import { ChallengeModel, IChallengeModel } from './challenge/challengeModel';
import { ChallengeRepository, ChallengeRepositoryProps } from './challenge/challengeRepository';
import { IRewardModel } from './reward/rewardModel';

export class ChallengeService extends AbstractService {
  private readonly _challengeRepository: ChallengeRepository;

  constructor(mediator: ServiceMediator) {
    super(mediator);

    this._challengeRepository = new ChallengeRepository();
  }

  getRewards(page: number, limit: number, challengeIds: string[]) {
    return [];
  }

  getReward(rewardId: string) {
    return null;
  }

  createReward(data: IRewardModel) {
    return '';
  }

  updateReward(data: IRewardModel) {
    return true;
  }

  removeReward(rewardId: string) {
    return true;
  }

  // cals

  getCallsList(page: number, limit: number, challengeIds: string[]) {
    return [];
  }

  getCall(callId: string) {
    return null;
  }

  removeCall(callId: string) {
    return true;
  }

  createCall(data: ICallModel) {
    return '';
  }

  updateCall(data: ICallModel) {
    return true;
  }

  activateCall(callId: string, status: CallStatus) {
    return true;
  }

  // challenge

  createChallenge(data: IChallengeModel) {
    return '';
  }

  updateChallenge(data: IChallengeModel) {
    return true;
  }

  getChallenge(challengeId: string) {
    return null;
  }

  async getChallengesList(props: ChallengeRepositoryProps): Promise<ChallengeModel[]> {
    return this._challengeRepository.list(props);
  }

  toggleChallenge(challengeId: string, isPasse: boolean) {
    return true;
  }

  removeChallenge(challengeId: string) {
    return true;
  }
}
