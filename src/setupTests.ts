// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { PropsWithChildren } from 'react';

jest.mock('react-i18next', () => ({
  useTranslation: (): Record<string, unknown> => ({
    t: (key: string): string => key,
  }),
  Trans: ({ i18nKey }: PropsWithChildren<{ i18nKey: string }>): string => i18nKey,
}));

jest.mock('i18next', () => ({
  t: (key: string): string => key,
  on: (_: string, callback: () => void): void => callback(),
}));
