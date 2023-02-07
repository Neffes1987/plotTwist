import { AllyTypeEnum, CharacterEnum, GenderEnum, KnowledgeTypeEnum, MentorTypeEnum } from '../../../constants/character.enum';
import { AllyDTO, CharacterInWorldDTO, EnemyDTO, GuardianDTO, InWorldOptions, MentorDTO, MessengerDTO, ShadowDTO } from '../../../types/entities/character';
import { TranslationNamespace } from '../../App/initI18n/translationsSchema';

const COMMON_DEFAULT_FORM_VALUES: Omit<CharacterInWorldDTO, 'type'> & InWorldOptions = {
  id: '',
  isAlive: false,
  name: '',
  age: 0,
  race: '',
  gender: GenderEnum.Male,
  goal: '',
  profession: '',
  group: '',
};

const MENTOR_DEFAULT_FORM_VALUES: MentorDTO = {
  ...COMMON_DEFAULT_FORM_VALUES,
  knowledgeType: KnowledgeTypeEnum.Motivation,
  mentorType: MentorTypeEnum.Permanent,
  type: CharacterEnum.Mentor,
};

const MESSENGER_DEFAULT_FORM_VALUES: MessengerDTO = {
  ...COMMON_DEFAULT_FORM_VALUES,
  visionOnSituation: '',
  motivation: '',
  type: CharacterEnum.Messenger,
};

const ALLY_DEFAULT_FORM_VALUES: AllyDTO = {
  ...COMMON_DEFAULT_FORM_VALUES,
  allyType: AllyTypeEnum.BosomFriend,
  callForAlly: '',
  allyForHero: '',
  isAllyForParty: false,
  type: CharacterEnum.Ally,
};

const SHADOW_DEFAULT_FORM_VALUES: ShadowDTO = {
  ...COMMON_DEFAULT_FORM_VALUES,
  motivation: '',
  visionOnSituation: '',
  type: CharacterEnum.Shadow,
};

const ENEMY_DEFAULT_FORM_VALUES: EnemyDTO = {
  ...COMMON_DEFAULT_FORM_VALUES,
  motivation: '',
  possibleToMoveAlly: '',
  type: CharacterEnum.Enemy,
};

const GUARD_DEFAULT_FORM_VALUES: GuardianDTO = {
  ...COMMON_DEFAULT_FORM_VALUES,
  becameEnemy: '',
  becameAlly: '',
  type: CharacterEnum.Guard,
};

export const DEFAULT_FORM_VALUES = {
  [CharacterEnum.Mentor]: MENTOR_DEFAULT_FORM_VALUES,
  [CharacterEnum.Messenger]: MESSENGER_DEFAULT_FORM_VALUES,
  [CharacterEnum.Ally]: ALLY_DEFAULT_FORM_VALUES,
  [CharacterEnum.Shadow]: SHADOW_DEFAULT_FORM_VALUES,
  [CharacterEnum.Enemy]: ENEMY_DEFAULT_FORM_VALUES,
  [CharacterEnum.Guard]: GUARD_DEFAULT_FORM_VALUES,
};

export const TRANSLATION_SCHEMA = {
  caption: 'caption',
  messages: {
    wasCreated: 'wasCreated',
    emptyList: 'emptyList',
  },
  actions: {
    addNew: 'addNew',
    update: 'update',
    delete: 'delete',
    open: 'open',
    assign: 'assign',
    unAssign: 'unAssign',
  },
  errors: {},
  labels: {
    age: 'age',
    gender: 'gender',
    goal: 'goal',
    group: 'group',
    name: 'name',
    profession: 'profession',
    race: 'race',
    type: 'type',
  },
};

export const charactersListTranslations = new TranslationNamespace<typeof TRANSLATION_SCHEMA>('pages.charactersList', TRANSLATION_SCHEMA);
