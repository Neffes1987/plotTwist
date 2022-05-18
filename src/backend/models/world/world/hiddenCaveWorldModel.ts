import { IValidatorConfiguration } from '../../../base/abstractModel';

import { ICommonWorld, WorldModel } from './worldModel';

export interface IHiddenCaveWorldModel extends ICommonWorld {
  mainEdgeInformation: string;
  shadowIntroduction: string;
  partyPlan: string;
}

export class HiddenCaveWorldModel extends WorldModel {
  private _mainEdgeInformation = '';
  private _shadowIntroduction = '';
  private _partyPlan = '';

  constructor(data: IHiddenCaveWorldModel) {
    super('hiddenCave', data);

    this.setMainEdgeInformation(data.mainEdgeInformation);
    this.setShadowIntroduction(data.shadowIntroduction);
    this.setPartyPlan(data.partyPlan);
  }

  get mainEdgeInformation(): string {
    return this._mainEdgeInformation;
  }

  get shadowIntroduction(): string {
    return this._shadowIntroduction;
  }

  get partyPlan(): string {
    return this._partyPlan;
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

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      ...super.getValidationConfig(),
      { name: 'partyPlan', max: this.BIG_VALUE_MAX_LENGTH },
      { name: 'shadowIntroduction', max: this.BIG_VALUE_MAX_LENGTH },
      { name: 'mainEdgeInformation', max: this.BIG_VALUE_MAX_LENGTH },
    ];
  }
}
