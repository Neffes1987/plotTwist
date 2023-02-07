import { CharacterEnum } from '../../../constants/character.enum';
import { WorldEnum } from '../../../constants/world.enum';
import { TranslationNamespace } from '../../App/initI18n/translationsSchema';

export const WORLD_WIDGET_EDGE_TRANSLATION_SCHEMA = {
  caption: 'caption',
  labels: {
    aboutEdge: 'aboutEdge',
    rewards: 'rewards',
    activeChallenges: 'activeChallenges',
    passedChallenges: 'passedChallenges',
    failedChallenges: 'failedChallenges',
  },
};

export const worldWidgetEdgeTranslations = new TranslationNamespace<typeof WORLD_WIDGET_EDGE_TRANSLATION_SCHEMA>(
  'widget.worldWidgetEdge',
  WORLD_WIDGET_EDGE_TRANSLATION_SCHEMA,
);

export const WORLD_WIDGET_NPC_TRANSLATION_SCHEMA = {
  caption: 'caption',
  labels: {
    [CharacterEnum.Ally]: 'ally',
    [CharacterEnum.Enemy]: 'enemy',
    [CharacterEnum.Guard]: 'guard',
    [CharacterEnum.Messenger]: 'messenger',
    [CharacterEnum.Mentor]: 'mentor',
    [CharacterEnum.Shadow]: 'shadow',
  },
};

export const worldWidgetNPCTranslations = new TranslationNamespace<typeof WORLD_WIDGET_NPC_TRANSLATION_SCHEMA>(
  'widget.worldWidgetNPC',
  WORLD_WIDGET_NPC_TRANSLATION_SCHEMA,
);

export const WORLD_WIDGET_INFO_TRANSLATION_SCHEMA = {
  caption: 'caption',
  errors: {
    worldInDraft: 'worldInDraft',
  },
  labels: {
    brokenLaws: 'brokenLaws',
    activeCalls: 'activeCalls',
    waterholes: 'waterholes',
    aboutWorld: 'aboutWorld',
  },
  lists: {
    captions: {
      [WorldEnum.PlainWorld]: 'plainWorld',
      [WorldEnum.PrivateWorld]: 'privateWorld',
      [WorldEnum.HiddenCaveWorld]: 'hiddenCaveWorld',
      [WorldEnum.HolidayWorld]: 'holidayWorld',
      [WorldEnum.ReturnWithPotionWorld]: 'returnWithPotionWorld',
    },
    faq: {
      [WorldEnum.PlainWorld]: 'plainWorld',
      [WorldEnum.PrivateWorld]: 'privateWorld',
      [WorldEnum.HiddenCaveWorld]: 'hiddenCaveWorld',
      [WorldEnum.HolidayWorld]: 'holidayWorld',
      [WorldEnum.ReturnWithPotionWorld]: 'returnWithPotionWorld',
    },
  },
};

export const worldWidgetInfoTranslations = new TranslationNamespace<typeof WORLD_WIDGET_INFO_TRANSLATION_SCHEMA>(
  'widget.worldWidgetInfo',
  WORLD_WIDGET_INFO_TRANSLATION_SCHEMA,
);
