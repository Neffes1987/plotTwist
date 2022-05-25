import { FinalType, IReturnWithPotionWorldModel, PotionType } from '@backend';

import { IValidatorConfiguration } from '../../../base/interface';

import { WorldModel } from './worldModel';

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

  get finalType(): FinalType | undefined {
    return this._finalType;
  }

  get plotTwist(): string {
    return this._plotTwist;
  }

  get potionType(): PotionType | undefined {
    return this._potionType;
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
