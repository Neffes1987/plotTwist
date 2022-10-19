import { ILawConstructor } from '../constructors/law.constructor';
import { IPlotConstructor } from '../constructors/plot.constructor';
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
}

interface ILawController {
  saveLaw: ILawConstructor['save'];
  lawList: ILawConstructor['list'];
  delete: ILawConstructor['delete'];
  toggleLawInWorld: ILawConstructor['toggleWorldLawRelation'];
  toggleLawStatus: ILawConstructor['toggleWorldLawStatus'];
}

export type ICommonController = ILawController & IWorldController & IPlotController;
