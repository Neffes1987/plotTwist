import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

import {CharacterModel, ICharacterModel} from './characterModel';

export type KnowledgeType = 'education' | 'presentationGifts' | 'teacherAdvice' | 'motivation' | 'sproutsInformation';

export type MentorType = 'dark' | 'fallen' | 'permanent' | 'comic' | 'shaman';

export interface IMentorModel extends ICharacterModel {
  knowledgeType?: KnowledgeType;
  mentorType?: MentorType;
  rewardId: string;
  lawIds: string[];
}

export class MentorModel extends CharacterModel {
  private _knowledgeType?: KnowledgeType;
  private _mentorType?: MentorType;
  private _rewardId = '';
  private _lawIds: string[] = [];

  constructor(data: IMentorModel) {
    super(data);

    this.setKnowledgeType(data.knowledgeType);
    this.setMentorType(data.mentorType);
    this.setRewardId(data.rewardId);
    this.setLaws(data.lawIds);
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

  setLaws(newValue: string[]): void {
    this._lawIds = newValue;
  }

  validateMap(data: IMentorModel): void {
    super.validateMap(data);
    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.mentorType == null) {
      emptyProperties.push('mentorType');
    }

    if (data.knowledgeType == null) {
      emptyProperties.push('knowledgeType');
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      mentorType: this._mentorType,
      knowledgeType: this._knowledgeType,
      rewardId: this._rewardId,
      lawIds: this._lawIds,
    };
  }
}
