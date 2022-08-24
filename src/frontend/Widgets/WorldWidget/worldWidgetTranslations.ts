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
    ally: 'ally',
    enemy: 'enemy',
    guard: 'guard',
    messenger: 'messenger',
    mentor: 'mentor',
    shadow: 'shadow',
  },
};

export const worldWidgetNPCTranslations = new TranslationNamespace<typeof WORLD_WIDGET_NPC_TRANSLATION_SCHEMA>(
  'widget.worldWidgetNPC',
  WORLD_WIDGET_NPC_TRANSLATION_SCHEMA,
);

export const WORLD_WIDGET_INFO_TRANSLATION_SCHEMA = {
  caption: 'caption',
  labels: {
    brokenLaws: 'brokenLaws',
    activeCalls: 'activeCalls',
    waterholes: 'waterholes',
    aboutWorld: 'aboutWorld',
  },
  lists: {
    captions: {
      plainWorld: 'plainWorld',
      privateWorld: 'privateWorld',
      hiddenCave: 'hiddenCaveWorld',
      holiday: 'holidayWorld',
      returnWithPotion: 'returnWithPotionWorld',
    },
    faq: {
      plainWorld: 'plainWorld',
      privateWorld: 'privateWorld',
      hiddenCave: 'hiddenCaveWorld',
      holiday: 'holidayWorld',
      returnWithPotion: 'returnWithPotionWorld',
    },
  },
};

export const worldWidgetInfoTranslations = new TranslationNamespace<typeof WORLD_WIDGET_INFO_TRANSLATION_SCHEMA>(
  'widget.worldWidgetInfo',
  WORLD_WIDGET_INFO_TRANSLATION_SCHEMA,
);
