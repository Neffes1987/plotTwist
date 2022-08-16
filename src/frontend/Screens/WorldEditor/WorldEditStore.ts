import { IWorldController, worldController, WorldDTO } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { WORLDS_ADDITIONAL_FIELDS } from '../../../constants';
import asyncLocalStorage, { Store } from '../../store/Store';

import { StepperFieldField } from './interface';

export class WorldEditStore {
  error: Nullable<Error> = null;
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

  setError(error: Nullable<Error>): void {
    this.error = error;
  }

  async loadWorld(): Promise<boolean> {
    try {
      if (!this._world?.id) {
        return false;
      }

      const world = await this._worldController.get(this._world.id);

      runInAction(() => {
        this._world = world;
      });

      return true;
    } catch (e) {
      runInAction(() => {
        this.setError(e);
      });

      return false;
    }
  }

  async saveWorld(): Promise<boolean> {
    try {
      if (!this.world) {
        return false;
      }

      if (!this.world?.id) {
        const plotId = this._asyncLocalStorage.settings.currentPlotId;
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

      await this._worldController.update(this.world);

      return true;
    } catch (e) {
      runInAction(() => {
        this.setError(e);
      });

      return false;
    }
  }

  async deleteWorld(): Promise<boolean> {
    try {
      if (!this._world) {
        return false;
      }

      await this._worldController.delete(this._world.id);
      runInAction(() => {
        this._world = null;
      });

      return true;
    } catch (e) {
      runInAction(() => {
        this.setError(e);
      });

      return false;
    }
  }

  getStepperConfig(): StepperFieldField[] {
    const config: StepperFieldField[] = [];

    if (this._world?.type && WORLDS_ADDITIONAL_FIELDS[this._world.type]) {
      config.push(...WORLDS_ADDITIONAL_FIELDS[this._world.type]);
    }

    return config;
  }
}

const worldEditStore = new WorldEditStore(asyncLocalStorage);

export default worldEditStore;
