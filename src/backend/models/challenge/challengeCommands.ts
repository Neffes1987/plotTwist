import {Command} from '../../base/service/command';
import {ServiceType} from '../../controller/serviceMediator';

import {IChallengeModel} from './chellenge/challengeModel';

export class ChallengeCommands {
  static readonly createChallengeOperation = 'createChallenge';
  static readonly getChallengeOperation = 'getChallenge';

  static createChallenge(challengeData: IChallengeModel): Command {
    return new Command(
      ServiceType.challenge,
      ChallengeCommands.createChallengeOperation,
      (challengeData as unknown) as Record<string, unknown>,
    );
  }

  static getChallenge(challengeId: string): Command {
    return new Command(
      ServiceType.challenge,
      ChallengeCommands.getChallengeOperation,
      {id: challengeId},
    );
  }
}
