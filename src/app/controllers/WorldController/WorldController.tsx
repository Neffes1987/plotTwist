import { WorldDTO } from 'backend';

import { AbstractWorld } from '../../domain/entities/World/AbstractWorld/AbstractWorld';
import { WorldFactory } from '../../domain/entities/World/WorldFactory/WorldFactory';
import { WorldConstructor } from '../../domain/rulles/Constructors/WorldConstructor/WorldConstructor';
import { Controller } from '../Controller/Controller';

export class WorldController extends Controller {
  constructor() {
    super(new WorldConstructor());
  }

  convertDTOtoEntity(dto: WorldDTO): AbstractWorld {
    const world = WorldFactory.create(dto.type);

    world.unSerializeToEntity(dto);
    world.validate();

    return world;
  }
}
