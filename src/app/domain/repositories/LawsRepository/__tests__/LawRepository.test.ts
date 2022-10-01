import { DataProviderFactory } from '../../../../dataStoreProvider/DataProviderFactory/DataProviderFactory';
import { Law } from '../../../entities/Law/Law';
import { LawsRepository } from '../LawsRepository';

describe('LawsRepository', () => {
  const law = new Law();
  const dataProvider = new DataProviderFactory('law').createDataProvider('store');

  Object.defineProperty(dataProvider, 'list', {
    writable: true,
    value: () => {
      return [law];
    },
  });

  const lawsRepository: LawsRepository = new LawsRepository(dataProvider);

  it('WHEN "list" is called, MUST return law entity', async () => {
    expect(await lawsRepository.list({ pagination: { count: 1, page: 1 } })).toEqual([law]);
  });
});
