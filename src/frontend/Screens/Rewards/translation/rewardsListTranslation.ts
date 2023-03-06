import { COMMON_LIST_TRANSLATION_SCHEMA } from '../../../App/initI18n/schemas/common-options';
import { TranslationNamespace } from '../../../App/initI18n/translationsSchema';

export const DEFAULT_FORM_VALUES: RewardInEdgeDTO = {
  description: '',
  name: '',
  id: '',
  isAchieved: false,
};

export const rewardsListTranslations = new TranslationNamespace<typeof COMMON_LIST_TRANSLATION_SCHEMA>('pages.rewardsList', COMMON_LIST_TRANSLATION_SCHEMA);
