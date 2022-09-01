import { HiddenCaveWorldDTO, HolidayWorldDTO, PlainWorldDTO, PrivateWorldDTO, ReturnWithPotionWorldDTO, WorldDTO } from 'backend';

export interface CommonStepperField<RecordType> {
  label: string;
  name: keyof RecordType;
  type: string;
}

export interface TextStepperField<RecordType> extends CommonStepperField<RecordType> {
  maxValueLength?: number;
  minValueLength?: number;
  type: 'text';
}

export interface OptionsStepperField<RecordType> extends CommonStepperField<RecordType> {
  options: SelectOption[];
  type: 'list';
}

export type WorldTypes = WorldDTO & PlainWorldDTO & PrivateWorldDTO & HiddenCaveWorldDTO & HolidayWorldDTO & ReturnWithPotionWorldDTO;

export type StepperFieldField<Type> = TextStepperField<Type> | OptionsStepperField<Type>;
