import { waitEffectAsync } from '@mocks/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Store } from '../Store';

describe('WHEN "Store" created', () => {
  const testId = JSON.stringify({ currentPlotId: 'test-id' });

  beforeEach(async () => {
    await AsyncStorage.setItem(Store.SETTINGS_STORE_KEY, testId);
  });

  it('MUST load user data from store to memory', async () => {
    const store = new Store();

    await waitEffectAsync();

    expect(store.settings.currentPlotId).toEqual('test-id');
  });

  describe('AND data in cache was changed', () => {
    it('MUST update data in cache', () => {
      const store = new Store();

      store.setCurrentPlot('1');

      expect(store.settings.currentPlotId).toEqual('1');
    });

    it('MUST update data in AsyncStorage', async () => {
      const store = new Store();

      await store.setCurrentPlot('1');

      expect(await AsyncStorage.getItem(Store.SETTINGS_STORE_KEY)).toEqual(
        JSON.stringify({
          currentPlotId: '1',
        }),
      );
    });
  });
});
