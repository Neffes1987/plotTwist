import { IShadowModel } from '@backend';

import { IValidatorConfiguration } from '../../../base/interface';

import { CharacterModel } from './characterModel';

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

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      ...super.getValidationConfig(),
      { name: 'rewardId', max: this.SHORT_VALUE_MAX_LENGTH },
      { name: 'motivation', max: this.MIDDLE_VALUE_MAX_LENGTH },
      { name: 'visionOnSituation', max: this.BIG_VALUE_MAX_LENGTH },
    ];
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
