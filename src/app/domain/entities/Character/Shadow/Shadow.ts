import { Reward } from '../../Reward/Reward';
import { AbstractCharacter } from '../AbstractCharacter/AbstractCharacter';

export class Shadow extends AbstractCharacter {
  private _reward: Nullable<Reward> = null;
  private _motivation = '';
  private _visionOnSituation = '';

  constructor() {
    super('shadow');
  }

  get motivation(): string {
    return this._motivation;
  }

  get reward(): Nullable<Reward> {
    return this._reward;
  }

  get visionOnSituation(): string {
    return this._visionOnSituation;
  }

  setMotivation(newValue: string): void {
    this._motivation = newValue;
  }

  setReward(newValue: Reward): void {
    this._reward = newValue;
  }

  setVisionOnSituation(newValue: string): void {
    this._visionOnSituation = newValue;
  }
}
