import { DataProviderFactory } from '../../../dataStoreProvider/DataProviderFactory/DataProviderFactory';
import { DTOConverter } from '../../DTOConverter/DTOConverter';
import { Repository } from '../Repository/Repository';

import { RepositoryFactoryType } from './interface';

export function createRepository(repositoryType: RepositoryFactoryType): Repository {
  const providerFactory = new DataProviderFactory(repositoryType);
  const provider = providerFactory.createDataProvider('store');

  switch (repositoryType) {
    case 'world':
      return new Repository(provider, new DTOConverter());
    default:
      return new Repository(provider, new DTOConverter(repositoryType));
  }
}
