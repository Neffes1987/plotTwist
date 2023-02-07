import { ICharacterConstructor } from '../../../../types/constructors/character.constructor';
import { CharacterDTO } from '../../../../types/entities/character';
import { characterFactory } from '../../entities/Character/CharacterFactory/CharacterFactory';

export class CharacterConstructor implements ICharacterConstructor {
  async delete(id: string): Promise<boolean> {
    const character = characterFactory();

    character.id = id;

    return character.remove();
  }

  async get(id: string): Promise<Nullable<CharacterDTO>> {
    const emptyCharacter = characterFactory();

    const [characterDto] = await emptyCharacter.list({ query: { id } });

    if (!characterDto) {
      return null;
    }

    const character = characterFactory(characterDto.type);

    character.unSerialize(characterDto);
    await character.load();

    return character;
  }

  async list(params: ListParams<CharacterDTO>): Promise<CharacterDTO[]> {
    const character = characterFactory();

    await character.list(params);

    return Promise.resolve([]);
  }

  async save(dto: CharacterDTO): Promise<string> {
    const character = characterFactory(dto.type);

    character.unSerialize(dto);

    return character.save();
  }
}
