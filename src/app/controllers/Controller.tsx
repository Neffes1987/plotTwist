import { WorldEnum } from '../../constants/world.enum';
import { IEdgeConstructor } from '../../types/constructors/edge.constructor';
import { ILawConstructor } from '../../types/constructors/law.constructor';
import { IPlotConstructor } from '../../types/constructors/plot.constructor';
import { IRewardConstructor } from '../../types/constructors/reward.constructor';
import { IWaterholeConstructor } from '../../types/constructors/waterhole.constructor';
import { IWorldConstructor } from '../../types/constructors/world.constructor';
import { ICommonController } from '../../types/controllers/controller';
import { EdgeDTO } from '../../types/entities/edge';
import { PlotDTO } from '../../types/entities/plot';
import { ActivePlotWorld, ActiveWorldEdge, WorldDTO } from '../../types/entities/world';

export class Controller implements ICommonController {
  protected readonly plotConstructor: IPlotConstructor;
  protected readonly worldConstructor: IWorldConstructor;
  protected readonly lawsConstructor: ILawConstructor;
  protected readonly waterholesConstructor: IWaterholeConstructor;
  protected readonly edgeConstructor: IEdgeConstructor;
  protected readonly rewardsConstructor: IRewardConstructor;

  constructor(
    plotConstructor: IPlotConstructor,
    worldConstructor: IWorldConstructor,
    lawsConstructor: ILawConstructor,
    waterholesConstructor: IWaterholeConstructor,
    edgeConstructor: IEdgeConstructor,
    rewardsConstructor: IRewardConstructor,
  ) {
    this.plotConstructor = plotConstructor;
    this.worldConstructor = worldConstructor;
    this.lawsConstructor = lawsConstructor;
    this.waterholesConstructor = waterholesConstructor;
    this.edgeConstructor = edgeConstructor;
    this.rewardsConstructor = rewardsConstructor;
  }

  toggleEdgeStatus(edgeId: string, isSolved: boolean): Promise<boolean> {
    return this.edgeConstructor.toggleEdgeStatus(edgeId, isSolved);
  }

  getEdgeByWorldId(id: string): Promise<Nullable<ActiveWorldEdge>> {
    return this.edgeConstructor.getByWorldId(id);
  }

  saveEdge(data: EdgeDTO): Promise<string> {
    return this.edgeConstructor.save(data);
  }

  createEdge(worldId: string, dto: EdgeDTO): Promise<string> {
    return this.edgeConstructor.create(worldId, dto);
  }

  getWaterhole(id: string): Promise<Nullable<WaterholeDTO>> {
    return this.waterholesConstructor.get(id);
  }

  saveWaterhole(dto: WaterholeDTO): Promise<string> {
    return this.waterholesConstructor.save(dto);
  }

  deleteWaterhole(id: string): Promise<boolean> {
    return this.waterholesConstructor.delete(id);
  }

  waterholeList(params: ListParams<WaterholeDTO>): Promise<WaterholeDTO[]> {
    return this.waterholesConstructor.list(params);
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

  worldList(plotId: string): Promise<ActivePlotWorld[]> {
    return this.worldConstructor.list(plotId);
  }

  saveWorld(dto: WorldDTO): Promise<string> {
    return this.worldConstructor.save(dto);
  }

  getWorld(id: string, type: WorldEnum): Promise<WorldDTO> {
    return this.worldConstructor.get(id, type);
  }

  deleteLaw(id: string): Promise<boolean> {
    return this.lawsConstructor.delete(id);
  }

  lawList(params: ListParams<LawDTO>): Promise<LawDTO[]> {
    return this.lawsConstructor.list(params);
  }

  toggleLawInWorld(lawId: string, worldId: string): Promise<boolean> {
    return this.worldConstructor.toggleWorldLawRelation(lawId, worldId);
  }

  toggleLawStatus(lawId: string, isBroken: boolean): Promise<boolean> {
    return this.worldConstructor.toggleWorldLawStatus(lawId, isBroken);
  }

  saveLaw(dto: LawDTO): Promise<string> {
    return this.lawsConstructor.save(dto);
  }

  getLaw(id: string): Promise<Nullable<LawDTO>> {
    return this.lawsConstructor.get(id);
  }

  toggleWaterholeInWorld(waterholeId: string, worldId: string): Promise<boolean> {
    return this.worldConstructor.toggleWorldWaterholeRelation(waterholeId, worldId);
  }

  toggleRewardInEdge(edgeId: string, rewardId: string): Promise<boolean> {
    return this.edgeConstructor.toggleRewardInEdge(edgeId, rewardId);
  }

  removeReward(id: string): Promise<boolean> {
    return this.rewardsConstructor.delete(id);
  }

  getRewards(params: ListParams<RewardDto>): Promise<RewardDto[]> {
    return this.rewardsConstructor.list(params);
  }

  saveReward(dto: RewardDto): Promise<string> {
    return this.rewardsConstructor.save(dto);
  }

  getRewardsByEdgeId(edgeId: string): Promise<string[]> {
    return this.edgeConstructor.getRewardsByEdgeId(edgeId);
  }
}
