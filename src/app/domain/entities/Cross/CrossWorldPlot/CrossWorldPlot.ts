import { StatusEnum } from '../../../../../constants/status.enum';
import { WorldEnum } from '../../../../../constants/world.enum';
import { CrossWorldPlotDTO } from '../../../../../types/entities/cross';
import { AsyncStoreDataGateway } from '../../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { ActiveRecord } from '../../ActiveRecord/ActiveRecord';

export class CrossWorldPlot extends ActiveRecord<CrossWorldPlotDTO> {
  status: StatusEnum;
  plotId: string;
  worldId: string;
  type: WorldEnum;

  constructor() {
    super(new AsyncStoreDataGateway('cross-world-plot'));
  }

  serialize(): CrossWorldPlotDTO {
    return {
      id: this.id,
      plotId: this.plotId,
      worldId: this.worldId,
      status: this.status,
      type: this.type,
    };
  }

  unSerialize(raw: CrossWorldPlotDTO): void {
    const { plotId, worldId, status, id, type } = raw;

    this.plotId = plotId;
    this.worldId = worldId;
    this.status = status;
    this.id = id;
    this.type = type;
  }

  validate(): void {
    //
  }

  getWorldListByPlotId(plotId: string): Promise<CrossWorldPlotDTO[]> {
    return this._gateway.list({ query: { plotId } });
  }
}
