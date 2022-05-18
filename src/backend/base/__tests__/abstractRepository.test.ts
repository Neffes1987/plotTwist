import * as uuid from 'uuid';

import { AbstractModel, IAbstractModel, IValidatorConfiguration } from '../abstractModel';
import { AbstractRepository, ColumnsConfigType, IListQuery } from '../abstractRepository';
import DbClient from '../dbClient';
import { ErrorLog } from '../errors/errorLog';
import { UxException } from '../errors/uxException';

interface ITestModelListQuery extends IListQuery {
  testId: string;
}

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

const MOCKED_TEST_MODEL = {
  id: '1',
  name: 'name',
  description: 'description',
};

const NEW_MOCKED_TEST_MODEL = {
  id: '',
  name: 'name',
  description: 'description',
};

class TestModel extends AbstractModel {
  constructor(data: IAbstractModel) {
    super(data);
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [{ name: 'id' }];
  }
}

class TestRepository extends AbstractRepository<TestModel> {
  constructor() {
    super('test');
  }

  generateModel(data: IAbstractModel): TestModel {
    return new TestModel(data);
  }

  getDbTableColumns(): Record<string, ColumnsConfigType> {
    return {
      id: 'TEXT',
      name: 'TEXT',
      description: 'TEXT',
    };
  }
}

describe('AbstractRepository', () => {
  const uuidV4Mock = jest.spyOn(uuid, 'v4');
  const executeMock = jest.fn();
  const errorLogMock = new ErrorLog();
  const testRepository = new TestRepository();
  const addErrorMock = jest.spyOn(errorLogMock, 'add');
  const testModel = new TestModel(MOCKED_TEST_MODEL);

  Object.defineProperty(DbClient, 'execute', {
    writable: true,
    value: executeMock,
  });

  Object.defineProperty(testRepository, '_errorLog', {
    writable: true,
    value: errorLogMock,
  });

  beforeEach(() => {
    executeMock.mockResolvedValue([
      {
        insertId: 0,
        rows: {
          item: (): IAbstractModel => testModel,
          raw: jest.fn(),
          length: 1,
        },
        rowsAffected: 0,
      },
    ]);
    addErrorMock.mockReturnValue();
    uuidV4Mock.mockReturnValue('test-id');
  });

  describe('WHEN "dbFind" is called', () => {
    it('MUST send query to db with "id"', async () => {
      await testRepository.dbFind(testModel.id);

      expect(executeMock).toHaveBeenCalledWith(testRepository.generateSelectQuery(`id='${testModel.id}'`, 0, 1));
    });

    it('MUST return model', async () => {
      expect(await testRepository.dbFind(testModel.id)).toEqual(testModel);
    });

    describe('AND db returns error', () => {
      beforeEach(() => {
        executeMock.mockRejectedValue(new Error('db_error'));
      });

      it('MUST throw ui error', async () => {
        let error;

        try {
          await testRepository.dbFind(`id='${testModel.id}'`);
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(new UxException('can_not_find_item_by_id'));
      });

      it('MUST log internal error', async () => {
        try {
          await testRepository.dbFind(`id='${testModel.id}'`);
        } catch (e) {
          // no need for test
        }

        expect(addErrorMock).toHaveBeenCalledWith(new Error('db_error'));
      });
    });
  });

  describe('WHEN "dbDelete" is called', () => {
    it('MUST send query to db', async () => {
      await testRepository.dbDelete('id');

      expect(executeMock).toHaveBeenCalledWith(testRepository.generateDeleteQuery("id='id'"));
    });

    describe('AND db returns error', () => {
      beforeEach(() => {
        executeMock.mockRejectedValue(new Error('db_error'));
      });

      it('MUST throw ui error', async () => {
        let error;

        try {
          await testRepository.dbDelete('id');
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(new UxException('can_not_delete_item_by_id'));
      });

      it('MUST log internal error', async () => {
        try {
          await testRepository.dbDelete('id');
        } catch (e) {
          // no need for test
        }

        expect(addErrorMock).toHaveBeenCalledWith(new Error('db_error'));
      });
    });

    it('MUST returns true', async () => {
      expect(await testRepository.dbDelete('id')).toBeTruthy();
    });
  });

  describe('WHEN "dbUpdate" is called', () => {
    it('MUST send query to db', async () => {
      await testRepository.dbUpdate(testModel);

      expect(executeMock).toHaveBeenCalledWith(testRepository.generateUpdateQuery(testRepository.generateRecordByColumns(testModel), `id=${testModel.id}`));
    });

    describe('AND db returns error', () => {
      beforeEach(() => {
        executeMock.mockRejectedValue(new Error('db_error'));
      });

      it('MUST throw ui error', async () => {
        let error;

        try {
          await testRepository.dbUpdate(testModel);
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(new UxException('can_not_update_item_by_provided_data'));
      });

      it('MUST log internal error', async () => {
        try {
          await testRepository.dbUpdate(testModel);
        } catch (e) {
          // no need for test
        }

        expect(addErrorMock).toHaveBeenCalledWith(new Error('db_error'));
      });
    });

    it('MUST return boolean value', async () => {
      expect(await testRepository.dbUpdate(testModel)).toBeTruthy();
    });
  });

  describe('WHEN "dbCreate" is called', () => {
    it('MUST send query to db', async () => {
      await testRepository.dbCreate(testModel);

      expect(executeMock).toHaveBeenCalledWith(testRepository.generateCreateQuery(testRepository.generateRecordByColumns(testModel)));
    });

    describe('AND db returns error', () => {
      beforeEach(() => {
        executeMock.mockRejectedValue(new Error('db_error'));
      });

      it('MUST throw ui error', async () => {
        let error;

        try {
          await testRepository.dbCreate(testModel);
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(new UxException('can_not_create_item_by_provided_data'));
      });

      it('MUST log internal error', async () => {
        try {
          await testRepository.dbCreate(testModel);
        } catch (e) {
          // no need for test
        }

        expect(addErrorMock).toHaveBeenCalledWith(new Error('db_error'));
      });
    });

    it('MUST return boolean value', async () => {
      expect(await testRepository.dbCreate(testModel)).toBeTruthy();
    });
  });

  describe('WHEN "dbFindAll" is called', () => {
    beforeEach(() => {
      executeMock.mockResolvedValue([
        {
          insertId: 0,
          rows: {
            item: (): IAbstractModel => testModel,
            raw: jest.fn(),
            length: 1,
          },
          rowsAffected: 0,
        },
      ]);
    });

    it('AND "testId" provided, MUST send query to db with "testId"', async () => {
      await testRepository.getList<ITestModelListQuery>({ testId: testModel.id });

      expect(executeMock).toHaveBeenCalledWith(testRepository.generateSelectQuery(`testId='${testModel.id}'`));
    });

    describe('AND db returns error', () => {
      beforeEach(() => {
        executeMock.mockRejectedValue(new Error('db_error'));
      });

      it('MUST throw ui error', async () => {
        let error;

        try {
          await testRepository.getList<ITestModelListQuery>({ testId: testModel.id });
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(new UxException('can_not_get_list_by_query'));
      });

      it('MUST log internal error', async () => {
        try {
          await testRepository.getList<ITestModelListQuery>({ testId: testModel.id });
        } catch (e) {
          // no need for test
        }

        expect(addErrorMock).toHaveBeenCalledWith(new Error('db_error'));
      });
    });

    it('MUST returns array', async () => {
      expect(
        await testRepository.getList<ITestModelListQuery>({ testId: testModel.id }),
      ).toEqual([testModel]);
    });
  });

  describe('WHEN "generateModelId" is called', () => {
    it('AND id is not generated, MUST call external lib for generating uuid', () => {
      const newModel = new TestModel(NEW_MOCKED_TEST_MODEL);

      testRepository.generateModelId(newModel);

      expect(uuidV4Mock).toHaveBeenCalled();
    });

    it('AND id is provided generated, MUST NOT call external lib for generating uuid', () => {
      uuidV4Mock.mockReset();
      const newModel = new TestModel(MOCKED_TEST_MODEL);

      testRepository.generateModelId(newModel);

      expect(uuidV4Mock).not.toHaveBeenCalled();
    });
  });

  describe('WHEN "get" is called', () => {
    it('AND cache contains model data, MUST not send query to db', async () => {
      await testRepository.add(testModel);
      executeMock.mockReset();
      await testRepository.get(testModel.id);

      expect(executeMock).not.toHaveBeenCalled();
    });

    describe('AND cache does not contain model data', () => {
      it('MUST send query to db', async () => {
        await testRepository.remove(testModel.id);
        await testRepository.get(testModel.id);
        expect(executeMock).toHaveBeenCalledWith(testRepository.generateSelectQuery(`id='${testModel.id}'`, 0, 1));
      });

      it('MUST add model data to cache', async () => {
        await testRepository.remove(testModel.id);
        await testRepository.get(testModel.id);
        executeMock.mockReset();
        await testRepository.get(testModel.id);

        expect(executeMock).not.toHaveBeenCalledWith(testRepository.generateSelectQuery(`id='${testModel.id}'`, 0, 1));
      });
    });
  });

  describe('WHEN "add" is called', () => {
    const newModel = new TestModel(NEW_MOCKED_TEST_MODEL);

    beforeAll(async () => {
      await testRepository.add(newModel);
    });

    it('MUST generate model id', () => {
      expect(uuidV4Mock).toHaveBeenCalled();
    });

    it('MUST send query to db', () => {
      expect(executeMock).toHaveBeenCalledWith(testRepository.generateCreateQuery(testRepository.generateRecordByColumns(newModel)));
    });

    it('MUST add model to cache', async () => {
      executeMock.mockReset();
      await testRepository.get(testModel.id);
      expect(executeMock).not.toHaveBeenCalledWith(testRepository.generateSelectQuery(`id='${testModel.id}'`, 0, 1));
    });

    it('MUST return generated Id', async () => {
      expect(await testRepository.add(newModel)).toEqual('test-id');
    });
  });

  describe('WHEN "remove" is called', () => {
    it('MUST send delete query to db', async () => {
      await testRepository.remove(testModel.id);

      expect(executeMock).toHaveBeenCalledWith(testRepository.generateDeleteQuery(`id='${testModel.id}'`));
    });

    it('MUST remove model from cache', async () => {
      const testRepository = new TestRepository();

      await testRepository.add(testModel);
      expect(testRepository.cacheCount).toEqual(1);

      await testRepository.remove(testModel.id);

      expect(testRepository.cacheCount).toEqual(0);
    });

    it('MUST return "true"', async () => {
      expect(await testRepository.remove(testModel.id)).toBeTruthy();
    });
  });

  describe('WHEN "generateRecordByColumns" is called', () => {
    it('MUST fill columns for provided type', () => {
      const expectedAnswer = {};

      Object.keys(testRepository.getDbTableColumns()).forEach((columnName: string) => {
        expectedAnswer[columnName] = testModel[columnName] ?? 'NULL';
      });

      expect(testRepository.generateRecordByColumns(testModel)).toEqual(expectedAnswer);
    });
  });
});
