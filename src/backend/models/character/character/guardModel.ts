import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

import {CharacterModel, ICharacterModel} from './characterModel';

export interface IGuardModel extends ICharacterModel {
  becameAlly: string;
  becameEnemy: string;
}
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

  validateMap(data: IGuardModel): void {
    super.validateMap(data);
    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.becameAlly == null) {
      emptyProperties.push('becameAlly');
    } else if (data.becameAlly.length > this.SHORT_VALUE_MAX_LENGTH) {
      notSatisfiedProps.becameAlly = 'more_then_$SHORT_VALUE_MAX_LENGTH';
    }

    if (data.becameEnemy == null) {
      emptyProperties.push('becameEnemy');
    } else if (data.becameEnemy.length > this.SHORT_VALUE_MAX_LENGTH) {
      notSatisfiedProps.becameEnemy = 'more_then_$SHORT_VALUE_MAX_LENGTH';
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      becameEnemy: this._becameEnemy,
      becameAlly: this._becameAlly,
    };
  }
}
