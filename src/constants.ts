import { HiddenCaveWorldDTO, HolidayWorldDTO, PlainWorldDTO, PrivateWorldDTO, ReturnWithPotionWorldDTO, WorldDTO } from 'backend';

export const SHORT_VALUE_MAX_LENGTH = 256;
export const MIDDLE_VALUE_MAX_LENGTH = 2048;
export const BIG_VALUE_MAX_LENGTH = 4096;
export const NAME_VALUE_MIN_LENGTH = 6;
export const MIN_LAWS_IN_WORLD = 2;
export const MIN_WATERHOLES_IN_WORLD = 2;

export const DEFAULT_WORLD_FORM_STATE: Omit<WorldDTO, 'type'> = {
  description: '',
  failPrice: '',
  name: '',
  id: '',
  plotId: '',
  reference: '',
  status: 'draft',
  story: '',
  timeline: '',
  laws: [],
  waterholes: [],
};

export const DEFAULT_PLAIN_WORLD_FORM_STATE: PlainWorldDTO = {
  ...DEFAULT_WORLD_FORM_STATE,
  introduction: '',
  type: 'plainWorld',
};

export const DEFAULT_PRIVATE_WORLD_FORM_STATE: PrivateWorldDTO = {
  ...DEFAULT_WORLD_FORM_STATE,
  contrast: '',
  type: 'privateWorld',
};

export const DEFAULT_HIDDEN_WORLD_FORM_STATE: HiddenCaveWorldDTO = {
  ...DEFAULT_WORLD_FORM_STATE,
  mainEdgeInformation: '',
  partyPlan: '',
  shadowIntroduction: '',
  type: 'hiddenCave',
};

export const DEFAULT_HOLIDAY_WORLD_FORM_STATE: HolidayWorldDTO = {
  ...DEFAULT_WORLD_FORM_STATE,
  holidayType: 'inAShelter',
  shadowRevenge: '',
  type: 'holiday',
};

export const DEFAULT_RETURN_WORLD_FORM_STATE: ReturnWithPotionWorldDTO = {
  ...DEFAULT_WORLD_FORM_STATE,
  finalType: 'openEnd',
  cliffhanger: '',
  potionType: 'wisdom',
  type: 'returnWithPotion',
};

export const FORM_DEFAULT_STATE: Record<WorldDTO['type'], Omit<WorldDTO, 'id'>> = {
  plainWorld: DEFAULT_PLAIN_WORLD_FORM_STATE,
  privateWorld: DEFAULT_PRIVATE_WORLD_FORM_STATE,
  hiddenCave: DEFAULT_HIDDEN_WORLD_FORM_STATE,
  holiday: DEFAULT_HOLIDAY_WORLD_FORM_STATE,
  returnWithPotion: DEFAULT_RETURN_WORLD_FORM_STATE,
};

export const COMMON_WORLD_FIELDS_CONFIG: CoreStepperField<Omit<WorldDTO, 'laws' | 'waterholes'>>[] = [
  { label: 'pages.worldEditor.labels.name', name: 'name', maxValueLength: SHORT_VALUE_MAX_LENGTH },
  { label: 'pages.worldEditor.labels.description', name: 'description', maxValueLength: BIG_VALUE_MAX_LENGTH },
  { label: 'pages.worldEditor.labels.reference', name: 'reference', maxValueLength: MIDDLE_VALUE_MAX_LENGTH },
  { label: 'pages.worldEditor.labels.history', name: 'story', maxValueLength: MIDDLE_VALUE_MAX_LENGTH },
  { label: 'pages.worldEditor.labels.timeline', name: 'timeline', maxValueLength: SHORT_VALUE_MAX_LENGTH },
  { label: 'pages.worldEditor.labels.price', name: 'failPrice', maxValueLength: MIDDLE_VALUE_MAX_LENGTH },
  // { label: 'pages.worldEditor.labels.edge', name: 'edgeId' },
  // { label: 'pages.worldEditor.labels.waterholes', name: 'waterholes' },
  // { label: 'pages.worldEditor.labels.laws', name: 'laws' },
];

export const PLAIN_WORLD_FIELDS_CONFIG: CoreStepperField<PlainWorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  { label: 'pages.worldEditor.labels.introduction', name: 'introduction', maxValueLength: MIDDLE_VALUE_MAX_LENGTH },
  // { label: 'pages.worldEditor.labels.charactersProblems', name: 'charactersProblems' },
  // { label: 'pages.worldEditor.labels.worldProblems', name: 'worldProblems' },
];

export const PRIVATE_WORLD_FIELDS_CONFIG: CoreStepperField<PrivateWorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  { label: 'pages.worldEditor.labels.contrast', name: 'contrast', maxValueLength: BIG_VALUE_MAX_LENGTH },
];

export const HIDDEN_CAVE_WORLD_FIELDS_CONFIG: CoreStepperField<HiddenCaveWorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  { label: 'pages.worldEditor.labels.shadowIntroduction', name: 'shadowIntroduction', maxValueLength: BIG_VALUE_MAX_LENGTH },
  { label: 'pages.worldEditor.labels.mainEdge', name: 'mainEdgeInformation', maxValueLength: BIG_VALUE_MAX_LENGTH },
];

export const HOLIDAY_WORLD_FIELDS_CONFIG: CoreStepperField<HolidayWorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  // { label: 'pages.worldEditor.labels.chase', name: 'chase' },
  // { label: 'pages.worldEditor.labels.holidayType', name: 'holidayType' },
  // { label: 'pages.worldEditor.labels.holidaySubType', name: 'holidaySubType' },
  { label: 'pages.worldEditor.labels.mainEdge', name: 'shadowRevenge', maxValueLength: BIG_VALUE_MAX_LENGTH },
];

export const RETURN_WITH_POTION_WORLD_FIELDS_CONFIG: CoreStepperField<ReturnWithPotionWorldDTO>[] = [
  ...COMMON_WORLD_FIELDS_CONFIG,
  // { label: 'pages.worldEditor.labels.journeyResult', name: 'journeyResult', maxValueLength: BIG_VALUE_MAX_LENGTH },
  { label: 'pages.worldEditor.labels.endType', name: 'finalType' },
  { label: 'pages.worldEditor.labels.cliffhanger', name: 'cliffhanger', maxValueLength: BIG_VALUE_MAX_LENGTH },
];

export const WORLDS_ADDITIONAL_FIELDS = {
  hiddenCaveWorld: HIDDEN_CAVE_WORLD_FIELDS_CONFIG,
  holidayWorld: HOLIDAY_WORLD_FIELDS_CONFIG,
  plainWorld: PLAIN_WORLD_FIELDS_CONFIG,
  privateWorld: PRIVATE_WORLD_FIELDS_CONFIG,
  returnWithPotionWorld: RETURN_WITH_POTION_WORLD_FIELDS_CONFIG,
};
