import {AbstractModel, IAbstractModel} from '../../../base/abstractModel';
import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

export type ChallengeType = 'challenge' | 'edge' | 'mainEdge';

export interface IChallengeModel extends IAbstractModel {
  plotGoal: string;
  rewardId: string;
  weight: number;
  callIds: string[];
  brokenLawIds: string[];
  characterIds: string[];
  type: ChallengeType;
}

export class ChallengeModel extends AbstractModel {
  static readonly CALLS_MIN_VALUE = 2;
  static readonly CHARACTERS_MIN_VALUE = 1;
  static readonly BROKEN_LAWS_MIN_VALUE = 1;

  private _plotGoal = '';
  private _rewardId = '';
  private _weight = 0;
  private readonly _type: ChallengeType = 'challenge';
  private _callIds: string[] = [];
  private _brokenLawIds: string[] = [];
  private _characterIds: string[] = [];

  constructor(data: IChallengeModel) {
    super(data);
    this.setBrokenLawIds(data.brokenLawIds);
    this.setPlotGoal(data.plotGoal);
    this.setRewardId(data.rewardId);
    this.setWeight(data.weight);
    this.setCallIds(data.callIds);
    this.setCharacterIds(data.characterIds);
    this._type = data.type;
  }

  setPlotGoal(newValue: string): void {
    this._plotGoal = newValue;
  }

  setRewardId(newValue: string): void {
    this._rewardId = newValue;
  }

  setCallIds(newValue: string[]): void {
    this._callIds = newValue;
  }

  setCharacterIds(newValue: string[]): void {
    this._characterIds = newValue;
  }

  setBrokenLawIds(newValue: string[]): void {
    this._brokenLawIds = newValue;
  }

  setWeight(newValue: number): void {
    this._weight = newValue;
  }

  validateMap(data: IChallengeModel): void {
    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.rewardId == null) {
      emptyProperties.push('rewardId');
    }

    if (data.type == null) {
      emptyProperties.push('type');
    }

    if (data.name == null) {
      emptyProperties.push('name');
    } else if (data.name.length > this.MIDDLE_VALUE_MAX_LENGTH) {
      notSatisfiedProps.name = 'more_then_$MIDDLE_VALUE_MAX_LENGTH';
    }

    if (data.description == null) {
      emptyProperties.push('description');
    } else if (data.description.length > this.BIG_VALUE_MAX_LENGTH) {
      notSatisfiedProps.description = 'more_then_$BIG_VALUE_MAX_LENGTH';
    }

    if (data.plotGoal == null) {
      emptyProperties.push('plotGoal');
    } else if (data.plotGoal.length > this.BIG_VALUE_MAX_LENGTH) {
      notSatisfiedProps.plotGoal = 'more_then_$BIG_VALUE_MAX_LENGTH';
    }

    if (data.callIds == null) {
      emptyProperties.push('callIds');
    } else if (data.callIds.length < ChallengeModel.CALLS_MIN_VALUE) {
      notSatisfiedProps.callIds = 'less_then_$CALLS_MIN_VALUE';
    }

    if (data.characterIds == null) {
      emptyProperties.push('characterIds');
    } else if (data.characterIds.length < ChallengeModel.CHARACTERS_MIN_VALUE) {
      notSatisfiedProps.characterIds = 'less_then_$CHARACTERS_MIN_VALUE';
    }

    if (data.brokenLawIds == null) {
      emptyProperties.push('brokenLawIds');
    } else if (data.brokenLawIds.length < ChallengeModel.BROKEN_LAWS_MIN_VALUE) {
      notSatisfiedProps.brokenLawIds = 'less_then_$BROKEN_LAWS_MIN_VALUE';
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      callIds: this._callIds,
      characterIds: this._characterIds,
      brokenLawIds: this._brokenLawIds,
      plotGoal: this._plotGoal,
      rewardId: this._rewardId,
      weight: this._weight,
      type: this._type,
    };
  }
}
