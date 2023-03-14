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

  // guardian
  becameAlly: string;
  becameEnemy: string;

  // Ally
  isAllyForParty: boolean;
  allyType?: AllyTypeEnum;
  allyForHero: string;
  callForAlly: string;

  // Messenger and Shadow
  motivation: string;
  visionOnSituation: string;

  // Enemy
  possibleToMoveAlly: string;

  // Mentor
  mentorType?: MentorTypeEnum;
  knowledgeType?: KnowledgeTypeEnum;
}

interface InWorldCharacterDTO extends CharacterDTO {
  isAlive?: boolean;
}

interface InTaskCharacterDTO extends CharacterDTO {
  isAlive?: boolean;
}
