import { CharacterDTO } from '../../../types/entities/character';

export const CHARACTER_FORM_DEFAULTS: Partial<CharacterDTO> = {
  age: 0,
  allyForHero: '',
  allyType: undefined,
  becameAlly: '',
  becameEnemy: '',
  callForAlly: '',
  gender: undefined,
  goal: '',
  group: '',
  id: '',
  isAllyForParty: false,
  knowledgeType: undefined,
  mentorType: undefined,
  motivation: '',
  name: '',
  possibleToMoveAlly: '',
  profession: '',
  race: '',
  type: undefined,
  visionOnSituation: '',
};
