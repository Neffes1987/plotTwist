import { AbstractTextEntity } from '../../AbstractTextEntity/AbstractTextEntity';
import { Call } from '../../Call/Call';
import { AbstractCharacter } from '../../Character/AbstractCharacter/AbstractCharacter';
import { Reward } from '../../Reward/Reward';

import { ChallengeType } from './interface';

export abstract class AbstractChallenge extends AbstractTextEntity {
  readonly type: ChallengeType;
  isActive = false;

  private _reward: Nullable<Reward> = null;
  private _weight = 0;
  private _calls: Call[] = [];
  private _characters: AbstractCharacter[] = [];

  protected constructor(type: ChallengeType) {
    super();
    this.type = type;
  }

  get weight(): number {
    return this._weight;
  }

  get calls(): Call[] {
    return this._calls;
  }

  get reward(): Nullable<Reward> {
    return this._reward;
  }

  get characters(): AbstractCharacter[] {
    return this._characters;
  }

  setReward(newValue: Reward): void {
    this._reward = newValue;
  }

  setCalls(newValue: Call[]): void {
    this._calls = newValue;
  }

  setCharacters(newValue: AbstractCharacter[]): void {
    this._characters = newValue;
  }

  setWeight(newValue: number): void {
    this._weight = newValue;
  }
}
