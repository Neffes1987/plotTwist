import { WorldEnum } from '../../constants/world.enum';
import { ILawConstructor } from '../../types/constructors/law.constructor';
import { IPlotConstructor } from '../../types/constructors/plot.constructor';
import { IWorldConstructor } from '../../types/constructors/world.constructor';
import { ICommonController } from '../../types/controllers/controller';
import { PlotDTO } from '../../types/entities/plot';
import { WorldDTO } from '../../types/entities/world';

export class Controller implements ICommonController {
  protected readonly plotConstructor: IPlotConstructor;
  protected readonly worldConstructor: IWorldConstructor;
  protected readonly lawsConstructor: ILawConstructor;

  constructor(plotConstructor: IPlotConstructor, worldConstructor: IWorldConstructor, lawsConstructor: ILawConstructor) {
    this.plotConstructor = plotConstructor;
    this.worldConstructor = worldConstructor;
    this.lawsConstructor = lawsConstructor;
  }

  deletePlot(id: string): Promise<boolean> {
    return this.plotConstructor.delete(id);
  }

  getPlot(plotId: string): Promise<Nullable<PlotDTO>> {
    return this.plotConstructor.get(plotId);
  }

  plotList(params: ListParams<PlotDTO>): Promise<PlotDTO[]> {
    return this.plotConstructor.list(params);
  }

  savePlot(dto: PlotDTO): Promise<string> {
    return this.plotConstructor.save(dto);
  }

  createWorld(plotId: string, dto: WorldDTO): Promise<string> {
    return this.worldConstructor.create(plotId, dto);
  }

  worldList(plotId: string): Promise<WorldDTO[]> {
    return this.worldConstructor.list(plotId);
  }

  saveWorld(dto: WorldDTO): Promise<string> {
    return this.worldConstructor.save(dto);
  }

  getWorld(id: string, type: WorldEnum): Promise<WorldDTO> {
    return this.worldConstructor.get(id, type);
  }

  delete(id: string): Promise<boolean> {
    return this.lawsConstructor.delete(id);
  }

  lawList(params: ListParams<LawDTO>): Promise<LawDTO[]> {
    return this.lawsConstructor.list(params);
  }

  toggleLawInWorld(lawId: string, worldId: string): Promise<boolean> {
    return this.lawsConstructor.toggleWorldLawRelation(lawId, worldId);
  }

  toggleLawStatus(lawId: string, isBroken: boolean): Promise<boolean> {
    return this.lawsConstructor.toggleWorldLawStatus(lawId, isBroken);
  }

  saveLaw(dto: LawDTO): Promise<string> {
    return this.lawsConstructor.save(dto);
  }
}
