import { DataProviderFactory } from '../../../dataStoreProvider/DataProviderFactory/DataProviderFactory';
import { AbstractRepository } from '../AbstractRepository/AbstractRepository';
import { PlotRepository } from '../PlotRepository/PlotRepository';
import { WorldRepository } from '../WorldRepository/WorldRepository';

import { RepositoryFactoryType } from './interface';

export class RepositoryFactory {
  createRepository(repositoryType: RepositoryFactoryType): AbstractRepository {
    const providerFactory = new DataProviderFactory(repositoryType);
    const provider = providerFactory.createDataProvider('store');

    switch (repositoryType) {
      case 'plot':
        return new PlotRepository(provider);
      case 'world':
        return new WorldRepository(provider);
    }
  }
}
