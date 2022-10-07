import { RawDataType } from '../../domain/repositories/Repository/interface';
import { RepositoryFactoryType } from '../../domain/repositories/RepositoryFactory/interface';

export type DataProviderType = 'db' | 'store';
export type DataStoreSchema = Record<RepositoryFactoryType, RawDataType[]>;
