import { ICallConstructor } from '../../types/constructors/call.constructor';
import { ICharacterConstructor } from '../../types/constructors/character.constructor';
import { ILawConstructor } from '../../types/constructors/law.constructor';
import { IPlotConstructor } from '../../types/constructors/plot.constructor';
import { IRewardConstructor } from '../../types/constructors/reward.constructor';
import { ITaskConstructor } from '../../types/constructors/task.constructor';
import { IWaterholeConstructor } from '../../types/constructors/waterhole.constructor';
import {
  IEdgeRewardConstructor,
  IEdgeTaskConstructor,
  IWorldCharacterConstructor,
  IWorldConstructor,
  IWorldLawConstructor,
  IWorldTaskConstructor,
  IWorldWaterholeConstructor,
} from '../../types/constructors/world.constructor';
import { ICommonController } from '../../types/controllers/controller';
import { CallDTO } from '../../types/entities/call';
import { CharacterDTO, InWorldCharacterDTO } from '../../types/entities/character';
import { PlotDTO } from '../../types/entities/plot';
import { TaskDTO, TaskInWorldDTO } from '../../types/entities/task';
import { ActivePlotWorld, WorldDTO } from '../../types/entities/world';

export class Controller implements ICommonController {
  protected readonly plotConstructor: IPlotConstructor;
  protected readonly worldConstructor: IWorldConstructor;
  protected readonly lawsConstructor: ILawConstructor;
  protected readonly waterholesConstructor: IWaterholeConstructor;
  protected readonly taskConstructor: ITaskConstructor;
  protected readonly rewardsConstructor: IRewardConstructor;
  protected readonly characterConstructor: ICharacterConstructor;
  protected readonly callsConstructor: ICallConstructor;
  protected readonly crossWorldCharacterConstructor: IWorldCharacterConstructor;
  protected readonly crossWorldLawsConstructor: IWorldLawConstructor;
  protected readonly crossWorldWaterholeConstructor: IWorldWaterholeConstructor;
  protected readonly crossWorldEdgeConstructor: IWorldTaskConstructor;
  protected readonly crossEdgeRewardConstructor: IEdgeRewardConstructor;
  protected readonly crossEdgeTaskConstructor: IEdgeTaskConstructor;

  constructor(
    plotConstructor: IPlotConstructor,
    worldConstructor: IWorldConstructor,
    lawsConstructor: ILawConstructor,
    waterholesConstructor: IWaterholeConstructor,
    edgeConstructor: ITaskConstructor,
    rewardsConstructor: IRewardConstructor,
    characterConstructor: ICharacterConstructor,
    callsConstructor: ICallConstructor,
    crossWorldCharacterConstructor: IWorldCharacterConstructor,
    crossWorldLawsConstructor: IWorldLawConstructor,
    crossWorldWaterholeConstructor: IWorldWaterholeConstructor,
    crossWorldEdgeConstructor: IWorldTaskConstructor,
    crossEdgeRewardConstructor: IEdgeRewardConstructor,
    crossEdgeTaskConstructor: IEdgeTaskConstructor,
  ) {
    this.plotConstructor = plotConstructor;
    this.worldConstructor = worldConstructor;
    this.lawsConstructor = lawsConstructor;
    this.waterholesConstructor = waterholesConstructor;
    this.taskConstructor = edgeConstructor;
    this.rewardsConstructor = rewardsConstructor;
    this.characterConstructor = characterConstructor;
    this.callsConstructor = callsConstructor;
    this.crossWorldCharacterConstructor = crossWorldCharacterConstructor;
    this.crossWorldLawsConstructor = crossWorldLawsConstructor;
    this.crossWorldWaterholeConstructor = crossWorldWaterholeConstructor;
    this.crossWorldEdgeConstructor = crossWorldEdgeConstructor;
    this.crossEdgeRewardConstructor = crossEdgeRewardConstructor;
    this.crossEdgeTaskConstructor = crossEdgeTaskConstructor;
  }

  getTasksInEdge(parentId: string): Promise<TaskInWorldDTO[]> {
    return this.crossEdgeTaskConstructor.assignedList(parentId);
  }

  toggleEdgeTasks(addedIds: string[], parentId: string): Promise<TaskInWorldDTO[]> {
    return this.crossEdgeTaskConstructor.toggle(addedIds, parentId);
  }

  toggleRewardInTask(rewardId: string, taskId: string): Promise<boolean> {
    return this.crossEdgeTaskConstructor.toggleRewardInTask(rewardId, taskId);
  }

  getRewardsInEdge(parentId: string): Promise<RewardInEdgeDTO[]> {
    return this.crossEdgeRewardConstructor.assignedList(parentId);
  }

  toggleEdgeRewards(addedIds: string[], parentId: string): Promise<RewardInEdgeDTO[]> {
    return this.crossEdgeRewardConstructor.toggle(addedIds, parentId);
  }

  getEdgesInWorld(parentId: string): Promise<TaskInWorldDTO[]> {
    return this.crossWorldEdgeConstructor.assignedList(parentId);
  }

  toggleWorldEdges(addedIds: string[], parentId: string): Promise<TaskInWorldDTO[]> {
    return this.crossWorldEdgeConstructor.toggle(addedIds, parentId);
  }

  getWaterholesInWorld(parentId: string): Promise<WaterholeDTO[]> {
    return this.crossWorldWaterholeConstructor.assignedList(parentId);
  }

  toggleWorldWaterholes(addedIds: string[], parentId: string): Promise<WaterholeDTO[]> {
    return this.crossWorldWaterholeConstructor.toggle(addedIds, parentId);
  }

  getLawsInWorld(worldId: string): Promise<LawInWorldDTO[]> {
    return this.crossWorldLawsConstructor.assignedList(worldId);
  }

  toggleWorldLawsStatus(lawId: string, isBroken: boolean): Promise<boolean> {
    return this.crossWorldLawsConstructor.toggleWorldLawsStatus(lawId, isBroken);
  }

  toggleWorldLaws(lawIds: string[], worldId: string): Promise<LawInWorldDTO[]> {
    return this.crossWorldLawsConstructor.toggle(lawIds, worldId);
  }

  getTasks(params: ListParams<TaskDTO>): Promise<TaskDTO[]> {
    return this.taskConstructor.list(params);
  }

  getTask(id: string): Promise<Nullable<TaskDTO>> {
    return this.taskConstructor.get(id);
  }

  removeTask(id: string): Promise<boolean> {
    return this.taskConstructor.delete(id);
  }

  saveTask(data: TaskDTO): Promise<string> {
    return this.taskConstructor.save(data);
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

  getWorld(id: string): Promise<Nullable<WorldDTO>> {
    return this.worldConstructor.get(id);
  }

  deleteLaw(id: string): Promise<boolean> {
    return this.lawsConstructor.delete(id);
  }

  lawList(params: ListParams<LawDTO>): Promise<LawDTO[]> {
    return this.lawsConstructor.list(params);
  }

  saveLaw(dto: LawDTO): Promise<string> {
    return this.lawsConstructor.save(dto);
  }

  getLaw(id: string): Promise<Nullable<LawDTO>> {
    return this.lawsConstructor.get(id);
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

  getCharacters(params: ListParams<CharacterDTO>): Promise<CharacterDTO[]> {
    return this.characterConstructor.list(params);
  }

  removeCharacter(id: string): Promise<boolean> {
    return this.characterConstructor.delete(id);
  }

  saveCharacter(dto: CharacterDTO): Promise<string> {
    return this.characterConstructor.save(dto);
  }

  getCalls(params: ListParams<CallDTO>): Promise<CallDTO[]> {
    return this.callsConstructor.list(params);
  }

  removeCall(id: string): Promise<boolean> {
    return this.callsConstructor.delete(id);
  }

  saveCall(dto: CallDTO): Promise<string> {
    return this.callsConstructor.save(dto);
  }

  getCall(id: string): Promise<Nullable<CallDTO>> {
    return this.callsConstructor.get(id);
  }

  getWorldCharacters(worldId: string): Promise<InWorldCharacterDTO[]> {
    return this.crossWorldCharacterConstructor.assignedList(worldId);
  }

  toggleWorldCharacters(characters: string[], worldId: string): Promise<InWorldCharacterDTO[]> {
    return this.crossWorldCharacterConstructor.toggle(characters, worldId);
  }
}
