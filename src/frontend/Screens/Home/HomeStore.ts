import { IPlotController, plotController, PlotDTO, WorldDTO } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import asyncLocalStorage, { Store } from '../../store/Store';

export class HomeStore {
  isPlotLoaded: Nullable<boolean> = null;
  error: Nullable<Error> = null;
  nextStep: Nullable<WorldDTO['type']> = 'plainWorld';
  private plot: Partial<Nullable<PlotDTO>> = null;
  private readonly controller: IPlotController;
  private readonly storage: Store;

  constructor(storage: Store) {
    makeAutoObservable(this);
    this.controller = plotController;
    this.storage = storage;
  }

  get plotId(): string {
    return this.plot?.id ?? '';
  }

  get selectedPlot() {
    return this.storage.settings.currentPlotId;
  }

  get plotName(): string {
    return this.plot?.name ?? '';
  }

  get worlds(): WorldDTO[] {
    return this.plot?.worlds ?? [];
  }

  getWorld(worldType: WorldDTO['type']): Nullable<WorldDTO> {
    return this.plot?.worlds?.find(({ type }) => type === worldType) ?? null;
  }

  async getPlot(): Promise<void> {
    const selectedPlot = this.storage.settings.currentPlotId;

    this.resetPlot();

    if (!selectedPlot) {
      runInAction(() => {
        this.isPlotLoaded = false;
      });

      return;
    }

    try {
      const plotInfo = await this.controller.get(selectedPlot);

      if (!plotInfo) {
        runInAction(() => {
          this.isPlotLoaded = false;
        });

        return;
      }

      runInAction(() => {
        this.plot = plotInfo;
        this.getNextStep();
        this.isPlotLoaded = true;
      });

      return;
    } catch (e) {
      runInAction(() => {
        this.isPlotLoaded = false;
      });
    }
  }

  getNextStep(): void {
    const existedWorlds = this.plot?.worlds?.map(({ type }) => type) ?? [];

    if (!existedWorlds.includes('plainWorld')) {
      this.nextStep = 'plainWorld';

      return;
    }

    if (!existedWorlds.includes('privateWorld')) {
      this.nextStep = 'privateWorld';

      return;
    }

    if (!existedWorlds.includes('hiddenCave')) {
      this.nextStep = 'hiddenCave';

      return;
    }

    if (!existedWorlds.includes('holiday')) {
      this.nextStep = 'holiday';

      return;
    }

    if (!existedWorlds.includes('returnWithPotion')) {
      this.nextStep = 'returnWithPotion';

      return;
    }

    this.nextStep = null;
  }

  resetPlot(): void {
    this.plot = {
      status: 'draft',
      name: '',
      description: '',
      id: '',
      worlds: [],
    };
    this.error = null;
    this.isPlotLoaded = null;
  }
}

const homeStore = new HomeStore(asyncLocalStorage);

export default homeStore;
