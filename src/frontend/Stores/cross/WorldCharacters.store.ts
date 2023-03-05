import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { IWorldCharacterController } from '../../../types/controllers/controller';
import { InWorldCharacterDTO } from '../../../types/entities/character';

export class WorldCharactersStore {
  characters: InWorldCharacterDTO[] = [];
  private readonly crud: IWorldCharacterController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async list(worldId: string): Promise<void> {
    const data = await this.crud.getWorldCharacters(worldId);

    runInAction(() => {
      this.characters = data;
    });
  }

  async toggleWorldCharacters(characterIds: string[], worldId: string): Promise<void> {
    const data = await this.crud.toggleWorldCharacters(characterIds, worldId);

    runInAction(() => {
      this.characters = data;
    });
  }
}

export const worldsCharactersStore = new WorldCharactersStore();
