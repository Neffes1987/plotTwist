import { MOCKED_PLOT } from '@mocks/mockedPlot';

import { IAbstractModel } from '../../../../base/abstractModel';
import DbClient from '../../../../base/dbClient';
import { PlotModel } from '../plotModel';
import { PlotRepository } from '../plotRepository';

describe('PlotRepository', () => {
  const executeMock = jest.spyOn(DbClient, 'execute');
  const plotRepository = new PlotRepository();
  const plot = new PlotModel(MOCKED_PLOT);

  beforeEach(() => {
    executeMock.mockResolvedValue([
      {
        insertId: 0,
        rows: {
          item: (): IAbstractModel => plot,
          raw: jest.fn(),
          length: 1,
        },
        rowsAffected: 0,
      },
    ]);
  });

  describe('WHEN "list" is called', () => {
    it('MUST send query to db', async () => {
      await plotRepository.list(1, 1);

      expect(executeMock).toHaveBeenCalledWith(plotRepository.generateSelectQuery('', 1, 1));
    });

    it('MUST return array of waterholes', async () => {
      expect(await plotRepository.list(1, 1)).toEqual([plot]);
    });
  });

  it('WHEN "generateModel" is called, MUST return "waterhole" model', () => {
    expect(plotRepository.generateModel(MOCKED_PLOT)).toEqual(plot);
  });

  it('WHEN "getDbTableColumns" is called, MUST return list of columns', () => {
    expect(plotRepository.getDbTableColumns()).toEqual({
      id: 'TEXT',
      name: 'TEXT',
      description: 'TEXT',
      status: 'TEXT',
    });
  });
});
