import { waitEffectAsync } from '@mocks/functions';
import { MockedAsyncStorage } from '@mocks/MockedAsyncStorage';

import { PlotDTO } from '../../../../../types/entities/plot';
import { AsyncStoreDataGateway } from '../AsyncStoreDataGateway';

const storage = new MockedAsyncStorage();

describe('AsyncStoreDataGateway', () => {
  const testData = {
    'entity-plot': JSON.stringify({
      id1: { id: 'id1', name: 'name1' },
      id2: { id: 'id2', name: 'name2' },
      id3: { id: 'id3', name: 'name3' },
    }),
    someOtherDocument: JSON.stringify({
      id6: { id: 'id6', name: 'name6' },
      id4: { id: 'id4', name: 'name4' },
      id5: { id: 'id5', name: 'name5' },
    }),
  };

  const testPlot = JSON.parse(testData['entity-plot']).id1;
  const testPlot1 = JSON.parse(testData['entity-plot']).id2;

  beforeEach(() => {
    storage.setStorageData(testData);
  });

  describe('WHEN "list" is called', () => {
    it('MUST read records from particular document by entity name', async () => {
      const provider = new AsyncStoreDataGateway('plot');

      await waitEffectAsync();

      const list = await provider.list({ query: { id: 'id1' } });

      expect(list).toEqual([testPlot]);
    });

    it('AND result is empty, MUST return empty array', async () => {
      const provider = new AsyncStoreDataGateway('plot');

      await waitEffectAsync();

      const list = await provider.list({ query: { id: 'test' } });

      expect(list).toHaveLength(0);
    });

    describe('AND "queryParams" was provided', () => {
      it('AND one of params are array, MUST return data by provided query', async () => {
        const provider = new AsyncStoreDataGateway<PlotDTO>('plot');

        await waitEffectAsync();

        const list = await provider.list({ query: { id: ['id1', 'id2'] } });

        expect(list).toEqual([testPlot, testPlot1]);
      });
    });
  });

  describe('WHEN "get" is called', () => {
    it('AND result is empty, MUST return null', async () => {
      const provider = new AsyncStoreDataGateway('plot');

      await waitEffectAsync();

      const item = await provider.get('test');

      expect(item).toEqual(null);
    });

    it('MUST return entity record', async () => {
      const provider = new AsyncStoreDataGateway('plot');

      await waitEffectAsync();

      const item = await provider.get(testPlot.id);

      expect(item).toEqual(testPlot);
    });
  });

  describe('WHEN "save" is called', () => {
    it('MUST update record in particular document', async () => {
      const provider = new AsyncStoreDataGateway('plot');
      const expectedResult = { ...testPlot };

      expectedResult.name = 'some_new_name';

      const newPlotTestData = { ...JSON.parse(testData['entity-plot']) };

      newPlotTestData[expectedResult.id] = expectedResult;

      await waitEffectAsync();

      await provider.save(expectedResult);

      expect(JSON.parse(storage.storage['entity-plot'] as string)).toEqual(newPlotTestData);
    });

    it('MUST return boolean', async () => {
      const provider = new AsyncStoreDataGateway('plot');

      expect(await provider.save(testPlot)).toBeTruthy();
    });
  });

  describe('WHEN "delete" is called', () => {
    it('MUST remove record in particular document', async () => {
      const provider = new AsyncStoreDataGateway('plot');
      const expectedResult = { ...testPlot };

      expectedResult.name = 'some_new_name';

      const newPlotTestData = { ...JSON.parse(testData['entity-plot']) };

      newPlotTestData[expectedResult.id] = undefined;

      await waitEffectAsync();

      await provider.delete(expectedResult.id);

      expect(JSON.parse(storage.storage['entity-plot'] as string)).toEqual(newPlotTestData);
    });

    it('MUST return boolean', async () => {
      const provider = new AsyncStoreDataGateway('plot');

      await provider.delete(testPlot.id);

      expect(await provider.delete(testPlot.id)).toBeTruthy();
    });
  });

  describe('WHEN "create" is called', () => {
    it('MUST create record in particular document', async () => {
      const provider = new AsyncStoreDataGateway('plot');
      const expectedResult = { ...testPlot, name: 'name55' };

      expectedResult.name = 'some_new_name';

      await waitEffectAsync();

      await provider.save((expectedResult as unknown) as CommonEntityDTO);

      expect(Object.keys(JSON.parse(storage.storage['entity-plot'] as string))).toHaveLength(Object.keys(JSON.parse(testData['entity-plot'])).length);
    });

    it('MUST return "uuid" of created record', async () => {
      const provider = new AsyncStoreDataGateway('plot');
      const expectedResult = { name: 'name55' };

      await waitEffectAsync();

      const newId = await provider.save((expectedResult as unknown) as CommonEntityDTO);
      const storageValues = JSON.parse(storage.storage['entity-plot'] as string);

      expect(storageValues[newId].name).toEqual(expectedResult.name);
    });
  });
});
