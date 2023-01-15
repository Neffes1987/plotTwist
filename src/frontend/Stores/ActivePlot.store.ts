import { makeAutoObservable, runInAction } from 'mobx';

import { WorldEnum } from '../../constants/world.enum';
import { ActivePlotDTO, PlotDTO } from '../../types/entities/plot';
import { ActivePlotWorld, WorldDTO } from '../../types/entities/world';

import { plotsStore } from './Plots.store';
import { worldsStore } from './Worlds.store';

export class ActivePlotStore {
  isPlotLoaded: Nullable<boolean> = null;
  selectedPlotId?: string;
  error: Nullable<Error> = null;
  nextStep: Nullable<WorldDTO['type']> = WorldEnum.PlainWorld;
  private _plot: Nullable<PlotDTO> = null;
  private _worlds: ActivePlotWorld[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get plot(): Nullable<ActivePlotDTO> {
    if (!this._plot) {
      return null;
    }

    return {
      plotData: this._plot,
      worlds: this._worlds,
    };
  }

  get plotName(): string {
    return this._plot?.name ?? '';
  }

  getWorld(worldType: WorldDTO['type']): Nullable<ActivePlotWorld> {
    return this._worlds?.find(({ worldData }) => worldData.type === worldType) ?? null;
  }

  async loadPlot(): Promise<void> {
    this.resetPlot();

    if (!this.selectedPlotId) {
      runInAction(() => {
        this.isPlotLoaded = false;
      });

      return;
    }

    try {
      const plotInfo = await plotsStore.getPlot(this.selectedPlotId);

      if (!plotInfo) {
        runInAction(() => {
          this.isPlotLoaded = false;
        });

        return;
      }

      await worldsStore.list(plotInfo.id);

      runInAction(() => {
        this._plot = plotInfo;
        this._worlds = worldsStore.worlds;
        this.getNextStep();
        this.isPlotLoaded = true;
      });

      return;
    } catch (e) {
      console.log(e);
      runInAction(() => {
        this.isPlotLoaded = false;
      });
    }
  }

  getNextStep(): void {
    const allWorlds = [WorldEnum.PlainWorld, WorldEnum.PrivateWorld, WorldEnum.HiddenCaveWorld, WorldEnum.HolidayWorld, WorldEnum.ReturnWithPotionWorld];

    const currentActiveWorld = this._worlds[this._worlds.length - 1]?.worldData?.type;

    for (let i = 0; i < allWorlds.length; i++) {
      if (allWorlds[i] === currentActiveWorld) {
        this.nextStep = allWorlds[i + 1];

        break;
      }
    }
  }

  resetPlot(): void {
    this._plot = null;
    this._worlds = [];
    this.error = null;
    this.isPlotLoaded = null;
  }
}

const activePlotStore = new ActivePlotStore();

export default activePlotStore;
