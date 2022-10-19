import { CrossWorldLawDTO } from '../../../../../types/entities/cross';
import { AsyncStoreDataGateway } from '../../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { ActiveRecord } from '../../ActiveRecord/ActiveRecord';

export class CrossWorldLaw extends ActiveRecord<CrossWorldLawDTO> {
  isBroken = false;
  lawId: string;
  worldId: string;

  constructor(id?: string) {
    super(new AsyncStoreDataGateway('cross-world-law'), id ?? '');
  }

  serialize(): CrossWorldLawDTO {
    return {
      id: this.id,
      lawId: this.lawId,
      worldId: this.worldId,
      isBroken: this.isBroken,
    };
  }

  unSerialize(raw: CrossWorldLawDTO): void {
    const { lawId, worldId, isBroken, id } = raw;

    this.lawId = lawId;
    this.worldId = worldId;
    this.isBroken = isBroken;
    this.id = id;
  }

  validate(): void {
    //
  }

  listByWorldId(worldId: string): Promise<CrossWorldLawDTO[]> {
    return this._gateway.list({ query: { worldId } });
  }

  async loadByLawId(lawId: string): Promise<void> {
    const dto = (await this._gateway.list({ query: { lawId } }))[0];

    if (dto) {
      this.unSerialize(dto);
    }
  }
}
