import { CrossWorldWaterholeDTO } from '../../../../../types/entities/cross';
import { AsyncStoreDataGateway } from '../../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { ActiveRecord } from '../../ActiveRecord/ActiveRecord';

export class CrossWorldWaterhole extends ActiveRecord<CrossWorldWaterholeDTO> {
  isBroken = false;
  waterholeId: string;
  worldId: string;

  constructor() {
    super(new AsyncStoreDataGateway('cross-world-law'));
  }

  serialize(): CrossWorldWaterholeDTO {
    return {
      id: this.id,
      waterholeId: this.waterholeId,
      worldId: this.worldId,
    };
  }

  unSerialize(raw: CrossWorldWaterholeDTO): void {
    const { waterholeId, worldId, id } = raw;

    this.waterholeId = waterholeId;
    this.worldId = worldId;
    this.id = id;
  }

  validate(): void {
    //
  }

  listByWorldId(worldId: string): Promise<CrossWorldWaterholeDTO[]> {
    return this._gateway.list({ query: { worldId } });
  }

  async loadByWaterholeId(waterholeId: string): Promise<void> {
    const dto = (await this._gateway.list({ query: { waterholeId } }))[0];

    if (dto) {
      this.unSerialize(dto);
    }
  }
}
