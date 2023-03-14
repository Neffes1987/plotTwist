import { InTaskCharacterDTO, InWorldCharacterDTO } from '../entities/character';
import { TaskInWorldDTO } from '../entities/task';
import { ActivePlotWorld, WorldDTO } from '../entities/world';

export interface IWorldConstructor extends Omit<ICommonConstructor<WorldDTO>, 'list' | 'delete' | 'create'> {
  list: (plotId: string) => Promise<ActivePlotWorld[]>;
  create: (plotId: string, dto: WorldDTO) => Promise<string>;
}

export type IWorldCharacterConstructor = ICommonCrossConstructor<InWorldCharacterDTO>;

export interface IWorldLawConstructor extends ICommonCrossConstructor<LawInWorldDTO> {
  toggleWorldLawsStatus: (lawId: string, isBroken: boolean) => Promise<boolean>;
}

export type IWorldWaterholeConstructor = ICommonCrossConstructor<WaterholeInWorldDTO>;
export type IWorldTaskConstructor = ICommonCrossConstructor<TaskInWorldDTO>;
export type IEdgeRewardConstructor = ICommonCrossConstructor<RewardInEdgeDTO>;
export type IEdgeTaskConstructor = ICommonCrossConstructor<TaskInWorldDTO> & {
  toggleRewardInTask: (rewardId: string, taskId: string) => Promise<boolean>;
};

export type ITaskCharacterConstructor = ICommonCrossConstructor<InTaskCharacterDTO>;
