import { ChaseTypeEnum, FinalTypeEnum, HolidayGetSwordTypeEnum, HolidayTypeEnum, PotionTypeEnum } from '../../../../constants/world.enum';
import { WorldDTO } from '../../../../types/entities/world';
import { BIG_VALUE_MAX_LENGTH, MIDDLE_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../Screens/Tasks/constants';
import { StepperFieldField } from '../../../Screens/WorldEditor/interface';
import { TranslationNamespace } from '../translationsSchema';

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
    chase: {
      GodSaving: 'GodSaving',
      FollowersChase: 'FollowersChase',
      ShadowRunning: 'ShadowRunning',
    },
    holidayType: {
      PotionSteeling: 'PotionSteeling',
      Initiative: 'Initiative',
      NewVision: 'NewVision',
      ExtraVision: 'ExtraVision',
      Epiphania: 'Epiphania',
      SkewVision: 'SkewVision',
    },
    holidayGetSwordType: {
      InAShelter: 'InAShelter',
      Treasure: 'Treasure',
      Victory: 'Victory',
      GetSword: 'GetSword',
    },
  },
};

export const worldListTranslations = new TranslationNamespace<typeof WORLD_EDITOR_TRANSLATION_SCHEMA>('pages.worldEditor', WORLD_EDITOR_TRANSLATION_SCHEMA);

export const COMMON_WORLD_FIELDS_CONFIG: StepperFieldField<WorldDTO>[] = [
  { label: worldListTranslations.labels.name, name: 'name', maxValueLength: SHORT_VALUE_MAX_LENGTH, type: 'text' },
  {
    label: worldListTranslations.labels.reference,
    name: 'reference',
    maxValueLength: MIDDLE_VALUE_MAX_LENGTH,
    type: 'text',
  },
  { label: worldListTranslations.labels.history, name: 'story', maxValueLength: BIG_VALUE_MAX_LENGTH, type: 'text' },
  {
    label: worldListTranslations.labels.timeline,
    name: 'timeline',
    maxValueLength: MIDDLE_VALUE_MAX_LENGTH,
    type: 'text',
  },
  {
    label: worldListTranslations.labels.price,
    name: 'failPrice',
    maxValueLength: MIDDLE_VALUE_MAX_LENGTH,
    type: 'text',
  },
];

export const PLAIN_WORLD_FIELDS_CONFIG: StepperFieldField<WorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  {
    label: worldListTranslations.labels.introduction,
    name: 'introduction',
    maxValueLength: BIG_VALUE_MAX_LENGTH,
    type: 'text',
  },
];

export const PRIVATE_WORLD_FIELDS_CONFIG: StepperFieldField<WorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  {
    label: worldListTranslations.labels.contrast,
    name: 'contrast',
    maxValueLength: BIG_VALUE_MAX_LENGTH,
    type: 'text',
  },
];

export const HIDDEN_CAVE_WORLD_FIELDS_CONFIG: StepperFieldField<WorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  { label: worldListTranslations.labels.shadowIntroduction, name: 'shadowIntroduction', maxValueLength: BIG_VALUE_MAX_LENGTH, type: 'text' },
  { label: worldListTranslations.labels.mainEdge, name: 'mainEdgeInformation', maxValueLength: BIG_VALUE_MAX_LENGTH, type: 'text' },
  { label: worldListTranslations.labels.partyPlan, name: 'partyPlan', maxValueLength: BIG_VALUE_MAX_LENGTH, type: 'text' },
];

const ChaseTypeOptions: SelectOptionTyped<ChaseTypeEnum>[] = [
  { id: ChaseTypeEnum.FollowersChase, name: '' },
  { id: ChaseTypeEnum.GodSaving, name: '' },
  { id: ChaseTypeEnum.ShadowRunning, name: '' },
];
const HolidayGetSwordTypeOptions: SelectOptionTyped<HolidayGetSwordTypeEnum>[] = [
  { id: HolidayGetSwordTypeEnum.Epiphania, name: '' },
  { id: HolidayGetSwordTypeEnum.ExtraVision, name: '' },
  { id: HolidayGetSwordTypeEnum.Initiative, name: '' },
  { id: HolidayGetSwordTypeEnum.NewVision, name: '' },
  { id: HolidayGetSwordTypeEnum.PotionSteeling, name: '' },
  { id: HolidayGetSwordTypeEnum.SkewVision, name: '' },
];

const HolidayTypeOptions: SelectOptionTyped<HolidayTypeEnum>[] = [
  { id: HolidayTypeEnum.GetSword, name: '' },
  { id: HolidayTypeEnum.InAShelter, name: '' },
  { id: HolidayTypeEnum.Treasure, name: '' },
  { id: HolidayTypeEnum.Victory, name: '' },
];

export const HOLIDAY_WORLD_FIELDS_CONFIG: StepperFieldField<WorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  { label: worldListTranslations.labels.chase, name: 'chase', type: 'list', options: ChaseTypeOptions },
  { label: worldListTranslations.labels.holidayType, name: 'holidayType', type: 'list', options: HolidayTypeOptions },
  { label: worldListTranslations.labels.holidaySubType, name: 'holidayGetSwordType', type: 'list', options: HolidayGetSwordTypeOptions },
  { label: worldListTranslations.labels.mainEdge, name: 'shadowRevenge', maxValueLength: BIG_VALUE_MAX_LENGTH, type: 'text' },
];

const FinalTypeOption: SelectOptionTyped<FinalTypeEnum>[] = [
  { id: FinalTypeEnum.Cycle, name: worldListTranslations.lists.finalType.cycle },
  { id: FinalTypeEnum.AchievePerfect, name: worldListTranslations.lists.finalType.achievePerfect },
  { id: FinalTypeEnum.OpenEnd, name: worldListTranslations.lists.finalType.openEnd },
];
const PotionTypeOption: SelectOptionTyped<PotionTypeEnum>[] = [
  { id: PotionTypeEnum.Wisdom, name: worldListTranslations.lists.journeyResult.wisdom },
  { id: PotionTypeEnum.Love, name: worldListTranslations.lists.journeyResult.love },
  { id: PotionTypeEnum.Responsible, name: worldListTranslations.lists.journeyResult.responsible },
  { id: PotionTypeEnum.Tragedy, name: worldListTranslations.lists.journeyResult.tragedy },
  { id: PotionTypeEnum.BadExperience, name: worldListTranslations.lists.journeyResult.badExperience },
  { id: PotionTypeEnum.WastedTime, name: worldListTranslations.lists.journeyResult.wastedTime },
];

export const RETURN_WITH_POTION_WORLD_FIELDS_CONFIG: StepperFieldField<WorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  { label: worldListTranslations.labels.journeyResult, name: 'potionType', type: 'list', options: PotionTypeOption },
  { label: worldListTranslations.labels.endType, name: 'finalType', type: 'list', options: FinalTypeOption },
  { label: worldListTranslations.labels.cliffhanger, name: 'cliffhanger', maxValueLength: BIG_VALUE_MAX_LENGTH, type: 'text' },
];
