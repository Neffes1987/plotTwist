import { TaskDTO } from '../../../types/entities/task';

export const SHORT_VALUE_MAX_LENGTH = 128;
export const MIDDLE_VALUE_MAX_LENGTH = 2048;
export const BIG_VALUE_MAX_LENGTH = 4096;
export const NAME_VALUE_MIN_LENGTH = 1;

export const TASK_FORM_DEFAULT_STATE: Partial<TaskDTO> = {
  description: '',
  edgeImpact: '',
  name: '',
  type: undefined,
};
