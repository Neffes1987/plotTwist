import {AbstractModel, IAbstractModel} from '../../../base/abstractModel';
import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

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

  validateMap(data: IRewardModel): void {
    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.challengeId == null) {
      emptyProperties.push('challengeId');
    }

    if (data.name == null) {
      emptyProperties.push('name');
    }

    if (data.description == null) {
      emptyProperties.push('description');
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      challengeId: this._challengeId,
    };
  }
}
