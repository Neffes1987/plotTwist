import { ICallConstructor } from '../constructors/call.constructor';
import { ICharacterConstructor } from '../constructors/character.constructor';
import { ILawConstructor } from '../constructors/law.constructor';
import { IPlotConstructor } from '../constructors/plot.constructor';
import { IRewardConstructor } from '../constructors/reward.constructor';
import { ITaskConstructor } from '../constructors/task.constructor';
import { IWaterholeConstructor } from '../constructors/waterhole.constructor';
import {
  IEdgeRewardConstructor,
  IEdgeTaskConstructor,
  IWorldCharacterConstructor,
  IWorldConstructor,
  IWorldLawConstructor,
  IWorldTaskConstructor,
  IWorldWaterholeConstructor,
} from '../constructors/world.constructor';

interface IPlotController {
  savePlot: IPlotConstructor['save'];
  deletePlot: IPlotConstructor['delete'];
  getPlot: IPlotConstructor['get'];
  plotList: IPlotConstructor['list'];
}

interface IWorldController {
  createWorld: IWorldConstructor['create'];
  getWorld: IWorldConstructor['get'];
  saveWorld: IWorldConstructor['save'];
  worldList: IWorldConstructor['list'];
}

interface ILawController {
  getLaw: ILawConstructor['get'];
  saveLaw: ILawConstructor['save'];
  lawList: ILawConstructor['list'];
  deleteLaw: ILawConstructor['delete'];
}

interface IWaterholeController {
  getWaterhole: IWaterholeConstructor['get'];
  saveWaterhole: IWaterholeConstructor['save'];
  waterholeList: IWaterholeConstructor['list'];
  deleteWaterhole: IWaterholeConstructor['delete'];
}

interface ITaskController {
  saveTask: ITaskConstructor['save'];
  getTasks: ITaskConstructor['list'];
  getTask: ITaskConstructor['get'];
  removeTask: ITaskConstructor['delete'];
}

interface IRewardController {
  getRewards: IRewardConstructor['list'];
  saveReward: IRewardConstructor['save'];
  removeReward: IRewardConstructor['delete'];
}

interface ICharacterController {
  getCharacters: ICharacterConstructor['list'];
  saveCharacter: ICharacterConstructor['save'];
  removeCharacter: ICharacterConstructor['delete'];
}

interface ICallController {
  getCalls: ICallConstructor['list'];
  saveCall: ICallConstructor['save'];
  removeCall: ICallConstructor['delete'];
  getCall: ICallConstructor['get'];
}

interface IWorldCharacterController {
  getWorldCharacters: IWorldCharacterConstructor['assignedList'];
  toggleWorldCharacters: IWorldCharacterConstructor['toggle'];
}

interface IWorldLawsController {
  getLawsInWorld: IWorldLawConstructor['assignedList'];
  toggleWorldLawsStatus: IWorldLawConstructor['toggleWorldLawsStatus'];
  toggleWorldLaws: IWorldLawConstructor['toggle'];
}

interface IWorldWaterholesController {
  getWaterholesInWorld: IWorldWaterholeConstructor['assignedList'];
  toggleWorldWaterholes: IWorldWaterholeConstructor['toggle'];
}

interface IWorldEdgeController {
  getEdgesInWorld: IWorldTaskConstructor['assignedList'];
  toggleWorldEdges: IWorldTaskConstructor['toggle'];
}

interface IEdgeRewardController {
  getRewardsInEdge: IEdgeRewardConstructor['assignedList'];
  toggleEdgeRewards: IEdgeRewardConstructor['toggle'];
}

interface IEdgeTaskController {
  getTasksInEdge: IEdgeTaskConstructor['assignedList'];
  toggleEdgeTasks: IEdgeTaskConstructor['toggle'];
  toggleRewardInTask: IEdgeTaskConstructor['toggleRewardInTask'];
}

export type ICommonController = ILawController &
  IWorldController &
  IPlotController &
  IWaterholeController &
  ITaskController &
  IRewardController &
  ICharacterController &
  ICallController &
  IWorldCharacterController &
  IWorldLawsController &
  IWorldWaterholesController &
  IWorldEdgeController &
  IEdgeRewardController &
  IEdgeTaskController;
