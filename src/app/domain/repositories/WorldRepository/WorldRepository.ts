import { WorldDTO } from 'backend';

import { createEntity } from '../../entities/createEntity';
import { AbstractWorld } from '../../entities/World/AbstractWorld/AbstractWorld';
import { IDataProvider, RawDataType } from '../Repository/interface';
import { Repository } from '../Repository/Repository';

export class WorldRepository extends Repository {
  constructor(dataProvider: IDataProvider) {
    super(dataProvider);
  }

  protected unSerializeToEntity(object: RawDataType): AbstractWorld {
    const world = createEntity(((object as unknown) as WorldDTO).type);

    world.unSerializeToEntity((object as unknown) as WorldDTO);

    return world as AbstractWorld;
  }
}
