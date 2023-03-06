import { ActiveRecord } from 'src/app/domain/entities/ActiveRecord/ActiveRecord';

import { IWaterholeConstructor } from '../../../../../types/constructors/waterhole.constructor';
import { IWorldWaterholeConstructor } from '../../../../../types/constructors/world.constructor';
import { CrossWorldWaterholeDTO } from '../../../../../types/entities/cross';
import { CrossWorldWaterhole } from '../../../entities/Cross/CrossWorldWaterhole/CrossWorldWaterhole';

import { CommonCrossConstructor } from './CommonCrossConstructor';

export class CrossWorldWaterholeConstructor extends CommonCrossConstructor<CrossWorldWaterholeDTO> implements IWorldWaterholeConstructor {
  private readonly waterholeConstructor: IWaterholeConstructor;

  constructor(waterholeConstructor: IWaterholeConstructor) {
    super();
    this.waterholeConstructor = waterholeConstructor;
  }

  async assignedList(worldId: string): Promise<WaterholeInWorldDTO[]> {
    const model = this.getModel();

    const crossWorldWaterholes = await model.list({
      query: {
        worldId,
      },
    });

    const existed = crossWorldWaterholes.map(({ waterholeId }) => waterholeId);

    return this.waterholeConstructor.list({ query: { id: existed } });
  }

  async toggle(waterholesIds: string[], worldId: string): Promise<WaterholeInWorldDTO[]> {
    const crossWorldWaterholes = this.getModel();

    const available = await crossWorldWaterholes.list({
      query: {
        worldId,
      },
    });

    await this.upsertBunch(worldId, available, waterholesIds, 'waterholeId');

    return this.assignedList(worldId);
  }

  getModelDTO(parentID: string): CrossWorldWaterholeDTO {
    return {
      worldId: parentID,
      waterholeId: '',
      id: '',
    };
  }

  getModel(): ActiveRecord<CrossWorldWaterholeDTO> {
    return new CrossWorldWaterhole();
  }
}
