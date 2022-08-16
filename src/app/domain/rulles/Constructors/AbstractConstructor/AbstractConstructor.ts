import { AbstractEntity } from '../../../entities/AbstractEntity/AbstractEntity';
import { ListParams } from '../../../interface';

import { IAbstractConstructor, IRepository } from './interface';

export abstract class AbstractConstructor implements IAbstractConstructor<AbstractEntity> {
  protected readonly repository: IRepository;

  protected constructor(repository: IRepository) {
    this.repository = repository;
  }

  async list(params: ListParams): Promise<AbstractEntity[]> {
    return this.repository.list(params);
  }

  get(id: string): Promise<Nullable<AbstractEntity>> {
    return this.repository.get(id);
  }

  create(entity: AbstractEntity): Promise<string> {
    return this.repository.create(entity);
  }

  delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  update(entity: AbstractEntity): Promise<boolean> {
    return this.repository.update(entity);
  }
}
