import { ICharacterConstructor } from '../../../../../types/constructors/character.constructor';
import { ITaskCharacterConstructor } from '../../../../../types/constructors/world.constructor';
import { InTaskCharacterDTO } from '../../../../../types/entities/character';
import { CrossTaskCharacterDTO } from '../../../../../types/entities/cross';
import { ActiveRecord } from '../../../entities/ActiveRecord/ActiveRecord';
import { CrossTaskCharacter } from '../../../entities/Cross/CrossTaskCharacter/CrossTaskCharacter';

import { CommonCrossConstructor } from './CommonCrossConstructor';

export class CrossTaskCharacterConstructor extends CommonCrossConstructor<CrossTaskCharacterDTO> implements ITaskCharacterConstructor {
  characterConstructor: ICharacterConstructor;

  constructor(characterConstructor: ICharacterConstructor) {
    super();
    this.characterConstructor = characterConstructor;
  }

  getModel(): ActiveRecord<CrossTaskCharacterDTO> {
    return new CrossTaskCharacter();
  }

  async assignedList(taskId: string): Promise<InTaskCharacterDTO[]> {
    const worldCharacters = this.getModel();

    const availableCharacters = await worldCharacters.list({
      query: {
        taskId,
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
    })) as InTaskCharacterDTO[];
  }

  async toggle(charactersIds: string[], taskId: string): Promise<InTaskCharacterDTO[]> {
    const worldCharacters = new CrossTaskCharacter();

    const availableCharacters = await worldCharacters.list({
      query: {
        taskId,
      },
    });

    await this.upsertBunch(taskId, availableCharacters, charactersIds, 'characterId');

    return this.assignedList(taskId);
  }

  getModelDTO(parentID: string): CrossTaskCharacterDTO {
    return {
      taskId: parentID,
      characterId: '',
      id: '',
      isAlive: false,
    };
  }
}
