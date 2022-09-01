import { HiddenCaveWorldDTO, HolidayWorldDTO, PlainWorldDTO, PrivateWorldDTO, ReturnWithPotionWorldDTO, WorldDTO } from 'backend';

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
    holidayType: {
      caption: 'holidayType',
      types: {},
    },
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
  // { label: 'pages.worldEditor.labels.edge', name: 'edgeId' },
  // { label: 'pages.worldEditor.labels.waterholes', name: 'waterholes' },
  // { label: 'pages.worldEditor.labels.laws', name: 'laws' },
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
  // { label: 'pages.worldEditor.labels.charactersProblems', name: 'charactersProblems' },
  // { label: 'pages.worldEditor.labels.worldProblems', name: 'worldProblems' },
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

export const HOLIDAY_WORLD_FIELDS_CONFIG: StepperFieldField<HolidayWorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  // { label: 'pages.worldEditor.labels.chase', name: 'chase' },
  // { label: 'pages.worldEditor.labels.holidayType', name: 'holidayType' },
  // { label: 'pages.worldEditor.labels.holidaySubType', name: 'holidaySubType' },
  { label: worldListTranslations.labels.mainEdge, name: 'shadowRevenge', maxValueLength: BIG_VALUE_MAX_LENGTH, type: 'text' },
];

export const RETURN_WITH_POTION_WORLD_FIELDS_CONFIG: StepperFieldField<ReturnWithPotionWorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  // { label: 'pages.worldEditor.labels.journeyResult', name: 'journeyResult', maxValueLength: BIG_VALUE_MAX_LENGTH },
  { label: worldListTranslations.labels.endType, name: 'finalType', type: 'text' },
  { label: worldListTranslations.labels.cliffhanger, name: 'cliffhanger', maxValueLength: BIG_VALUE_MAX_LENGTH, type: 'text' },
];

export const WORLDS_ADDITIONAL_FIELDS = {
  hiddenCave: HIDDEN_CAVE_WORLD_FIELDS_CONFIG,
  holiday: HOLIDAY_WORLD_FIELDS_CONFIG,
  plainWorld: PLAIN_WORLD_FIELDS_CONFIG,
  privateWorld: PRIVATE_WORLD_FIELDS_CONFIG,
  returnWithPotion: RETURN_WITH_POTION_WORLD_FIELDS_CONFIG,
};
