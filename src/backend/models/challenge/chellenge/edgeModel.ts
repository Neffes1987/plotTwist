import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

import {ChallengeModel, IChallengeModel} from './challengeModel';

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

  validateMap(data: IEdgeModel): void {
    super.validateMap(data);

    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.guardId == null) {
      emptyProperties.push('guardId');
    }

    if (data.challengeIds == null) {
      emptyProperties.push('challengeIds');
    } else if (data.challengeIds.length < EdgeModel.CHALLENGE_IDS_MIN_VALUE) {
      notSatisfiedProps.challengeIds = 'less_then_$CHALLENGE_IDS_MIN_VALUE';
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      guardId: this._guardId,
      challengeIds: this._challengeIds,
    };
  }
}
