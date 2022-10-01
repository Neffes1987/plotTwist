import { DataProviderFactory } from '../../../../dataStoreProvider/DataProviderFactory/DataProviderFactory';
import { Plot } from '../../../entities/Plot/Plot';
import { PlotRepository } from '../PlotRepository';

describe('PlotRepository', () => {
  const plot = new Plot();
  const dataProvider = new DataProviderFactory('plot').createDataProvider('store');

  Object.defineProperty(dataProvider, 'list', {
    writable: true,
    value: () => {
      return [plot];
    },
  });

  const plotRepository: PlotRepository = new PlotRepository(dataProvider);

  it('WHEN "list" is called, MUST return plot entity', async () => {
    expect(await plotRepository.list({ pagination: { count: 1, page: 1 } })).toEqual([plot]);
  });
});
