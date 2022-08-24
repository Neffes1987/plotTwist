import { waitEffectAsync } from '@mocks/functions';
import { MockedAsyncStorage } from '@mocks/MockedAsyncStorage';

import { RawDataType } from '../../../../domain/repositories/AbstractRepository/interface';
import { AsyncStoreProvider } from '../AsyncStoreProvider';

const storage = new MockedAsyncStorage();

describe('AsyncStoreProvider', () => {
  const testData = {
    plot: JSON.stringify([
      { id: 'id1', name: 'name1' },
      { id: 'id2', name: 'name2' },
      { id: 'id3', name: 'name3' },
    ]),
    someOtherDocument: JSON.stringify([
      { id: 'id6', name: 'name6' },
      { id: 'id4', name: 'name4' },
      { id: 'id5', name: 'name5' },
    ]),
  };

  beforeEach(() => {
    storage.setStorageData(testData);
  });

  describe('WHEN "AsyncStoreProvider" is created', () => {
    it('AND static cache is empty, MUST read data from storage, with "db"', async () => {
      const provider = new AsyncStoreProvider('plot');

      await waitEffectAsync();

      expect(storage.getItem).toHaveBeenCalledWith('plot');
      expect(provider.schema).toEqual(JSON.parse(testData.plot));
    });

    it('AND static cache is NOT empty, MUST NOT read data from storage', async () => {
      // eslint-disable-next-line no-new
      new AsyncStoreProvider('plot');
      await waitEffectAsync();

      // eslint-disable-next-line no-new
      new AsyncStoreProvider('plot');
      await waitEffectAsync();

      expect(storage.getItem).toBeCalledTimes(1);
    });
  });

  describe('WHEN "list" is called', () => {
    it('MUST read records from particular document by entity name', async () => {
      const provider = new AsyncStoreProvider('plot');

      await waitEffectAsync();

      const list = await provider.list({ pagination: { count: 2, page: 1 } });

      expect(list).toEqual(JSON.parse(testData.plot).splice(0, 2));
    });

    it('AND result is empty, MUST return empty array', async () => {
      const provider = new AsyncStoreProvider('plot');

      await waitEffectAsync();

      const list = await provider.list({ pagination: { count: 2, page: 1 }, queryParams: { worldId: '1' } });

      expect(list).toHaveLength(0);
    });

    it('AND "queryParams" was provided, MUST return data by provided query', async () => {
      const provider = new AsyncStoreProvider('plot');

      await waitEffectAsync();

      const list = await provider.list({ pagination: { count: 2, page: 1 }, queryParams: { id: 'id1', name: 'name1' } });

      expect(list).toEqual([JSON.parse(testData.plot)[0]]);
    });
  });

  describe('WHEN "get" is called', () => {
    it('AND result is empty, MUST return null', async () => {
      const provider = new AsyncStoreProvider('plot');
      const expectedResult = JSON.parse(testData.someOtherDocument)[0];

      await waitEffectAsync();

      const item = await provider.get(expectedResult.id);

      expect(item).toEqual(null);
    });

    it('MUST return entity record', async () => {
      const provider = new AsyncStoreProvider('plot');
      const expectedResult = JSON.parse(testData.plot)[0];

      await waitEffectAsync();

      const item = await provider.get(expectedResult.id);

      expect(item).toEqual(expectedResult);
    });
  });

  describe('WHEN "update" is called', () => {
    it('MUST update record in particular document', async () => {
      const provider = new AsyncStoreProvider('plot');
      const expectedResult = JSON.parse(testData.plot)[0];

      expectedResult.name = 'some_new_name';

      const newPlotTestData = [...JSON.parse(testData.plot)];

      newPlotTestData.shift();
      newPlotTestData.push(expectedResult);

      await waitEffectAsync();

      await provider.update(expectedResult);

      expect(JSON.parse(storage.storage.plot as string)).toEqual(newPlotTestData);
    });

    it('MUST return boolean', async () => {
      const provider = new AsyncStoreProvider('plot');
      const expectedResult = JSON.parse(testData.plot)[0];

      expectedResult.name = 'some_new_name';
      await waitEffectAsync();

      expect(await provider.update(expectedResult)).toBeTruthy();
    });
  });

  describe('WHEN "delete" is called', () => {
    it('MUST remove record in particular document', async () => {
      const provider = new AsyncStoreProvider('plot');
      const expectedResult = JSON.parse(testData.plot)[0];

      const newPlotTestData = [...JSON.parse(testData.plot)];

      newPlotTestData.shift();

      await waitEffectAsync();

      await provider.delete(expectedResult.id);

      expect(JSON.parse(storage.storage.plot as string)).toEqual(newPlotTestData);
    });

    it('MUST return boolean', async () => {
      const provider = new AsyncStoreProvider('plot');
      const expectedResult = JSON.parse(testData.plot)[0];

      await waitEffectAsync();

      await provider.delete(expectedResult.id);

      expect(await provider.delete(expectedResult.id)).toBeTruthy();
    });
  });

  describe('WHEN "create" is called', () => {
    it('MUST create record in particular document', async () => {
      const provider = new AsyncStoreProvider('plot');
      const expectedResult = { name: 'name55' };

      const newPlotTestData = [...JSON.parse(testData.plot)];

      newPlotTestData.push(expectedResult);

      await waitEffectAsync();

      await provider.create(expectedResult as RawDataType);

      expect(JSON.parse(storage.storage.plot as string)).toEqual(newPlotTestData);
    });

    it('MUST return "uuid" of created record', async () => {
      const provider = new AsyncStoreProvider('plot');
      const expectedResult = { name: 'name55' };

      const newPlotTestData = [...JSON.parse(testData.plot)];

      newPlotTestData.push(expectedResult);

      await waitEffectAsync();

      const newId = await provider.create(expectedResult as RawDataType);
      const storageValues = JSON.parse(storage.storage.plot as string);

      expect(storageValues.find(({ id }: { id: string }) => id === newId).name).toEqual(expectedResult.name);
    });
  });
});
