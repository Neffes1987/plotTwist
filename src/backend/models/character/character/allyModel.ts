import { AllyType, IAllyModel } from '@backend';

import { IValidatorConfiguration } from '../../../base/interface';

import { CharacterModel } from './characterModel';

export class AllyModel extends CharacterModel {
  private _isAllyForParty = false;
  private _allyForHero = '';
  private _callForAlly = '';
  private _allyType?: AllyType;

  constructor(data: IAllyModel) {
    super(data);

    this.setAllyForHero(data.allyForHero);
    this.setIsAllyForParty(data.isAllyForParty);
    this.setCallForAlly(data.callForAlly);
    this.setAllyType(data.allyType);
  }

  setIsAllyForParty(newValue: boolean): void {
    this._isAllyForParty = newValue;
    this._allyForHero = '';
  }

  setAllyForHero(newValue: string): void {
    this._isAllyForParty = false;
    this._allyForHero = newValue;
  }

  setCallForAlly(newValue: string): void {
    this._callForAlly = newValue;
  }

  setAllyType(newValue?: AllyType): void {
    this._allyType = newValue;
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      ...super.getValidationConfig(),
      { name: 'isAllyForParty' },
      { name: 'allyType' },
      { name: 'allyForHero', max: this.SHORT_VALUE_MAX_LENGTH },
      { name: 'callForAlly', max: this.SHORT_VALUE_MAX_LENGTH },
    ];
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      isAllyForParty: this._isAllyForParty,
      allyForHero: this._allyForHero,
      callForAlly: this._callForAlly,
      allyType: this._allyType,
    };
  }
}
