import { ICallModel, IChallengeModel, ICharacterModel, ICommonWorld, IEdgeModel, ILawModel, IPlotModel, IRewardModel, IWaterholeModel } from '@backend';

export interface EdgeInfo {
  calls: ICallModel[];
  info: Nullable<IEdgeModel>;
  rewards: IRewardModel[];
  challenges: IChallengeModel[];
}

export interface WorldInfo {
  world: ICommonWorld;
  laws: ILawModel[];
  waterholes: IWaterholeModel[];
  edge: EdgeInfo;
}

export interface PlotInfoResponse {
  plot: Nullable<IPlotModel>;
  worlds: WorldInfo[];
  characters: ICharacterModel[];
}
