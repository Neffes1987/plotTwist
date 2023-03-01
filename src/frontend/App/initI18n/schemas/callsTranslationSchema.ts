import { CallTypeEnum } from '../../../../constants/call.enum';
import { StepperFieldField } from '../../../../types/editor';
import { CallDTO } from '../../../../types/entities/call';
import { BIG_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH } from '../../../Screens/Tasks/constants';
import { TranslationNamespace } from '../translationsSchema';

import { COMMON_LIST_TRANSLATION_SCHEMA } from './common-options';

export const DEFAULT_FORM_VALUES: CallDTO = {
  id: '',
  type: CallTypeEnum.Gossip,
  partyMotivation: '',
  name: '',
  description: '',
};

const COMMON_LIST_TRANSLATION_EXTENDED_SCHEMA = {
  ...COMMON_LIST_TRANSLATION_SCHEMA,
  labels: {
    name: 'name',
    description: 'description',
    partyMotivation: 'partyMotivation',
    type: 'type',
  },
  lists: {
    callTypes: {
      disorientation: 'Disorientation',
      gossip: 'Gossip',
      treasureHunt: 'TreasureHunt',
      inferring: 'Inferring',
      lackOfChoice: 'LackOfChoice',
      deprivation: 'Deprivation',
      requestOfHelp: 'RequestOfHelp',
      temptation: 'Temptation',
      synchronism: 'Synchronism',
      pushToAction: 'PushToAction',
      heraldOfChange: 'HeraldOfChange',
    },
  },
};

export const callsListTranslations = new TranslationNamespace<typeof COMMON_LIST_TRANSLATION_EXTENDED_SCHEMA>(
  'pages.callsList',
  COMMON_LIST_TRANSLATION_EXTENDED_SCHEMA,
);

export const CALL_OPTIONS: SelectOptionTyped<CallTypeEnum>[] = [
  { id: CallTypeEnum.Disorientation, name: callsListTranslations.lists.callTypes.disorientation },
  { id: CallTypeEnum.Gossip, name: callsListTranslations.lists.callTypes.gossip },
  { id: CallTypeEnum.TreasureHunt, name: callsListTranslations.lists.callTypes.treasureHunt },
  { id: CallTypeEnum.Inferring, name: callsListTranslations.lists.callTypes.inferring },
  { id: CallTypeEnum.LackOfChoice, name: callsListTranslations.lists.callTypes.lackOfChoice },
  { id: CallTypeEnum.Deprivation, name: callsListTranslations.lists.callTypes.deprivation },
  { id: CallTypeEnum.RequestOfHelp, name: callsListTranslations.lists.callTypes.requestOfHelp },
  { id: CallTypeEnum.Temptation, name: callsListTranslations.lists.callTypes.temptation },
  { id: CallTypeEnum.Synchronism, name: callsListTranslations.lists.callTypes.synchronism },
  { id: CallTypeEnum.PushToAction, name: callsListTranslations.lists.callTypes.pushToAction },
  { id: CallTypeEnum.HeraldOfChange, name: callsListTranslations.lists.callTypes.heraldOfChange },
];

export const CALL_FIELDS_CONFIG: StepperFieldField<CallDTO>[] = [
  { label: callsListTranslations.labels.type, name: 'type', type: 'list', options: CALL_OPTIONS },
  { label: callsListTranslations.labels.name, name: 'name', type: 'text', minValueLength: NAME_VALUE_MIN_LENGTH },
  { label: callsListTranslations.labels.description, name: 'description', type: 'text', maxValueLength: BIG_VALUE_MAX_LENGTH },
  {
    label: callsListTranslations.labels.partyMotivation,
    name: 'partyMotivation',
    type: 'text',
    maxValueLength: BIG_VALUE_MAX_LENGTH,
  },
];
