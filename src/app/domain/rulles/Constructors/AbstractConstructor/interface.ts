import { AbstractEntity } from '../../../entities/AbstractEntity/AbstractEntity';
import { ListParams } from '../../../interface';

export interface IAbstractConstructor<Entity extends AbstractEntity> {
  get: (id: string) => Promise<Nullable<Entity>>;
  create: (entity: Entity) => Promise<string>;
  update: (entity: Entity) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
  list: (params: ListParams) => Promise<Entity[]>;
}

export interface IRepository {
  delete: (entityId: string) => Promise<boolean>;
  create: (entity: AbstractEntity) => Promise<string>;
  list: (params: ListParams) => Promise<AbstractEntity[]>;
  get: (entityId: string) => Promise<Nullable<AbstractEntity>>;
  update: (entity: AbstractEntity) => Promise<boolean>;
}
