import { MOCKED_WATERHOLE } from '@mocks/mockedWaterhole';

import { IAbstractModel } from '../../../../base/abstractModel';
import DbClient from '../../../../base/dbClient';
import { WaterholeModel } from '../waterholeModel';
import { WaterholeRepository } from '../waterholeRepository';

describe('WaterholeRepository', () => {
  const executeMock = jest.spyOn(DbClient, 'execute');
  const waterholeRepository = new WaterholeRepository();
  const waterhole = new WaterholeModel(MOCKED_WATERHOLE);

  beforeEach(() => {
    executeMock.mockResolvedValue([
      {
        insertId: 0,
        rows: {
          item: (): IAbstractModel => waterhole,
          raw: jest.fn(),
          length: 1,
        },
        rowsAffected: 0,
      },
    ]);
  });

  describe('WHEN "list" is called', () => {
    it('MUST send query to db', async () => {
      await waterholeRepository.list(waterhole.worldId);

      expect(executeMock).toHaveBeenCalledWith(waterholeRepository.generateSelectQuery(`worldId='${waterhole.worldId}'`));
    });

    it('MUST return array of waterholes', async () => {
      expect(await waterholeRepository.list(waterhole.worldId)).toEqual([waterhole]);
    });
  });

  it('WHEN "generateModel" is called, MUST return "waterhole" model', () => {
    expect(waterholeRepository.generateModel(MOCKED_WATERHOLE)).toEqual(waterhole);
  });

  it('WHEN "getDbTableColumns" is called, MUST return list of columns', () => {
    expect(waterholeRepository.getDbTableColumns()).toEqual({
      id: 'TEXT',
      name: 'TEXT',
      description: 'TEXT',
      worldId: 'TEXT',
    });
  });
});
