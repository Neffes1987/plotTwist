import { IPlotModel } from '@backend/models/plot/plot/plotModel';

export const MOCKED_PLOT: IPlotModel = {
  id: '1',
  name: 'name',
  description: 'description',
  worldsListIds: ['id'],
  status: 'draft',
};

export const ACTIVATED_MOCKED_PLOT: IPlotModel = {
  id: '2',
  name: 'activated',
  description: 'description',
  worldsListIds: ['id'],
  status: 'draft',
};
