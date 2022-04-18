import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

import {CharacterModel, ICharacterModel} from './characterModel';

export interface IEnemyModel extends ICharacterModel {
  rewardId: string;
  motivation: string;
  possibleToMoveAlly: string;
}

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

  validateMap(data: IEnemyModel): void {
    super.validateMap(data);
    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.rewardId == null) {
      emptyProperties.push('rewardId');
    } else if (data.rewardId.length > this.SHORT_VALUE_MAX_LENGTH) {
      notSatisfiedProps.rewardId = 'more_then_$SHORT_VALUE_MAX_LENGTH';
    }

    if (data.motivation == null) {
      emptyProperties.push('motivation');
    } else if (data.motivation.length > this.MIDDLE_VALUE_MAX_LENGTH) {
      notSatisfiedProps.motivation = 'more_then_$MIDDLE_VALUE_MAX_LENGTH';
    }

    if (data.possibleToMoveAlly == null) {
      emptyProperties.push('possibleToMoveAlly');
    } else if (data.possibleToMoveAlly.length > this.MIDDLE_VALUE_MAX_LENGTH) {
      notSatisfiedProps.possibleToMoveAlly =
        'more_then_$MIDDLE_VALUE_MAX_LENGTH';
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
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
