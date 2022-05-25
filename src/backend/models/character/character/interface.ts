import { IAbstractModel, IListQuery } from '../../../base/interface';

import { CharacterModel } from './characterModel';

export interface IShadowModel extends ICharacterModel {
  rewardId: string;
  motivation: string;
  visionOnSituation: string;
}

export interface IMessengerModel extends ICharacterModel {
  motivation: string;
  callIds: string[];
  waterholesIds: string[];
}

export type KnowledgeType = 'education' | 'presentationGifts' | 'teacherAdvice' | 'motivation' | 'sproutsInformation';

export type MentorType = 'dark' | 'fallen' | 'permanent' | 'comic' | 'shaman';

export interface IMentorModel extends ICharacterModel {
  knowledgeType: KnowledgeType;
  mentorType: MentorType;
  rewardId: string;
  waterholesIds: string[];
  lawIds: string[];
}

export interface IGuardModel extends ICharacterModel {
  becameAlly: string;
  becameEnemy: string;
}

export interface IEnemyModel extends ICharacterModel {
  rewardId: string;
  motivation: string;
  possibleToMoveAlly: string;
}

export interface ICharacterListQuery extends IListQuery {
  plotId?: string;
  characterIds?: string[];
  waterholeIds?: string[];
}

export interface UpdateCharactersPropsType {
  add?: Record<string, string[]>;
  remove?: Record<string, string[]>;
  characters: CharacterModel[];
}

export type CharacterType = 'mentor' | 'guard' | 'messenger' | 'ally' | 'enemy' | 'shadow';

export interface ICharacterModel extends IAbstractModel {
  plotId: string;
  age: string;
  race: string;
  gender: string;
  goal: string;
  previewId: string;
  profession: string;
  group: string;
  type: CharacterType;
  strongest: string[];
  weakness: string[];
  resultIds: string[];
}

export type AllyType = 'bosomFriend' | 'highWorldAlly' | 'animal' | 'undeadAlly' | 'agileServant';

export interface IAllyModel extends ICharacterModel {
  isAllyForParty: boolean;
  allyForHero: string;
  callForAlly: string;
  allyType: AllyType;
}
