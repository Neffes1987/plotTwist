import { IAbstractModel, IListQuery } from '../../../base/interface';

export interface IWaterholeModel extends IAbstractModel {
  worldId: string;
}

export interface IWaterholeListQuery extends IListQuery {
  worldId?: string;
}
