import { IValidatorConfiguration } from '../../../base/abstractModel';
import { UxException } from '../../../base/errors/uxException';

import { ChallengeModel, IChallengeModel } from './challengeModel';

export type MainEdgeType =
  | 'meetingWithMainFear'
  | 'fatherConfrontation'
  | 'youthVersusOldAge'
  | 'imaginaryHeroDeath'
  | 'asDeathWitness'
  | 'causeOfDeath'
  | 'shadowEncounter'
  | 'heartCrisis'
  | 'throughEyesOfPsychopath';

export type ShadowEncounterType = 'demonization' | 'deathOfVillain' | 'villainGetaway' | 'shadowHeroOfHisStory';

export type HeartCrisisType = 'sacredMarriage' | 'equilibrium' | 'loveThatKills';

export interface IMainEdgeModel extends IChallengeModel {
  shadowId: string;
  edgeImpact: string;
  challengeIds: string[];
  mainEdgeType?: MainEdgeType;
  shadowEncounterType?: ShadowEncounterType;
  heartCrisis?: HeartCrisisType;
}

export class MainEdgeModel extends ChallengeModel {
  static readonly CHALLENGE_IDS_MIN_VALUE = 2;

  private _shadowId = '';
  private _edgeImpact = '';
  private _challengeIds: string[] = [];
  private _mainEdgeType?: MainEdgeType;
  private _shadowEncounterType?: ShadowEncounterType;
  private _heartCrisis?: HeartCrisisType;

  constructor(data: IMainEdgeModel) {
    super(data);

    this.setShadowId(data.shadowId);
    this.setEdgeImpact(data.edgeImpact);
    this.setChallengeIds(data.challengeIds);
    this.setMainEdgeType(data.mainEdgeType);

    if (data.mainEdgeType === 'heartCrisis' && !data.heartCrisis) {
      throw new UxException('"MainEdgeType" is "heartCrisis", but field "heartCrisis" is not provided');
    } else {
      this.setHeartCrisis(data.heartCrisis);
    }

    if (data.mainEdgeType === 'shadowEncounter' && !data.shadowEncounterType) {
      throw new UxException('"MainEdgeType" is "shadowEncounter", but field "shadowEncounterType" is not provided');
    } else {
      this.setShadowEncounterType(data.shadowEncounterType);
    }
  }

  setShadowId(newValue: string): void {
    this._shadowId = newValue;
  }

  setEdgeImpact(newValue: string): void {
    this._edgeImpact = newValue;
  }

  setMainEdgeType(newValue?: MainEdgeType): void {
    this._mainEdgeType = newValue;
  }

  setShadowEncounterType(newValue?: ShadowEncounterType): void {
    this._shadowEncounterType = newValue;
  }

  setHeartCrisis(newValue?: HeartCrisisType): void {
    this._heartCrisis = newValue;
  }

  setChallengeIds(newValue: string[]): void {
    this._challengeIds = newValue;
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      shadowId: this._shadowId,
      challengeIds: this._challengeIds,
      edgeImpact: this._edgeImpact,
      mainEdgeType: this._mainEdgeType,
      shadowEncounterType: this._shadowEncounterType,
      heartCrisis: this._heartCrisis,
    };
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      ...super.getValidationConfig(),
      { name: 'shadowId' },
      { name: 'mainEdgeType' },
      {
        name: 'challengeIds',
        min: MainEdgeModel.CHALLENGE_IDS_MIN_VALUE,
      },
      {
        name: 'edgeImpact',
        max: this.MIDDLE_VALUE_MAX_LENGTH,
      },
    ];
  }
}
