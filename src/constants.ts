import { HiddenCaveWorldDTO, HolidayWorldDTO, PlainWorldDTO, PrivateWorldDTO, ReturnWithPotionWorldDTO, WorldDTO } from 'backend';

export const SHORT_VALUE_MAX_LENGTH = 256;
export const MIDDLE_VALUE_MAX_LENGTH = 2048;
export const BIG_VALUE_MAX_LENGTH = 4096;
export const NAME_VALUE_MIN_LENGTH = 6;

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
