import { DataProviderFactory } from '../../../../dataStoreProvider/DataProviderFactory/DataProviderFactory';
import { WorldFactory } from '../../../entities/World/WorldFactory/WorldFactory';
import { WorldRepository } from '../WorldRepository';

describe('WorldRepository', () => {
  const plainTestWorld = WorldFactory.create('plainWorld');
  const privateTestWorld = WorldFactory.create('privateWorld');
  const hiddenTestWorld = WorldFactory.create('hiddenCave');
  const holidayTestWorld = WorldFactory.create('holiday');
  const returnTestWorld = WorldFactory.create('returnWithPotion');
  const dataProvider = new DataProviderFactory('any').createDataProvider('store');

  Object.defineProperty(dataProvider, 'list', {
    writable: true,
    value: () => {
      return [plainTestWorld.serialize(), privateTestWorld.serialize(), hiddenTestWorld.serialize(), holidayTestWorld.serialize(), returnTestWorld.serialize()];
    },
  });

  const worldRepository: WorldRepository = new WorldRepository(dataProvider);

  it('WHEN "list" is called, MUST return world entity', async () => {
    expect(await worldRepository.list({ pagination: { count: 1, page: 1 } })).toEqual([
      plainTestWorld,
      privateTestWorld,
      hiddenTestWorld,
      holidayTestWorld,
      returnTestWorld,
    ]);
  });
});
