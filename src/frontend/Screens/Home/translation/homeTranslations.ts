import { TranslationNamespace } from '../../../App/initI18n/translationsSchema';
import { ROUTES } from '../../routes';

export const DEFAULT_FORM_VALUES: LawInWorldDTO = {
  id: '',
  isBroken: false,
  punishment: '',
  name: '',
  description: '',
};

export const TRANSLATION_SCHEMA = {
  caption: 'caption',
  labels: {
    activePlot: 'activePlot',
    laws: 'laws',
    rewards: 'rewards',
    characters: 'characters',
    activeCalls: 'activeCalls',
    waterholes: 'waterholes',
    plotList: 'plotList',
    tasks: 'tasks',
  },
};

export const homeTranslations = new TranslationNamespace<typeof TRANSLATION_SCHEMA>('pages.home', TRANSLATION_SCHEMA);

export const homeButtons: SelectOption[] = [
  { name: homeTranslations.labels.activePlot, id: ROUTES.activePlot, translate: true, icon: 'active-plot' },
  { name: homeTranslations.labels.plotList, id: ROUTES.plotList, translate: true, icon: 'plot' },
  { name: homeTranslations.labels.tasks, id: ROUTES.tasks, translate: true, icon: 'list' },
  { name: homeTranslations.labels.characters, id: ROUTES.characters, translate: true, icon: 'person' },
  { name: homeTranslations.labels.laws, id: ROUTES.laws, translate: true, icon: 'gavel' },
  { name: homeTranslations.labels.rewards, id: ROUTES.rewards, translate: true, icon: 'events' },
  { name: homeTranslations.labels.activeCalls, id: ROUTES.activeCalls, translate: true, icon: 'chat' },
  // { name: homeTranslations.labels.waterholes, id: ROUTES.waterholes, translate: true, icon: 'place' },
];
