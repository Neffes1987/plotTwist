import { IValidatorConfiguration } from '../../../base/abstractModel';

import { ICommonWorld, WorldModel } from './worldModel';

export type FinalType = 'cycle' | 'achievePerfect' | 'openEnd';

export type PotionType = 'wisdom' | 'love' | 'responsible' | 'tragedy' | 'badExperience' | 'wastedTime';

export interface IReturnWithPotionWorldModel extends ICommonWorld {
  finalType: FinalType;
  potionType: PotionType;
  plotTwist: string;
}

export class ReturnWithPotionWorldModel extends WorldModel {
  _finalType?: FinalType;
  _potionType?: PotionType;
  _plotTwist = '';

  constructor(data: IReturnWithPotionWorldModel) {
    super('returnWithPotion', data);

    this.setFinalType(data.finalType);
    this.setPotionType(data.potionType);
    this.setPlotTwist(data.plotTwist);
  }

  setFinalType(newValue?: FinalType): void {
    this._finalType = newValue;
  }

  setPotionType(newValue?: PotionType): void {
    this._potionType = newValue;
  }

  setPlotTwist(newValue: string): void {
    this._plotTwist = newValue;
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      finalType: this._finalType,
      potionType: this._potionType,
      plotTwist: this._plotTwist,
    };
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      ...super.getValidationConfig(),
      { name: 'finalType' },
      { name: 'potionType' },
      {
        name: 'plotTwist',
        max: this.BIG_VALUE_MAX_LENGTH,
      },
    ];
  }
}
