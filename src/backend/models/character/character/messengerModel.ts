import { IMessengerModel } from '@backend';

import { IValidatorConfiguration } from '../../../base/interface';

import { CharacterModel } from './characterModel';

export class MessengerModel extends CharacterModel {
  private _motivation = '';
  private _callIds: string[] = [];
  private _waterholeIds: string[] = [];

  constructor(data: IMessengerModel) {
    super(data);
    this.setCallIds(data.callIds);
    this.setMotivation(data.motivation);
    this.setWaterholes(data.waterholesIds);
  }

  get callIds(): string[] {
    return this._callIds;
  }

  get waterholeIds(): string[] {
    return this._waterholeIds;
  }

  setCallIds(newValue: string[]): void {
    this._callIds = newValue;
  }

  setWaterholes(newValue: string[]): void {
    this._waterholeIds = newValue;
  }

  setMotivation(newValue: string): void {
    this._motivation = newValue;
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      ...super.getValidationConfig(),
      { name: 'callIds' },
      { name: 'waterholesIds' },
      {
        name: 'motivation',
        max: this.MIDDLE_VALUE_MAX_LENGTH,
      },
    ];
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      callIds: this._callIds,
      motivation: this._motivation,
      waterholesIds: this._waterholeIds,
    };
  }
}
