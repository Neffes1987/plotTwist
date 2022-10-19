import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { IWorldController } from '../../types/controllers/controller';
import { WorldDTO } from '../../types/entities/world';
import { StepperFieldField } from '../Screens/WorldEditor/interface';
import { WORLDS_ADDITIONAL_FIELDS } from '../Screens/WorldEditor/worldTranslations';

export class ActiveWorldStore {
  firstErrorStep = 0;
  plotId = '';
  private _world: Nullable<WorldDTO> = null;
  private readonly _worldController: IWorldController;

  constructor() {
    makeAutoObservable(this);
    this._worldController = appController;
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

    const world = await this._worldController.getWorld(this._world.id, this._world.type);

    runInAction(() => {
      this._world = world;
    });

    return true;
  }

  async saveWorld(): Promise<boolean> {
    if (!this.world) {
      return false;
    }

    const plotId = this.plotId;

    if (!this.world?.id) {
      const id = await this._worldController.createWorld(plotId, this.world);

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

    await this._worldController.saveWorld(this.world);

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

const activeWorldStore = new ActiveWorldStore();

export default activeWorldStore;
