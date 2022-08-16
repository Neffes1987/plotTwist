import { HiddenCaveWorldDTO, HolidayWorldDTO, PlainWorldDTO, PrivateWorldDTO, ReturnWithPotionWorldDTO, WorldDTO } from 'backend';

export interface CommonStepperField<RecordType> {
  label: string;
  name: keyof RecordType;
  maxValueLength?: number;
}

export type StepperFieldField = CommonStepperField<
  WorldDTO & PlainWorldDTO & PrivateWorldDTO & HiddenCaveWorldDTO & HolidayWorldDTO & ReturnWithPotionWorldDTO
>;
