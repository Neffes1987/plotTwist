import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

import {ICommonWorld, WorldModel} from './worldModel';

export interface IHiddenCaveWorldModel extends ICommonWorld {
  mainEdgeInformation: string;
  shadowIntroduction: string;
  partyPlan: string;
}

export class HiddenCaveWorldModel extends WorldModel {
  static readonly PARTY_PLAN_MAX_LENGTH = 2048;
  static readonly SHADOW_INTRO_MAX_LENGTH = 2048;
  static readonly MAIN_EDGE_MAX_LENGTH = 2048;

  private _mainEdgeInformation = '';
  private _shadowIntroduction = '';
  private _partyPlan = '';

  constructor(data: IHiddenCaveWorldModel) {
    super('hiddenCave', data);

    this.setMainEdgeInformation(data.mainEdgeInformation);
    this.setShadowIntroduction(data.shadowIntroduction);
    this.setPartyPlan(data.partyPlan);
  }

  setPartyPlan(newValue: string): void {
    this._partyPlan = newValue;
  }

  setShadowIntroduction(newValue: string): void {
    this._shadowIntroduction = newValue;
  }

  setMainEdgeInformation(newValue: string): void {
    this._mainEdgeInformation = newValue;
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      mainEdgeInformation: this._mainEdgeInformation,
      shadowIntroduction: this._shadowIntroduction,
      partyPlan: this._partyPlan,
    };
  }

  validateMap(data: IHiddenCaveWorldModel): void {
    super.validateMap(data);

    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.partyPlan == null) {
      emptyProperties.push('partyPlan');
    } else if (data.partyPlan.length > HiddenCaveWorldModel.PARTY_PLAN_MAX_LENGTH) {
      notSatisfiedProps.partyPlan = 'more_then_$PARTY_PLAN_MAX_LENGTH';
    }

    if (data.shadowIntroduction == null) {
      emptyProperties.push('shadowIntroduction');
    } else if (data.shadowIntroduction.length > HiddenCaveWorldModel.SHADOW_INTRO_MAX_LENGTH) {
      notSatisfiedProps.shadowIntroduction = 'more_then_$SHADOW_INTRO_MAX_LENGTH';
    }

    if (data.mainEdgeInformation == null) {
      emptyProperties.push('mainEdgeInformation');
    } else if (data.mainEdgeInformation.length > HiddenCaveWorldModel.MAIN_EDGE_MAX_LENGTH) {
      notSatisfiedProps.mainEdgeInformation = 'more_then_$MAIN_EDGE_MAX_LENGTH';
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }
}
