import { AbstractModel, IAbstractModel, IValidatorConfiguration } from '../../../base/abstractModel';

export interface IRewardModel extends IAbstractModel {
  challengeId: string;
}

export class RewardModel extends AbstractModel {
  private _challengeId = '';

  constructor(data: IRewardModel) {
    super(data);
    this.setChallengeId(data.challengeId);
  }

  setChallengeId(newValue: string): void {
    this._challengeId = newValue;
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [{ name: 'challengeId' }, { name: 'name' }, { name: 'description' }];
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      challengeId: this._challengeId,
    };
  }
}
