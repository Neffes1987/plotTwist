import { IGuardModel } from '@backend';

import { IValidatorConfiguration } from '../../../base/interface';

import { CharacterModel } from './characterModel';

export class GuardModel extends CharacterModel {
  private _becameAlly = '';
  private _becameEnemy = '';

  constructor(data: IGuardModel) {
    super(data);
    this.setBecameAlly(data.becameAlly);
    this.setBecameEnemy(data.becameEnemy);
  }

  setBecameAlly(newValue: string): void {
    this._becameAlly = newValue;
  }

  setBecameEnemy(newValue: string): void {
    this._becameEnemy = newValue;
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      ...super.getValidationConfig(),
      {
        name: 'becameAlly',
        max: this.SHORT_VALUE_MAX_LENGTH,
      },
      {
        name: 'becameEnemy',
        max: this.SHORT_VALUE_MAX_LENGTH,
      },
    ];
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      becameEnemy: this._becameEnemy,
      becameAlly: this._becameAlly,
    };
  }
}
