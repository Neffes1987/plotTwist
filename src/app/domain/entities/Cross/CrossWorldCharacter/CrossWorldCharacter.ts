import { CrossWorldCharacterDTO } from '../../../../../types/entities/cross';
import { AsyncStoreDataGateway } from '../../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { ActiveRecord } from '../../ActiveRecord/ActiveRecord';

export class CrossWorldCharacter extends ActiveRecord<CrossWorldCharacterDTO> {
  isAlive = true;
  characterId: string;
  worldId: string;

  constructor() {
    super(new AsyncStoreDataGateway('cross-world-character'));
  }

  serialize(): CrossWorldCharacterDTO {
    return {
      id: this.id,
      characterId: this.characterId,
      worldId: this.worldId,
      isAlive: this.isAlive,
    };
  }

  validate(): void {
    //
  }

  list(params: ListParams<CrossWorldCharacterDTO>): Promise<CrossWorldCharacterDTO[]> {
    return this._gateway.list(params);
  }
}
