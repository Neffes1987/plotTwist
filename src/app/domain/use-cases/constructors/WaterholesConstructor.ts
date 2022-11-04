import { IWaterholeConstructor } from '../../../../types/constructors/waterhole.constructor';
import { CrossWorldWaterhole } from '../../entities/Cross/CrossWorldWaterhole/CrossWorldWaterhole';
import { Waterhole } from '../../entities/Waterhole/Waterhole';

export class WaterholesConstructor implements IWaterholeConstructor {
  async delete(id: string): Promise<boolean> {
    const crossWorldWaterhole = new CrossWorldWaterhole();

    await crossWorldWaterhole.loadByWaterholeId(id);
    await crossWorldWaterhole.remove();

    const waterhole = new Waterhole();

    waterhole.id = id;

    return waterhole.remove();
  }

  async get(id: string): Promise<Nullable<WaterholeDTO>> {
    const waterhole = new Waterhole();

    waterhole.id = id;

    await waterhole.load();

    return waterhole.serialize();
  }

  list(params: ListParams<WaterholeDTO>): Promise<WaterholeDTO[]> {
    const waterhole = new Waterhole();

    return waterhole.list(params);
  }

  async save(dto: WaterholeDTO): Promise<string> {
    const waterhole = new Waterhole();

    waterhole.unSerialize(dto);

    waterhole.id = await waterhole.save();

    return waterhole.id;
  }

  async getWorldWaterholes(worldId: string): Promise<WaterholeInWorldDTO[]> {
    const crossWorldWaterhole = new CrossWorldWaterhole();
    const waterhole = new Waterhole();

    const crossWorldWaterholes = await crossWorldWaterhole.listByWorldId(worldId);

    return waterhole.list({
      query: {
        id: crossWorldWaterholes.map(({ waterholeId }) => waterholeId),
      },
    });
  }
}
