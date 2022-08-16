import { Reward } from '../../Reward/Reward';
import { AbstractCharacter } from '../AbstractCharacter/AbstractCharacter';

export class Enemy extends AbstractCharacter {
  private _reward: Nullable<Reward> = null;
  private _motivation = '';
  private _possibleToMoveAlly = '';

  constructor() {
    super('enemy');
  }

  get reward(): Nullable<Reward> {
    return this._reward;
  }

  get motivation(): string {
    return this._motivation;
  }

  get possibleToMoveAlly(): string {
    return this._possibleToMoveAlly;
  }

  setMotivation(newValue: string): void {
    this._motivation = newValue;
  }

  setReward(newValue: Reward): void {
    this._reward = newValue;
  }

  setPossibleToMoveAlly(newValue: string): void {
    this._possibleToMoveAlly = newValue;
  }
}
