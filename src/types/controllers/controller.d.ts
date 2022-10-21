import { ILawConstructor } from '../constructors/law.constructor';
import { IPlotConstructor } from '../constructors/plot.constructor';
import { IWaterholeConstructor } from '../constructors/waterhole.constructor';
import { IWorldConstructor } from '../constructors/world.constructor';

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

export type ICommonController = ILawController & IWorldController & IPlotController & IWaterholeController;
