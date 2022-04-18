import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

import {CharacterModel, ICharacterModel} from './characterModel';

export interface IMessengerModel extends ICharacterModel {
  motivation: string;
  callIds: string[];
}

export class MessengerModel extends CharacterModel {
  private _motivation = '';
  private _callIds: string[] = [];

  constructor(data: IMessengerModel) {
    super(data);
    this.setCallIds(data.callIds);
    this.setMotivation(data.motivation);
  }

  setCallIds(newValue: string[]): void {
    this._callIds = newValue;
  }

  setMotivation(newValue: string): void {
    this._motivation = newValue;
  }

  validateMap(data: IMessengerModel): void {
    super.validateMap(data);
    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.callIds == null) {
      emptyProperties.push('callIds');
    }

    if (data.motivation == null) {
      emptyProperties.push('motivation');
    } else if (data.motivation.length > this.MIDDLE_VALUE_MAX_LENGTH) {
      notSatisfiedProps.motivation = 'more_then_$MIDDLE_VALUE_MAX_LENGTH';
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      callIds: this._callIds,
      motivation: this._motivation,
    };
  }
}
