import { AbstractModel, IAbstractModel, IValidatorConfiguration } from '../../../base/abstractModel';

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

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      { name: 'rewardId' },
      { name: 'type' },
      { name: 'name', max: this.MIDDLE_VALUE_MAX_LENGTH },
      { name: 'description', max: this.BIG_VALUE_MAX_LENGTH },
      { name: 'plotGoal', max: this.BIG_VALUE_MAX_LENGTH },
      { name: 'callIds', min: ChallengeModel.CALLS_MIN_VALUE },
      { name: 'characterIds', min: ChallengeModel.CHARACTERS_MIN_VALUE },
      { name: 'brokenLawIds', min: ChallengeModel.BROKEN_LAWS_MIN_VALUE },
    ];
  }
}
