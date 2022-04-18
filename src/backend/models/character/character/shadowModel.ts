import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

import {CharacterModel, ICharacterModel} from './characterModel';

export interface IShadowModel extends ICharacterModel {
  rewardId: string;
  motivation: string;
  visionOnSituation: string;
}

export class ShadowModel extends CharacterModel {
  private _rewardId = '';
  private _motivation = '';
  private _visionOnSituation = '';

  constructor(data: IShadowModel) {
    super(data);

    this.setRewardId(data.rewardId);
    this.setMotivation(data.motivation);
    this.setVisionOnSituation(data.visionOnSituation);
  }

  setMotivation(newValue: string): void {
    this._motivation = newValue;
  }

  setRewardId(newValue: string): void {
    this._rewardId = newValue;
  }

  setVisionOnSituation(newValue: string): void {
    this._visionOnSituation = newValue;
  }

  validateMap(data: IShadowModel): void {
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

    if (data.visionOnSituation == null) {
      emptyProperties.push('visionOnSituation');
    } else if (data.visionOnSituation.length > this.BIG_VALUE_MAX_LENGTH) {
      notSatisfiedProps.visionOnSituation = 'more_then_$BIG_VALUE_MAX_LENGTH';
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      visionOnSituation: this._visionOnSituation,
      motivation: this._motivation,
      rewardId: this._rewardId,
    };
  }
}
