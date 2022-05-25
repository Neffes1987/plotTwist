import { IAbstractModel, IListQuery } from '../../../base/interface';

export interface ILawModel extends IAbstractModel {
  worldId: string;
}

export interface ILawListQuery extends IListQuery {
  worldId?: string;
}
