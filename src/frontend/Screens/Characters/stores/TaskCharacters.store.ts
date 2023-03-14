import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { ITaskCharacterController } from '../../../../types/controllers/controller';
import { InTaskCharacterDTO } from '../../../../types/entities/character';

export class TaskCharactersStore {
  characters: InTaskCharacterDTO[] = [];
  private readonly crud: ITaskCharacterController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async list(taskId: string): Promise<void> {
    const data = await this.crud.getCharactersInTask(taskId);

    runInAction(() => {
      this.characters = data;
    });
  }

  async toggleTaskCharacters(characterIds: string[], taskId?: string): Promise<void> {
    if (!taskId) {
      return;
    }

    const data = await this.crud.toggleTaskCharacters(characterIds, taskId);

    runInAction(() => {
      this.characters = data;
    });
  }
}

export const taskCharactersStore = new TaskCharactersStore();
