import { StatusEnum } from '../../../constants/status.enum';
import { WorldDTO } from '../../../types/entities/world';

export const SHORT_VALUE_MAX_LENGTH = 128;
export const MIDDLE_VALUE_MAX_LENGTH = 2048;
export const BIG_VALUE_MAX_LENGTH = 4096;
export const NAME_VALUE_MIN_LENGTH = 1;

export const DEFAULT_WORLD_FORM_STATE: Partial<WorldDTO> = {
  cliffhanger: '',
  contrast: '',
  finalType: undefined,
  holidayType: undefined,
  introduction: '',
  mainEdgeInformation: '',
  partyPlan: '',
  potionType: undefined,
  shadowIntroduction: '',
  shadowRevenge: '',
  failPrice: '',
  name: '',
  id: '',
  reference: '',
  status: StatusEnum.Draft,
  story: '',
  timeline: '',
};
