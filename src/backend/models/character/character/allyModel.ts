import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

import {CharacterModel, ICharacterModel} from './characterModel';

export type AllyType = 'bosomFriend' | 'highWorldAlly' | 'animal' | 'undeadAlly' | 'agileServant';

export interface IAllyModel extends ICharacterModel {
  isAllyForParty: boolean;
  allyForHero: string;
  callForAlly: string;
  allyType?: AllyType;
}

export class AllyModel extends CharacterModel {
  _isAllyForParty = false;
  _allyForHero = '';
  _callForAlly = '';
  _allyType?: AllyType;

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

  validateMap(data: IAllyModel): void {
    super.validateMap(data);
    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.isAllyForParty == null) {
      emptyProperties.push('isAllyForParty');
    }

    if (data.allyForHero == null) {
      emptyProperties.push('allyForHero');
    } else if (data.allyForHero.length > this.SHORT_VALUE_MAX_LENGTH) {
      notSatisfiedProps.allyForHero = 'more_then_$SHORT_VALUE_MAX_LENGTH';
    }

    if (data.callForAlly == null) {
      emptyProperties.push('callForAlly');
    } else if (data.callForAlly.length > this.SHORT_VALUE_MAX_LENGTH) {
      notSatisfiedProps.callForAlly = 'more_then_$SHORT_VALUE_MAX_LENGTH';
    }

    if (data.allyType == null) {
      emptyProperties.push('allyType');
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
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
