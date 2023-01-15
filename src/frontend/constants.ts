import { StatusEnum } from '../constants/status.enum';
import { FinalTypeEnum, HolidayTypeEnum, PotionTypeEnum, WorldEnum } from '../constants/world.enum';
import { EdgeDTO } from '../types/entities/edge';
import { HiddenCaveWorldDTO, HolidayWorldDTO, PlainWorldDTO, PrivateWorldDTO, ReturnWithPotionWorldDTO, WorldDTO } from '../types/entities/world';

export const SHORT_VALUE_MAX_LENGTH = 25;
export const MIDDLE_VALUE_MAX_LENGTH = 2048;
export const BIG_VALUE_MAX_LENGTH = 4096;
export const NAME_VALUE_MIN_LENGTH = 6;

export const DEFAULT_WORLD_FORM_STATE: Omit<WorldDTO, 'type'> = {
  failPrice: '',
  name: '',
  id: '',
  reference: '',
  status: StatusEnum.Draft,
  story: '',
  timeline: '',
};

export const DEFAULT_PLAIN_WORLD_FORM_STATE: PlainWorldDTO = {
  ...DEFAULT_WORLD_FORM_STATE,
  introduction: '',
  type: WorldEnum.PlainWorld,
};

export const DEFAULT_PRIVATE_WORLD_FORM_STATE: PrivateWorldDTO = {
  ...DEFAULT_WORLD_FORM_STATE,
  contrast: '',
  type: WorldEnum.PrivateWorld,
};

export const DEFAULT_HIDDEN_WORLD_FORM_STATE: HiddenCaveWorldDTO = {
  ...DEFAULT_WORLD_FORM_STATE,
  mainEdgeInformation: '',
  partyPlan: '',
  shadowIntroduction: '',
  type: WorldEnum.HiddenCaveWorld,
};

export const DEFAULT_HOLIDAY_WORLD_FORM_STATE: HolidayWorldDTO = {
  ...DEFAULT_WORLD_FORM_STATE,
  holidayType: HolidayTypeEnum.InAShelter,
  shadowRevenge: '',
  type: WorldEnum.HolidayWorld,
};

export const DEFAULT_RETURN_WORLD_FORM_STATE: ReturnWithPotionWorldDTO = {
  ...DEFAULT_WORLD_FORM_STATE,
  finalType: FinalTypeEnum.Cycle,
  cliffhanger: '',
  potionType: PotionTypeEnum.Love,
  type: WorldEnum.ReturnWithPotionWorld,
};

export const EDGE_FORM_DEFAULT_STATE: EdgeDTO = {
  description: '',
  edgeImpact: '',
  id: '',
  name: '',
  type: 'edge',
};

export const FORM_DEFAULT_STATE: Record<WorldDTO['type'], WorldDTO> = {
  [WorldEnum.PlainWorld]: DEFAULT_PLAIN_WORLD_FORM_STATE,
  [WorldEnum.PrivateWorld]: DEFAULT_PRIVATE_WORLD_FORM_STATE,
  [WorldEnum.HiddenCaveWorld]: DEFAULT_HIDDEN_WORLD_FORM_STATE,
  [WorldEnum.HolidayWorld]: DEFAULT_HOLIDAY_WORLD_FORM_STATE,
  [WorldEnum.ReturnWithPotionWorld]: DEFAULT_RETURN_WORLD_FORM_STATE,
};
