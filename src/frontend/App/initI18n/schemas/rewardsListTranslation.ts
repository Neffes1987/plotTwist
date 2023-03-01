import { TranslationNamespace } from '../translationsSchema';

import { COMMON_LIST_TRANSLATION_SCHEMA } from './common-options';

export const DEFAULT_FORM_VALUES: RewardInEdgeDTO = {
  description: '',
  name: '',
  id: '',
  isAssigned: false,
};

export const rewardsListTranslations = new TranslationNamespace<typeof COMMON_LIST_TRANSLATION_SCHEMA>('pages.rewardsList', COMMON_LIST_TRANSLATION_SCHEMA);
