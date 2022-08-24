import { CommonDTO } from 'backend';

import { ListParams } from '../../interface';

export type RawDataType = CommonDTO & Record<string, Nullable<string | number | boolean>>;

export interface IDataProvider {
  create: (entity: RawDataType) => Promise<string>;
  delete: (entityId: string) => Promise<boolean>;
  get: (entityId: string) => Promise<Nullable<RawDataType>>;
  update: (entity: RawDataType) => Promise<boolean>;
  list: (params: ListParams) => Promise<RawDataType[]>;
}
