import { CrossTaskCharacterDTO } from '../../../../../types/entities/cross';
import { AsyncStoreDataGateway } from '../../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { ActiveRecord } from '../../ActiveRecord/ActiveRecord';

export class CrossTaskCharacter extends ActiveRecord<CrossTaskCharacterDTO> {
  isAlive = true;
  characterId: string;
  taskId: string;

  constructor() {
    super(new AsyncStoreDataGateway('cross-task-character'));
  }

  serialize(): CrossTaskCharacterDTO {
    return {
      id: this.id,
      characterId: this.characterId,
      taskId: this.taskId,
      isAlive: this.isAlive,
    };
  }

  validate(): void {
    //
  }

  list(params: ListParams<CrossTaskCharacterDTO>): Promise<CrossTaskCharacterDTO[]> {
    return this._gateway.list(params);
  }
}
