import { ICharacterConstructor } from '../../../../../types/constructors/character.constructor';
import { IWorldCharacterConstructor } from '../../../../../types/constructors/world.constructor';
import { InWorldCharacterDTO } from '../../../../../types/entities/character';
import { CrossWorldCharacterDTO } from '../../../../../types/entities/cross';
import { ActiveRecord } from '../../../entities/ActiveRecord/ActiveRecord';
import { CrossWorldCharacter } from '../../../entities/Cross/CrossWorldCharacter/CrossWorldCharacter';

import { CommonCrossConstructor } from './CommonCrossConstructor';

export class CrossWorldCharacterConstructor extends CommonCrossConstructor<CrossWorldCharacterDTO> implements IWorldCharacterConstructor {
  characterConstructor: ICharacterConstructor;

  constructor(characterConstructor: ICharacterConstructor) {
    super();
    this.characterConstructor = characterConstructor;
  }

  getModel(): ActiveRecord<CrossWorldCharacterDTO> {
    return new CrossWorldCharacter();
  }

  async assignedList(worldId: string): Promise<InWorldCharacterDTO[]> {
    const worldCharacters = this.getModel();

    const availableCharacters = await worldCharacters.list({
      query: {
        worldId,
      },
    });

    const existedCharactersList: Record<string, boolean> = {};

    availableCharacters.forEach(({ characterId, isAlive }) => {
      existedCharactersList[characterId] = isAlive;
    });

    const characters = await this.characterConstructor.list({ query: { id: Object.keys(existedCharactersList) } });

    return characters.map(item => ({
      ...item,
      isAlive: existedCharactersList[item.id],
    })) as InWorldCharacterDTO[];
  }

  async toggle(charactersIds: string[], worldId: string): Promise<InWorldCharacterDTO[]> {
    const worldCharacters = new CrossWorldCharacter();

    const availableCharacters = await worldCharacters.list({
      query: {
        worldId,
      },
    });

    await this.upsertBunch(worldId, availableCharacters, charactersIds, 'characterId');

    return this.assignedList(worldId);
  }

  getModelDTO(parentID: string): CrossWorldCharacterDTO {
    return {
      worldId: parentID,
      characterId: '',
      id: '',
      isAlive: false,
    };
  }
}
