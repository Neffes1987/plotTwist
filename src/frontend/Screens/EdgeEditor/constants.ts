import { MainEdgeType, ShadowEncounterType } from '../../../constants/edge.enum';
import { EdgeDTO } from '../../../types/entities/edge';
import { TranslationNamespace } from '../../App/initI18n/translationsSchema';
import { MIDDLE_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../constants';
import { StepperFieldField } from '../WorldEditor/interface';

export const TRANSLATION_SCHEMA = {
  caption: 'caption',
  actions: {
    create: 'create',
    update: 'update',
  },
  labels: {
    name: 'name',
    description: 'description',
    type: 'type',
    mainEdgeType: 'mainEdgeType',
    edgeImpact: 'edgeImpact',
    shadowEncounterType: 'shadowEncounterType',
  },
  lists: {
    edgeTypeOptions: {
      plain: 'plain',
      main: 'main',
    },
    shadowEncounterType: {
      Demonization: 'Demonization',
      DeathOfVillain: 'DeathOfVillain',
      VillainGetaway: 'VillainGetaway',
      ShadowHeroOfHisStory: 'ShadowHeroOfHisStory',
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

export const edgeTranslations = new TranslationNamespace<typeof TRANSLATION_SCHEMA>('pages.edgeEditor', TRANSLATION_SCHEMA);

const EDGE_TYPE_OPTIONS: SelectOptionTyped<EdgeDTO['type']>[] = [
  { id: 'edge', name: edgeTranslations.lists.edgeTypeOptions.plain },
  { id: 'mainEdge', name: edgeTranslations.lists.edgeTypeOptions.main },
];

const SHADOW_ENCOUNTER_TYPE_OPTIONS: SelectOptionTyped<EdgeDTO['shadowEncounterType']>[] = [
  { id: ShadowEncounterType.DeathOfVillain, name: edgeTranslations.lists.shadowEncounterType.DeathOfVillain },
  { id: ShadowEncounterType.Demonization, name: edgeTranslations.lists.shadowEncounterType.Demonization },
  { id: ShadowEncounterType.ShadowHeroOfHisStory, name: edgeTranslations.lists.shadowEncounterType.ShadowHeroOfHisStory },
  { id: ShadowEncounterType.VillainGetaway, name: edgeTranslations.lists.shadowEncounterType.VillainGetaway },
];

const MAIN_EDGE_TYPE_OPTIONS: SelectOptionTyped<EdgeDTO['mainEdgeType']>[] = [
  { id: MainEdgeType.MeetingWithMainFear, name: edgeTranslations.lists.mainEdgeTypeOptions.MeetingWithMainFear },
  { id: MainEdgeType.AsDeathWitness, name: edgeTranslations.lists.mainEdgeTypeOptions.AsDeathWitness },
  { id: MainEdgeType.CauseOfDeath, name: edgeTranslations.lists.mainEdgeTypeOptions.CauseOfDeath },
  { id: MainEdgeType.Equilibrium, name: edgeTranslations.lists.mainEdgeTypeOptions.Equilibrium },
  { id: MainEdgeType.FatherConfrontation, name: edgeTranslations.lists.mainEdgeTypeOptions.FatherConfrontation },
  { id: MainEdgeType.ImaginaryHeroDeath, name: edgeTranslations.lists.mainEdgeTypeOptions.ImaginaryHeroDeath },
  { id: MainEdgeType.LoveThatKills, name: edgeTranslations.lists.mainEdgeTypeOptions.LoveThatKills },
  { id: MainEdgeType.SacredMarriage, name: edgeTranslations.lists.mainEdgeTypeOptions.SacredMarriage },
  { id: MainEdgeType.ThroughEyesOfPsychopath, name: edgeTranslations.lists.mainEdgeTypeOptions.ThroughEyesOfPsychopath },
  { id: MainEdgeType.YouthVersusOldAge, name: edgeTranslations.lists.mainEdgeTypeOptions.YouthVersusOldAge },
  { id: MainEdgeType.ShadowEncounter, name: edgeTranslations.lists.mainEdgeTypeOptions.ShadowEncounter },
];

export const EDGE_FIELDS_CONFIG: StepperFieldField<EdgeDTO>[] = [
  { label: edgeTranslations.labels.type, name: 'type', type: 'list', options: EDGE_TYPE_OPTIONS },
  { label: edgeTranslations.labels.mainEdgeType, name: 'mainEdgeType', type: 'list', options: MAIN_EDGE_TYPE_OPTIONS as SelectOption[] },
  { label: edgeTranslations.labels.shadowEncounterType, name: 'shadowEncounterType', type: 'list', options: SHADOW_ENCOUNTER_TYPE_OPTIONS as SelectOption[] },
  {
    label: edgeTranslations.labels.name,
    name: 'name',
    type: 'text',
    minValueLength: NAME_VALUE_MIN_LENGTH,
    maxValueLength: SHORT_VALUE_MAX_LENGTH,
  },
  { label: edgeTranslations.labels.description, name: 'description', type: 'text' },
  {
    label: edgeTranslations.labels.edgeImpact,
    name: 'edgeImpact',
    type: 'text',
    minValueLength: SHORT_VALUE_MAX_LENGTH,
    maxValueLength: MIDDLE_VALUE_MAX_LENGTH,
  },
];
