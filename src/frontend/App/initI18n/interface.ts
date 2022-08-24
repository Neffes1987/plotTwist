export type Locale = 'ru_RU';
export type LocaleCode = 'ru';

export interface TranslationPage {
  caption: string;
  messages?: Record<string, string>;
  errors?: Record<string, string>;
  actions?: Record<string, string>;
  lists?: Record<string, Record<string, string>>;
  labels: Record<string, unknown>;
}

export interface Translation {
  translation: {
    messages: Record<string, string>;
    errors: Record<string, string | Record<string, string>>;
    actions: Record<string, string>;
    pages: Record<string, TranslationPage>;
    widget: Record<string, TranslationPage>;
  };
}

export type Dictionary = Record<LocaleCode, Translation>;
