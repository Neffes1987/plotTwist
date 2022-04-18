import {AbstractService} from '../../base/service/abstractService';
import {Command} from '../../base/service/command';
import {ServiceMediator} from '../../controller/serviceMediator';

import {CallStatus, ICallModel} from './call/callModel';
import {IChallengeModel} from './chellenge/challengeModel';
import {IRewardModel} from './reward/rewardModel';

export class ChallengeService extends AbstractService {
  constructor(mediator: ServiceMediator) {
    super(mediator);
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

  getChallengesList(page: number, limit: number) {
    return [];
  }

  toggleChallenge(challengeId: string, isPasse: boolean) {
    return true;
  }

  removeChallenge(challengeId: string) {
    return true;
  }

  clean(worldIds: string[]) {
    return true;
  }

  async executeCommand(command: Command) {}
}
