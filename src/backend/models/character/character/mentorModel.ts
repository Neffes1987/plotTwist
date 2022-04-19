import { IValidatorConfiguration } from '../../../base/abstractModel';

import { CharacterModel, ICharacterModel } from './characterModel';

export type KnowledgeType = 'education' | 'presentationGifts' | 'teacherAdvice' | 'motivation' | 'sproutsInformation';

export type MentorType = 'dark' | 'fallen' | 'permanent' | 'comic' | 'shaman';

export interface IMentorModel extends ICharacterModel {
  knowledgeType: KnowledgeType;
  mentorType: MentorType;
  rewardId: string;
  waterholesIds: string[];
  lawIds: string[];
}

export class MentorModel extends CharacterModel {
  private _knowledgeType?: KnowledgeType;
  private _mentorType?: MentorType;
  private _rewardId = '';
  private _waterholeIds: string[] = [];
  private _lawsIds: string[] = [];

  constructor(data: IMentorModel) {
    super(data);

    this.setKnowledgeType(data.knowledgeType);
    this.setMentorType(data.mentorType);
    this.setRewardId(data.rewardId);
    this.setWaterholes(data.waterholesIds);
    this.setLaws(data.lawIds);
  }

  get lawIds(): string[] {
    return this._lawsIds;
  }

  get waterholeIds(): string[] {
    return this._waterholeIds;
  }

  setKnowledgeType(newValue?: KnowledgeType): void {
    this._knowledgeType = newValue;
  }

  setMentorType(newValue?: MentorType): void {
    this._mentorType = newValue;
  }

  setRewardId(newValue: string): void {
    this._rewardId = newValue;
  }

  setWaterholes(newValue: string[]): void {
    this._waterholeIds = newValue;
  }

  setLaws(newValue: string[]): void {
    this._lawsIds = newValue;
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [...super.getValidationConfig(), { name: 'mentorType' }, { name: 'knowledgeType' }, { name: 'waterholesIds' }, { name: 'lawIds' }];
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      mentorType: this._mentorType,
      knowledgeType: this._knowledgeType,
      rewardId: this._rewardId,
      waterholeIds: this._waterholeIds,
      lawsIds: this._lawsIds,
    };
  }
}
