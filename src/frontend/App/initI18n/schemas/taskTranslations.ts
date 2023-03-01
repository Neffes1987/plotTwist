import { MainEdgeType, ShadowEncounterType } from '../../../../constants/edge.enum';
import { TaskDTO } from '../../../../types/entities/task';
import { MIDDLE_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../Screens/Tasks/constants';
import { StepperFieldField } from '../../../Screens/WorldEditor/interface';
import { TranslationNamespace } from '../translationsSchema';

export const TRANSLATION_SCHEMA = {
  caption: 'caption',
  actions: {
    create: 'create',
    update: 'update',
  },
  labels: {
    name: 'name',
    listCaption: 'listCaption',
    description: 'description',
    type: 'type',
    mainEdgeType: 'mainEdgeType',
    edgeImpact: 'edgeImpact',
    shadowEncounterType: 'shadowEncounterType',
  },
  lists: {
    edgeTypeOptions: {
      task: 'plain',
      edge: 'intermediate',
      mainEdge: 'main',
    },
    shadowEncounterType: {
      demonization: 'Demonization',
      deathOfVillain: 'DeathOfVillain',
      villainGetaway: 'VillainGetaway',
      shadowHeroOfHisStory: 'ShadowHeroOfHisStory',
    },
    mainEdgeTypeOptions: {
      MeetingWithMainFear: 'MeetingWithMainFear',
      AsDeathWitness: 'AsDeathWitness',
      CauseOfDeath: 'CauseOfDeath',
      Equilibrium: 'Equilibrium',
      FatherConfrontation: 'FatherConfrontation',
      ImaginaryHeroDeath: 'ImaginaryHeroDeath',
      LoveThatKills: 'LoveThatKills',
      SacredMarriage: 'SacredMarriage',
      ThroughEyesOfPsychopath: 'ThroughEyesOfPsychopath',
      YouthVersusOldAge: 'YouthVersusOldAge',
      ShadowEncounter: 'ShadowEncounter',
    },
  },
};

export const taskTranslations = new TranslationNamespace<typeof TRANSLATION_SCHEMA>('pages.edgeEditor', TRANSLATION_SCHEMA);

const EDGE_TYPE_OPTIONS: SelectOptionTyped<TaskDTO['type']>[] = [
  { id: 'task', name: taskTranslations.lists.edgeTypeOptions.task },
  { id: 'edge', name: taskTranslations.lists.edgeTypeOptions.edge },
  { id: 'mainEdge', name: taskTranslations.lists.edgeTypeOptions.mainEdge },
];

const SHADOW_ENCOUNTER_TYPE_OPTIONS: SelectOptionTyped<TaskDTO['shadowEncounterType']>[] = [
  { id: ShadowEncounterType.DeathOfVillain, name: taskTranslations.lists.shadowEncounterType.deathOfVillain },
  { id: ShadowEncounterType.Demonization, name: taskTranslations.lists.shadowEncounterType.demonization },
  { id: ShadowEncounterType.ShadowHeroOfHisStory, name: taskTranslations.lists.shadowEncounterType.shadowHeroOfHisStory },
  { id: ShadowEncounterType.VillainGetaway, name: taskTranslations.lists.shadowEncounterType.villainGetaway },
];

const MAIN_EDGE_TYPE_OPTIONS: SelectOptionTyped<TaskDTO['mainEdgeType']>[] = [
  { id: MainEdgeType.MeetingWithMainFear, name: taskTranslations.lists.mainEdgeTypeOptions.MeetingWithMainFear },
  { id: MainEdgeType.AsDeathWitness, name: taskTranslations.lists.mainEdgeTypeOptions.AsDeathWitness },
  { id: MainEdgeType.CauseOfDeath, name: taskTranslations.lists.mainEdgeTypeOptions.CauseOfDeath },
  { id: MainEdgeType.Equilibrium, name: taskTranslations.lists.mainEdgeTypeOptions.Equilibrium },
  { id: MainEdgeType.FatherConfrontation, name: taskTranslations.lists.mainEdgeTypeOptions.FatherConfrontation },
  { id: MainEdgeType.ImaginaryHeroDeath, name: taskTranslations.lists.mainEdgeTypeOptions.ImaginaryHeroDeath },
  { id: MainEdgeType.LoveThatKills, name: taskTranslations.lists.mainEdgeTypeOptions.LoveThatKills },
  { id: MainEdgeType.SacredMarriage, name: taskTranslations.lists.mainEdgeTypeOptions.SacredMarriage },
  { id: MainEdgeType.ThroughEyesOfPsychopath, name: taskTranslations.lists.mainEdgeTypeOptions.ThroughEyesOfPsychopath },
  { id: MainEdgeType.YouthVersusOldAge, name: taskTranslations.lists.mainEdgeTypeOptions.YouthVersusOldAge },
  { id: MainEdgeType.ShadowEncounter, name: taskTranslations.lists.mainEdgeTypeOptions.ShadowEncounter },
];

export const EDGE_FIELDS_CONFIG: StepperFieldField<TaskDTO>[] = [
  { label: taskTranslations.labels.type, name: 'type', type: 'list', options: EDGE_TYPE_OPTIONS },
  {
    label: taskTranslations.labels.name,
    name: 'name',
    type: 'text',
    minValueLength: NAME_VALUE_MIN_LENGTH,
    maxValueLength: SHORT_VALUE_MAX_LENGTH,
  },
  { label: taskTranslations.labels.description, name: 'description', type: 'text' },
  {
    label: taskTranslations.labels.edgeImpact,
    name: 'edgeImpact',
    type: 'text',
    minValueLength: SHORT_VALUE_MAX_LENGTH,
    maxValueLength: MIDDLE_VALUE_MAX_LENGTH,
  },
];

export const EDGE_OPTIONS_FIELDS_CONFIG: StepperFieldField<TaskDTO>[] = [
  { label: taskTranslations.labels.mainEdgeType, name: 'mainEdgeType', type: 'list', options: MAIN_EDGE_TYPE_OPTIONS as SelectOption[] },
];

export const SHADOW_ENCOUNTER_FIELDS_CONFIG: StepperFieldField<TaskDTO>[] = [
  { label: taskTranslations.labels.shadowEncounterType, name: 'shadowEncounterType', type: 'list', options: SHADOW_ENCOUNTER_TYPE_OPTIONS as SelectOption[] },
];
