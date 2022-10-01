import { DataProviderFactory } from '../../../dataStoreProvider/DataProviderFactory/DataProviderFactory';
import { AbstractRepository } from '../AbstractRepository/AbstractRepository';
import { LawsRepository } from '../LawsRepository/LawsRepository';
import { PlotRepository } from '../PlotRepository/PlotRepository';
import { RelationsRepository } from '../RelationsRepository/RelationsRepository';
import { WorldRepository } from '../WorldRepository/WorldRepository';

import { RepositoryFactoryType } from './interface';

export function createRepository(repositoryType: RepositoryFactoryType): AbstractRepository {
  const providerFactory = new DataProviderFactory(repositoryType);
  const provider = providerFactory.createDataProvider('store');

  switch (repositoryType) {
    case 'plot':
      return new PlotRepository(provider);
    case 'world':
      return new WorldRepository(provider);
    case 'laws':
      return new LawsRepository(provider);
    case 'relation':
      return new RelationsRepository(provider);
  }
}
