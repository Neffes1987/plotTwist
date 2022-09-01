import { IWorldController, worldController, WorldDTO } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import asyncLocalStorage, { Store } from '../../store/Store';

import { StepperFieldField } from './interface';
import { WORLDS_ADDITIONAL_FIELDS } from './worldTranslations';

export class WorldEditStore {
  firstErrorStep = 0;
  private _world: Nullable<WorldDTO> = null;
  private readonly _asyncLocalStorage: Store;
  private readonly _worldController: IWorldController;

  constructor(asyncLocalStorage: Store) {
    makeAutoObservable(this);
    this._asyncLocalStorage = asyncLocalStorage;
    this._worldController = worldController;
  }

  get world(): Nullable<WorldDTO> {
    return this._world;
  }

  setWorld(value: WorldDTO): void {
    this._world = value;
  }

  async loadWorld(): Promise<boolean> {
    if (!this._world?.id) {
      return false;
    }

    const world = await this._worldController.get(this._world.id);

    runInAction(() => {
      this._world = world;
    });

    return true;
  }

  async saveWorld(): Promise<boolean> {
    if (!this.world) {
      return false;
    }

    const plotId = this._asyncLocalStorage.settings.currentPlotId;

    if (!this.world?.id) {
      const id = await this._worldController.create({ ...this.world, plotId });

      runInAction(() => {
        if (!this._world) {
          return;
        }

        this._world = {
          ...this._world,
          id,
        };
      });

      return true;
    }

    await this._worldController.update({ ...this.world, plotId });

    return true;
  }

  async deleteWorld(): Promise<boolean> {
    if (!this._world) {
      return false;
    }

    await this._worldController.delete(this._world.id);
    runInAction(() => {
      this._world = null;
    });

    return true;
  }

  getStepperConfig(): StepperFieldField<Record<string, string>>[] {
    const config: StepperFieldField<Record<string, string>>[] = [];

    if (this._world?.type && WORLDS_ADDITIONAL_FIELDS[this._world.type]) {
      config.push(...WORLDS_ADDITIONAL_FIELDS[this._world.type]);
    }

    return config;
  }
}

const worldEditStore = new WorldEditStore(asyncLocalStorage);

export default worldEditStore;
