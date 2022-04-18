import 'package:plot_twist_app/models/domain/base/abstract_model.dart';
import '../../../controller/errors/errorLog.dart';
import '../../../controller/uxException.dart';
import 'challenge_model.dart';

import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

import {ChallengeModel, IChallengeModel} from './challengeModel';

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

  _shadowId = '';
  _edgeImpact = '';
  _challengeIds: string[] = [];
  _mainEdgeType?: MainEdgeType;
  _shadowEncounterType?: ShadowEncounterType;
  _heartCrisis?: HeartCrisisType;

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

  validateMap(data: IMainEdgeModel): void {
    super.validateMap(data);

    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.shadowId == null) {
      emptyProperties.push('shadowId');
    }

    if (data.mainEdgeType == null) {
      emptyProperties.push('mainEdgeType');
    }

    if (data.mainEdgeType === 'heartCrisis' && data.heartCrisis == null) {
      emptyProperties.push('heartCrisisType');
    }

    if (data.mainEdgeType === 'shadowEncounter' && data.shadowEncounterType == null) {
      emptyProperties.push('shadowEncounterType');
    }

    if (data.challengeIds == null) {
      emptyProperties.push('challengeIds');
    } else if (data.challengeIds.length < MainEdgeModel.CHALLENGE_IDS_MIN_VALUE) {
      notSatisfiedProps.challengeIds = 'less_then_$CHALLENGE_IDS_MIN_VALUE';
    }

    if (data.edgeImpact == null) {
      emptyProperties.push('edgeImpact');
    } else if (data.edgeImpact.length > this.MIDDLE_VALUE_MAX_LENGTH) {
      notSatisfiedProps.edgeImpact = 'more_then_$MIDDLE_VALUE_MAX_LENGTH';
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
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
}
