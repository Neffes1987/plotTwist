import { AsyncStoreProvider } from '../AsyncStoreProvider/AsyncStoreProvider';
import { DataProviderFactory } from '../DataProviderFactory';
import { DataProviderType } from '../interface';

describe('DataProviderFactory', () => {
  describe('AND "createDataProvider" is called', () => {
    const provider = new DataProviderFactory('test');

    it('AND provided type is "Storage", MUST return provider for storage', () => {
      const result = provider.createDataProvider('store');

      expect(result instanceof AsyncStoreProvider).toBeTruthy();
    });

    it('AND provided type is not detected, MUST throw Error', () => {
      let error: Nullable<Error> = null;

      try {
        provider.createDataProvider('any' as DataProviderType);
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
    });
  });
});
