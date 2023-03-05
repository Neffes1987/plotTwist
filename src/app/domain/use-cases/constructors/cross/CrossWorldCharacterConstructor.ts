import { ICharacterConstructor } from '../../../../../types/constructors/character.constructor';
import { IWorldCharacterConstructor } from '../../../../../types/constructors/world.constructor';
import { InWorldCharacterDTO } from '../../../../../types/entities/character';
import { CrossWorldCharacter } from '../../../entities/Cross/CrossWorldCharacter/CrossWorldCharacter';

export class CrossWorldCharacterConstructor implements IWorldCharacterConstructor {
  characterConstructor: ICharacterConstructor;

  constructor(characterConstructor: ICharacterConstructor) {
    this.characterConstructor = characterConstructor;
  }

  async getCharactersInWorld(worldId: string): Promise<InWorldCharacterDTO[]> {
    const worldCharacters = new CrossWorldCharacter();

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

  async toggleCharactersInWorld(charactersIds: string[], worldId: string): Promise<InWorldCharacterDTO[]> {
    const worldCharacters = new CrossWorldCharacter();

    const availableCharacters = await worldCharacters.list({
      query: {
        worldId,
      },
    });

    const existed: string[] = [];

    availableCharacters.forEach(({ characterId, id }) => {
      if (!charactersIds.includes(characterId)) {
        const cross = new CrossWorldCharacter();

        cross.id = id;

        cross.remove();

        return;
      }

      existed.push(characterId);
    });

    charactersIds.forEach(characterId => {
      if (!existed.includes(characterId)) {
        const cross = new CrossWorldCharacter();

        cross.unSerialize({
          isAlive: true,
          worldId,
          characterId,
          id: '',
        });

        cross.save();

        existed.push(characterId);
      }
    });

    return this.getCharactersInWorld(worldId);
  }
}
