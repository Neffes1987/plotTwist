import { WorldDTO } from 'backend';

import { AbstractWorld } from '../../entities/World/AbstractWorld/AbstractWorld';
import { WorldType } from '../../entities/World/AbstractWorld/interface';
import { WorldFactory } from '../../entities/World/WorldFactory/WorldFactory';
import { AbstractRepository } from '../AbstractRepository/AbstractRepository';
import { IDataProvider, RawDataType } from '../AbstractRepository/interface';

export class WorldRepository extends AbstractRepository {
  constructor(dataProvider: IDataProvider) {
    super(dataProvider);
  }

  protected unSerializeToEntity(object: RawDataType): AbstractWorld {
    const world: AbstractWorld = WorldFactory.create(object.type as WorldType);

    world.unSerializeToEntity((object as unknown) as WorldDTO);

    return world;
  }
}
