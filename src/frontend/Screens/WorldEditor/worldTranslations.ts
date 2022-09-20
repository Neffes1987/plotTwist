import {
  ChaseType,
  FinalType,
  HiddenCaveWorldDTO,
  HolidayGetSwordType,
  HolidayType,
  HolidayWorldDTO,
  PlainWorldDTO,
  PotionType,
  PrivateWorldDTO,
  ReturnWithPotionWorldDTO,
  WorldDTO,
} from 'backend';

import { BIG_VALUE_MAX_LENGTH, MIDDLE_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../constants';
import { TranslationNamespace } from '../../App/initI18n/translationsSchema';

import { StepperFieldField } from './interface';

export const WORLD_EDITOR_TRANSLATION_SCHEMA = {
  caption: 'caption',
  actions: {
    create: 'create',
    update: 'update',
  },
  labels: {
    introduction: 'introduction',
    worldProblems: 'worldProblems',
    charactersProblems: 'charactersProblems',
    contrast: 'contrast',
    shadowIntroduction: 'shadowIntroduction',
    mainEdge: 'mainEdge',
    holidayType: 'holidayType',
    holidaySubType: 'holidaySubType',
    chase: 'chase',
    shadowRevenge: 'shadowRevenge',
    journeyResult: 'journeyResult',
    rewards: 'rewards',
    endType: 'endType',
    endDescription: 'endDescription',
    cliffhanger: 'cliffhanger',
    reference: 'reference',
    history: 'history',
    timeline: 'timeline',
    price: 'price',
    edge: 'edge',
    waterholes: 'waterholes',
    laws: 'laws',
    name: 'name',
    description: 'description',
    partyPlan: 'partyPlan',
  },
  lists: {
    journeyResult: {
      wisdom: 'wisdom',
      love: 'love',
      responsible: 'responsible',
      tragedy: 'tragedy',
      badExperience: 'badExperience',
      wastedTime: 'wastedTime',
    },
    finalType: {
      cycle: 'cycle',
      achievePerfect: 'achievePerfect',
      openEnd: 'openEnd',
    },
  },
};

export const worldListTranslations = new TranslationNamespace<typeof WORLD_EDITOR_TRANSLATION_SCHEMA>('pages.worldEditor', WORLD_EDITOR_TRANSLATION_SCHEMA);

export const COMMON_WORLD_FIELDS_CONFIG: StepperFieldField<Omit<WorldDTO, 'laws' | 'waterholes'>>[] = [
  { label: worldListTranslations.labels.name, name: 'name', maxValueLength: SHORT_VALUE_MAX_LENGTH, minValueLength: NAME_VALUE_MIN_LENGTH, type: 'text' },
  { label: worldListTranslations.labels.description, name: 'description', maxValueLength: BIG_VALUE_MAX_LENGTH, type: 'text' },
  {
    label: worldListTranslations.labels.reference,
    name: 'reference',
    maxValueLength: MIDDLE_VALUE_MAX_LENGTH,
    minValueLength: SHORT_VALUE_MAX_LENGTH,
    type: 'text',
  },
  { label: worldListTranslations.labels.history, name: 'story', maxValueLength: BIG_VALUE_MAX_LENGTH, minValueLength: SHORT_VALUE_MAX_LENGTH, type: 'text' },
  {
    label: worldListTranslations.labels.timeline,
    name: 'timeline',
    maxValueLength: MIDDLE_VALUE_MAX_LENGTH,
    minValueLength: SHORT_VALUE_MAX_LENGTH,
    type: 'text',
  },
  {
    label: worldListTranslations.labels.price,
    name: 'failPrice',
    maxValueLength: MIDDLE_VALUE_MAX_LENGTH,
    minValueLength: SHORT_VALUE_MAX_LENGTH,
    type: 'text',
  },
];

export const PLAIN_WORLD_FIELDS_CONFIG: StepperFieldField<PlainWorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  {
    label: worldListTranslations.labels.introduction,
    name: 'introduction',
    maxValueLength: BIG_VALUE_MAX_LENGTH,
    minValueLength: SHORT_VALUE_MAX_LENGTH,
    type: 'text',
  },
];

export const PRIVATE_WORLD_FIELDS_CONFIG: StepperFieldField<PrivateWorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  {
    label: worldListTranslations.labels.contrast,
    name: 'contrast',
    maxValueLength: BIG_VALUE_MAX_LENGTH,
    minValueLength: SHORT_VALUE_MAX_LENGTH,
    type: 'text',
  },
];

export const HIDDEN_CAVE_WORLD_FIELDS_CONFIG: StepperFieldField<HiddenCaveWorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  { label: worldListTranslations.labels.shadowIntroduction, name: 'shadowIntroduction', maxValueLength: BIG_VALUE_MAX_LENGTH, type: 'text' },
  { label: worldListTranslations.labels.mainEdge, name: 'mainEdgeInformation', maxValueLength: BIG_VALUE_MAX_LENGTH, type: 'text' },
  { label: worldListTranslations.labels.partyPlan, name: 'partyPlan', maxValueLength: BIG_VALUE_MAX_LENGTH, type: 'text' },
];

const ChaseTypeOptions: SelectOptionTyped<ChaseType>[] = [];
const HolidayGetSwordTypeOptions: SelectOptionTyped<HolidayGetSwordType>[] = [];
const HolidayTypeOptions: SelectOptionTyped<HolidayType>[] = [];

export const HOLIDAY_WORLD_FIELDS_CONFIG: StepperFieldField<HolidayWorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  { label: worldListTranslations.labels.chase, name: 'chase', type: 'list', options: ChaseTypeOptions },
  { label: worldListTranslations.labels.holidayType, name: 'holidayType', type: 'list', options: HolidayTypeOptions },
  { label: worldListTranslations.labels.holidaySubType, name: 'holidayGetSwordType', type: 'list', options: HolidayGetSwordTypeOptions },
  { label: worldListTranslations.labels.mainEdge, name: 'shadowRevenge', maxValueLength: BIG_VALUE_MAX_LENGTH, type: 'text' },
];

const FinalTypeOption: SelectOptionTyped<FinalType>[] = [
  { id: 'cycle', name: '' },
  { id: 'achievePerfect', name: '' },
  { id: 'openEnd', name: '' },
];
const PotionTypeOption: SelectOptionTyped<PotionType>[] = [
  { id: 'wisdom', name: '' },
  { id: 'love', name: '' },
  { id: 'responsible', name: '' },
  { id: 'tragedy', name: '' },
  { id: 'badExperience', name: '' },
  { id: 'wastedTime', name: '' },
];

export const RETURN_WITH_POTION_WORLD_FIELDS_CONFIG: StepperFieldField<ReturnWithPotionWorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  { label: worldListTranslations.labels.journeyResult, name: 'potionType', type: 'list', options: PotionTypeOption },
  { label: worldListTranslations.labels.endType, name: 'finalType', type: 'list', options: FinalTypeOption },
  { label: worldListTranslations.labels.cliffhanger, name: 'cliffhanger', maxValueLength: BIG_VALUE_MAX_LENGTH, type: 'text' },
];

export const WORLDS_ADDITIONAL_FIELDS = {
  hiddenCave: HIDDEN_CAVE_WORLD_FIELDS_CONFIG,
  holiday: HOLIDAY_WORLD_FIELDS_CONFIG,
  plainWorld: PLAIN_WORLD_FIELDS_CONFIG,
  privateWorld: PRIVATE_WORLD_FIELDS_CONFIG,
  returnWithPotion: RETURN_WITH_POTION_WORLD_FIELDS_CONFIG,
};
