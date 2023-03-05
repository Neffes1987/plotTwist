import { ICallConstructor } from '../constructors/call.constructor';
import { ICharacterConstructor } from '../constructors/character.constructor';
import { ILawConstructor } from '../constructors/law.constructor';
import { IPlotConstructor } from '../constructors/plot.constructor';
import { IRewardConstructor } from '../constructors/reward.constructor';
import { ITaskConstructor } from '../constructors/task.constructor';
import { IWaterholeConstructor } from '../constructors/waterhole.constructor';
import { IWorldCharacterConstructor, IWorldConstructor } from '../constructors/world.constructor';

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
  toggleLawInWorld: IWorldConstructor['toggleWorldLawRelation'];
  toggleWaterholeInWorld: IWorldConstructor['toggleWorldWaterholeRelation'];
  toggleLawStatus: IWorldConstructor['toggleWorldLawStatus'];
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
  getWorldCharacters: IWorldCharacterConstructor['getCharactersInWorld'];
  toggleWorldCharacters: IWorldCharacterConstructor['toggleCharactersInWorld'];
}

export type ICommonController = ILawController &
  IWorldController &
  IPlotController &
  IWaterholeController &
  ITaskController &
  IRewardController &
  ICharacterController &
  ICallController &
  IWorldCharacterController;
