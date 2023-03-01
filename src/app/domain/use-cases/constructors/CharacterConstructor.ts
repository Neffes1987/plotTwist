import { ICharacterConstructor } from '../../../../types/constructors/character.constructor';
import { CharacterDTO } from '../../../../types/entities/character';
import { Character } from '../../entities/Character/Character';

export class CharacterConstructor implements ICharacterConstructor {
  async delete(id: string): Promise<boolean> {
    const character = new Character();

    character.id = id;

    return character.remove();
  }

  async get(id: string): Promise<Nullable<CharacterDTO>> {
    const character = new Character();

    character.id = id;
    await character.load();

    return character;
  }

  async list(params: ListParams<CharacterDTO>): Promise<CharacterDTO[]> {
    const character = new Character();

    return character.list(params);
  }

  async save(dto: CharacterDTO): Promise<string> {
    const character = new Character();

    character.unSerialize(dto);

    return character.save();
  }
}
