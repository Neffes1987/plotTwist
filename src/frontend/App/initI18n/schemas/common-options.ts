import { GenderEnum } from '../../../../constants/character.enum';
import { TranslationNamespace } from '../translationsSchema';

export const COMMON_OPTIONS_TRANSLATION_SCHEMA = {
  caption: '',
  labels: {},
  lists: {
    actions: {
      open: 'open',
      close: 'close',
      edit: 'edit',
      create: 'create',
    },
    gender: {
      male: 'male',
      female: 'female',
    },
    confirm: {
      caption: 'caption',
      yes: 'yes',
      no: 'no',
    },
  },
};

export const optionsListTranslations = new TranslationNamespace<typeof COMMON_OPTIONS_TRANSLATION_SCHEMA>(
  'pages.commonLists',
  COMMON_OPTIONS_TRANSLATION_SCHEMA,
);

export const confirmOptions: SelectOptionTyped<boolean>[] = [
  {
    id: true,
    name: optionsListTranslations.lists.confirm.yes,
  },
  {
    id: false,
    name: optionsListTranslations.lists.confirm.no,
  },
];

export const genderOptions: SelectOptionTyped<GenderEnum>[] = [
  {
    id: GenderEnum.Male,
    name: optionsListTranslations.lists.gender.male,
  },
  {
    id: GenderEnum.Female,
    name: optionsListTranslations.lists.gender.female,
  },
];

export const COMMON_LIST_TRANSLATION_SCHEMA = {
  caption: 'caption',
  messages: {
    wasCreated: 'wasCreated',
    emptyList: 'emptyList',
  },
  actions: {
    addNew: 'addNew',
    update: 'update',
    delete: 'delete',
    open: 'open',
    assign: 'assign',
    unAssign: 'unAssign',
  },
  errors: {},
  labels: {
    name: 'name',
    description: 'description',
  },
};
