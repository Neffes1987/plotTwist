import { DEFINED_VALUE, IValidatorConfiguration } from '../../../base/abstractModel';

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
  }

  setShadowId(newValue: string): void {
    this._shadowId = newValue;
  }

  setEdgeImpart(newValue: string): void {
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
        name: 'heartCrisis',
        when: [
          {
            rootFieldName: 'mainEdgeType',
            rootFieldConditionValue: 'heartCrisis',
            expectedValue: DEFINED_VALUE,
          },
        ],
      },
      {
        name: 'shadowEncounterType',
        when: [
          {
            rootFieldName: 'mainEdgeType',
            rootFieldConditionValue: 'shadowEncounter',
            expectedValue: DEFINED_VALUE,
          },
        ],
      },
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
