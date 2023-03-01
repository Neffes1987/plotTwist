import { AllyTypeEnum, CharacterEnum, KnowledgeTypeEnum, MentorTypeEnum } from '../../../../constants/character.enum';
import { StepperFieldField } from '../../../../types/editor';
import { CharacterDTO } from '../../../../types/entities/character';
import { NAME_VALUE_MIN_LENGTH } from '../../../Screens/Tasks/constants';
import { TranslationNamespace } from '../translationsSchema';

import { confirmOptions, genderOptions } from './common-options';

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
    name: 'name',
    race: 'race',
    goal: 'goal',
    group: 'group',
    profession: 'profession',
    age: 'age',
    gender: 'gender',
    type: 'type',
    isAllyForParty: 'isAllyForParty',
    allyType: 'allyType',
    allyForHero: 'allyForHero',
    callForAlly: 'callForAlly',
    becameAlly: 'becameAlly',
    becameEnemy: 'becameEnemy',
    motivation: 'motivation',
    knowledgeType: 'knowledgeType',
    mentorType: 'mentorType',
    visionOnSituation: 'visionOnSituation',
    possibleToMoveAlly: 'possibleToMoveAlly',
  },
  lists: {
    types: {
      ally: 'ally',
      enemy: 'enemy',
      guard: 'guard',
      messenger: 'messenger',
      mentor: 'mentor',
      shadow: 'shadow',
    },
    allyType: {
      BosomFriend: 'bosomFriend',
      HighWorldAlly: 'highWorldAlly',
      Animal: 'animal',
      UndeadAlly: 'undeadAlly',
      AgileServant: 'agileServant',
    },
    mentorType: {
      Dark: 'dark',
      Fallen: 'fallen',
      Permanent: 'permanent',
      Comic: 'comic',
      Shaman: 'shaman',
    },
    knowledgeType: {
      Education: 'education',
      PresentationGifts: 'presentationGifts',
      TeacherAdvice: 'teacherAdvice',
      Motivation: 'motivation',
      SproutsInformation: 'sproutsInformation',
    },
  },
};

export const charactersTranslations = new TranslationNamespace<typeof TRANSLATION_SCHEMA>('pages.characters', TRANSLATION_SCHEMA);

export const CharacterTypeOptions: SelectOptionTyped<CharacterEnum>[] = [
  {
    id: CharacterEnum.Ally,
    name: charactersTranslations.lists.types.ally,
  },
  {
    id: CharacterEnum.Mentor,
    name: charactersTranslations.lists.types.mentor,
  },
  {
    id: CharacterEnum.Guard,
    name: charactersTranslations.lists.types.guard,
  },
  {
    id: CharacterEnum.Shadow,
    name: charactersTranslations.lists.types.shadow,
  },
  {
    id: CharacterEnum.Messenger,
    name: charactersTranslations.lists.types.messenger,
  },
  {
    id: CharacterEnum.Enemy,
    name: charactersTranslations.lists.types.enemy,
  },
];

export const allyTypeOptions: SelectOptionTyped<AllyTypeEnum>[] = [
  {
    id: AllyTypeEnum.HighWorldAlly,
    name: charactersTranslations.lists.allyType.HighWorldAlly,
  },
  {
    id: AllyTypeEnum.UndeadAlly,
    name: charactersTranslations.lists.allyType.UndeadAlly,
  },
  {
    id: AllyTypeEnum.Animal,
    name: charactersTranslations.lists.allyType.Animal,
  },
  {
    id: AllyTypeEnum.BosomFriend,
    name: charactersTranslations.lists.allyType.BosomFriend,
  },
  {
    id: AllyTypeEnum.AgileServant,
    name: charactersTranslations.lists.allyType.AgileServant,
  },
];

export const mentorTypeOptions: SelectOptionTyped<MentorTypeEnum>[] = [
  { id: MentorTypeEnum.Permanent, name: charactersTranslations.lists.mentorType.Permanent },
  { id: MentorTypeEnum.Dark, name: charactersTranslations.lists.mentorType.Dark },
  { id: MentorTypeEnum.Comic, name: charactersTranslations.lists.mentorType.Comic },
  { id: MentorTypeEnum.Fallen, name: charactersTranslations.lists.mentorType.Fallen },
  { id: MentorTypeEnum.Shaman, name: charactersTranslations.lists.mentorType.Shaman },
];

export const knowledgeTypeOptions: SelectOptionTyped<KnowledgeTypeEnum>[] = [
  { id: KnowledgeTypeEnum.Education, name: charactersTranslations.lists.knowledgeType.Education },
  { id: KnowledgeTypeEnum.Motivation, name: charactersTranslations.lists.knowledgeType.Motivation },
  { id: KnowledgeTypeEnum.PresentationGifts, name: charactersTranslations.lists.knowledgeType.PresentationGifts },
  { id: KnowledgeTypeEnum.SproutsInformation, name: charactersTranslations.lists.knowledgeType.SproutsInformation },
  { id: KnowledgeTypeEnum.TeacherAdvice, name: charactersTranslations.lists.knowledgeType.TeacherAdvice },
];

export const COMMON_CHARACTER_FIELDS_CONFIG: StepperFieldField<CharacterDTO>[] = [
  { label: charactersTranslations.labels.type, name: 'type', type: 'list', options: CharacterTypeOptions },
  { label: charactersTranslations.labels.name, name: 'name', type: 'text', minValueLength: NAME_VALUE_MIN_LENGTH },
  { label: charactersTranslations.labels.race, name: 'race', type: 'text' },
  { label: charactersTranslations.labels.goal, name: 'goal', type: 'text' },
  { label: charactersTranslations.labels.group, name: 'group', type: 'text' },
  { label: charactersTranslations.labels.profession, name: 'profession', type: 'text' },
  { label: charactersTranslations.labels.age, name: 'age', type: 'text', keyboardType: 'phone-pad' },
  { label: charactersTranslations.labels.gender, name: 'gender', type: 'list', options: genderOptions },
];

export const ALLY_FIELDS: StepperFieldField<CharacterDTO>[] = [
  { label: charactersTranslations.labels.isAllyForParty, name: 'isAllyForParty', type: 'list', options: confirmOptions },
  { label: charactersTranslations.labels.allyType, name: 'allyType', type: 'list', options: allyTypeOptions },
  { label: charactersTranslations.labels.allyForHero, name: 'allyForHero', type: 'text' },
  { label: charactersTranslations.labels.callForAlly, name: 'callForAlly', type: 'text' },
];

export const GUARD_FIELDS: StepperFieldField<CharacterDTO>[] = [
  { label: charactersTranslations.labels.becameAlly, name: 'becameAlly', type: 'text' },
  { label: charactersTranslations.labels.becameEnemy, name: 'becameEnemy', type: 'text' },
];

export const MESSENGER_SHADOW_FIELDS: StepperFieldField<CharacterDTO>[] = [
  { label: charactersTranslations.labels.motivation, name: 'motivation', type: 'text' },
  { label: charactersTranslations.labels.visionOnSituation, name: 'visionOnSituation', type: 'text' },
  { label: charactersTranslations.labels.possibleToMoveAlly, name: 'possibleToMoveAlly', type: 'text' },
];

export const MENTORS_FIELDS: StepperFieldField<CharacterDTO>[] = [
  { label: charactersTranslations.labels.knowledgeType, name: 'knowledgeType', type: 'list', options: knowledgeTypeOptions },
  { label: charactersTranslations.labels.mentorType, name: 'mentorType', type: 'list', options: mentorTypeOptions },
];
