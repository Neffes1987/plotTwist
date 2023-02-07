import { AllyTypeEnum, CharacterEnum, GenderEnum, KnowledgeTypeEnum, MentorTypeEnum } from '../../constants/character.enum';

interface CharacterDTO extends CommonEntityDTO {
  name: string;
  type: CharacterEnum;
  age: number;
  race: string;
  gender: GenderEnum;
  goal: string;
  profession: string;
  group: string;
}

interface GuardianDTO extends CharacterDTO {
  type: CharacterEnum.Guard;
  becameAlly: string;
  becameEnemy: string;
}

interface AllyDTO extends CharacterDTO {
  type: CharacterEnum.Ally;
  isAllyForParty: boolean;
  allyType: AllyTypeEnum;
  allyForHero: string;
  callForAlly: string;
}

interface MessengerDTO extends CharacterDTO {
  type: CharacterEnum.Messenger;
  motivation: string;
  visionOnSituation: string;
}

interface EnemyDTO extends CharacterDTO {
  type: CharacterEnum.Enemy;
  motivation: string;
  possibleToMoveAlly: string;
}

interface ShadowDTO extends CharacterDTO {
  type: CharacterEnum.Shadow;
  motivation: string;
  visionOnSituation: string;
}

interface MentorDTO extends CharacterDTO {
  type: CharacterEnum.Mentor;
  mentorType: MentorTypeEnum;
  knowledgeType: KnowledgeTypeEnum;
}

interface InWorldOptions {
  isAlive?: boolean;
}

type CharacterInWorldDTO = (MentorDTO | ShadowDTO | EnemyDTO | MessengerDTO | AllyDTO | GuardianDTO) & InWorldOptions;
