import { IEnemyModel } from '@backend';

import { IValidatorConfiguration } from '../../../base/interface';

import { CharacterModel } from './characterModel';

export class EnemyModel extends CharacterModel {
  _rewardId = '';
  _motivation = '';
  _possibleToMoveAlly = '';

  constructor(data: IEnemyModel) {
    super(data);

    this.setMotivation(data.motivation);
    this.setRewardId(data.rewardId);
    this.setPossibleToMoveAlly(data.possibleToMoveAlly);
  }

  setMotivation(newValue: string): void {
    this._motivation = newValue;
  }

  setRewardId(newValue: string): void {
    this._rewardId = newValue;
  }

  setPossibleToMoveAlly(newValue: string): void {
    this._possibleToMoveAlly = newValue;
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      ...super.getValidationConfig(),
      { name: 'rewardId', max: this.SHORT_VALUE_MAX_LENGTH },
      { name: 'motivation', max: this.SHORT_VALUE_MAX_LENGTH },
      { name: 'possibleToMoveAlly', max: this.MIDDLE_VALUE_MAX_LENGTH },
    ];
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      possibleToMoveAlly: this._possibleToMoveAlly,
      motivation: this._motivation,
      rewardId: this._rewardId,
    };
  }
}
