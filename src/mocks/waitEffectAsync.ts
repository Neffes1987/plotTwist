import { act } from '@testing-library/react-native';

export async function waitEffectAsync(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  await act(async () => {
    await Promise.resolve();
  });
}
