import { CrossWorldEdgeDTO } from '../../../../../types/entities/cross';
import { AsyncStoreDataGateway } from '../../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { ActiveRecord } from '../../ActiveRecord/ActiveRecord';

export class CrossWorldEdge extends ActiveRecord<CrossWorldEdgeDTO> {
  isSolved = false;
  edgeId: string;
  worldId: string;

  constructor() {
    super(new AsyncStoreDataGateway('cross-world-edge'));
  }

  serialize(): CrossWorldEdgeDTO {
    return {
      id: this.id,
      edgeId: this.edgeId,
      worldId: this.worldId,
      isSolved: this.isSolved,
    };
  }

  validate(): void {
    //
  }

  list(params: ListParams<CrossWorldEdgeDTO>): Promise<CrossWorldEdgeDTO[]> {
    return this._gateway.list(params);
  }
}
