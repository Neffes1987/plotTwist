import { IRewardModel } from '@backend';

import { AbstractModel } from '../../../base/abstractModel';
import { IValidatorConfiguration } from '../../../base/interface';

export class RewardModel extends AbstractModel {
  private _challengeId = '';

  constructor(data: IRewardModel) {
    super(data);
    this.setChallengeId(data.challengeId);
  }

  get challengeId(): string {
    return this._challengeId;
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
