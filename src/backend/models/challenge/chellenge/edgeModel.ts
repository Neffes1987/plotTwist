import { IValidatorConfiguration } from '../../../base/abstractModel';

import { ChallengeModel, IChallengeModel } from './challengeModel';

export interface IEdgeModel extends IChallengeModel {
  guardId: string;
  challengeIds: string[];
}

export class EdgeModel extends ChallengeModel {
  static readonly CHALLENGE_IDS_MIN_VALUE = 2;

  private _guardId = '';
  private _challengeIds: string[] = [];

  constructor(data: IEdgeModel) {
    super(data);
  }

  setGuardId(newValue: string): void {
    this._guardId = newValue;
  }

  setChallengeIds(newValue: string[]): void {
    this._challengeIds = newValue;
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      guardId: this._guardId,
      challengeIds: this._challengeIds,
    };
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      ...super.getValidationConfig(),
      { name: 'guardId' },
      {
        name: 'challengeIds',
        min: EdgeModel.CHALLENGE_IDS_MIN_VALUE,
      },
    ];
  }
}
