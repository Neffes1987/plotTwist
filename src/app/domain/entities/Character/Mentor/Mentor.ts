import { Reward } from '../../Reward/Reward';
import { AbstractCharacter } from '../AbstractCharacter/AbstractCharacter';

import { KnowledgeType, MentorType } from './interface';

export class Mentor extends AbstractCharacter {
  readonly mentorType: MentorType;
  private _reward: Nullable<Reward> = null;
  private _knowledgeType: Nullable<KnowledgeType> = null;

  constructor(mentorType: MentorType) {
    super('mentor');
    this.mentorType = mentorType;
  }

  get knowledgeType(): Nullable<KnowledgeType> {
    return this._knowledgeType;
  }

  get reward(): Nullable<Reward> {
    return this._reward;
  }

  setKnowledgeType(newValue: KnowledgeType): void {
    this._knowledgeType = newValue;
  }

  setReward(newValue: Reward): void {
    this._reward = newValue;
  }
}
