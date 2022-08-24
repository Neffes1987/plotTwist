import { IWorldController, WorldDTO } from 'backend';

import { AbstractWorld } from '../../domain/entities/World/AbstractWorld/AbstractWorld';
import { WorldFactory } from '../../domain/entities/World/WorldFactory/WorldFactory';
import { WorldConstructor } from '../../domain/rulles/Constructors/WorldConstructor/WorldConstructor';
import { AbstractController } from '../AbstractController/AbstractController';

export class WorldController extends AbstractController<WorldDTO, Omit<WorldDTO, 'waterholes' | 'laws'>> implements IWorldController {
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
