import { ICharacterConstructor } from '../constructors/character.constructor';
import { IEdgeConstructor } from '../constructors/edge.constructor';
import { ILawConstructor } from '../constructors/law.constructor';
import { IPlotConstructor } from '../constructors/plot.constructor';
import { IRewardConstructor } from '../constructors/reward.constructor';
import { IWaterholeConstructor } from '../constructors/waterhole.constructor';
import { IWorldConstructor } from '../constructors/world.constructor';
import { EdgeDTO } from '../entities/edge';

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

interface IEdgeController {
  getEdgeByWorldId: IEdgeConstructor['get'];
  saveEdge: IEdgeConstructor['save'];
  createEdge: (worldId: string, dto: EdgeDTO) => Promise<string>;
  toggleEdgeStatus: IEdgeConstructor['toggleEdgeStatus'];
  toggleRewardInEdge: IEdgeConstructor['toggleRewardInEdge'];
  getRewardsByEdgeId: IEdgeConstructor['getRewardsByEdgeId'];
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

export type ICommonController = ILawController &
  IWorldController &
  IPlotController &
  IWaterholeController &
  IEdgeController &
  IRewardController &
  ICharacterController;
