import { DataProviderFactory } from '../../../dataStoreProvider/DataProviderFactory/DataProviderFactory';
import { Repository } from '../Repository/Repository';
import { WorldRepository } from '../WorldRepository/WorldRepository';

import { RepositoryFactoryType } from './interface';

export function createRepository(repositoryType: RepositoryFactoryType): Repository {
  const providerFactory = new DataProviderFactory(repositoryType);
  const provider = providerFactory.createDataProvider('store');

  switch (repositoryType) {
    case 'world':
      return new WorldRepository(provider);
    default:
      return new Repository(provider, repositoryType);
  }
}
