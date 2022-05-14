import { MOCKED_RESULT_SET } from '@mocks/mockedResultSet';
import { MOCKED_HIDDEN_CAVE_WORLD, MOCKED_HOLIDAY_WORLD, MOCKED_PRIVATE_WORLD, MOCKED_RETURN_WORLD, MOCKED_WORLD } from '@mocks/mockedWorld';

import DbClient from '../../../../base/dbClient';
import { ErrorLog } from '../../../../base/errors/errorLog';
import { UxException } from '../../../../base/errors/uxException';
import { HiddenCaveWorldModel } from '../hiddenCaveWorldModel';
import { HolidayWorldModel } from '../holidayWorldModel';
import { PlainWorldModel } from '../plainWorldModel';
import { PrivateWorldModel } from '../privateWorldModel';
import { ReturnWithPotionWorldModel } from '../returnWithPotionModel';
import { WorldRepository } from '../worldRepository';

describe('WorldRepository', () => {
  const executeMock = jest.spyOn(DbClient, 'execute');
  const errorLogMock = new ErrorLog();
  const worldRepository = new WorldRepository();
  const addErrorMock = jest.spyOn(errorLogMock, 'add');

  Object.defineProperty(worldRepository, '_errorLog', {
    writable: true,
    value: errorLogMock,
  });

  beforeEach(() => {
    executeMock.mockResolvedValue([MOCKED_RESULT_SET]);
    addErrorMock.mockReturnValue();
  });

  describe('WHEN "dbCreate" is called', () => {});

  describe('WHEN "list" is called', () => {});

  describe('WHEN "removeAllByPlotId" is called', () => {});

  describe('WHEN "dbDelete" is called', () => {
    it('MUST send query to db', async () => {
      await worldRepository.dbDelete('id');

      expect(executeMock).toHaveBeenCalledWith(`DELETE FROM ${worldRepository.tableName} WHERE worldId='id'`);
    });

    describe('AND db returns error', () => {
      beforeEach(() => {
        executeMock.mockRejectedValue(new Error('db_error'));
      });

      it('MUST throw ui error', async () => {
        let error;

        try {
          await worldRepository.dbDelete('id');
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(new UxException('can_not_delete_world_by_id'));
      });

      it('MUST log internal error', async () => {
        try {
          await worldRepository.dbDelete('id');
        } catch (e) {
          // no need for test
        }

        expect(addErrorMock).toHaveBeenCalledWith(new Error('db_error'));
      });
    });

    it('MUST returns true', async () => {
      expect(await worldRepository.dbDelete('id')).toBeTruthy();
    });
  });

  describe('WHEN "dbFind" is called', () => {});

  describe('WHEN "dbUpdate" is called', () => {});

  describe('WHEN "generateModel" is called', () => {
    it('AND provided data is for "Plain world", must return "PlainWorldModel"', () => {
      expect(worldRepository.generateModel(MOCKED_WORLD)).toEqual(new PlainWorldModel(MOCKED_WORLD));
    });

    it('AND provided data is for "Private world", must return "PrivateWorld"', () => {
      expect(worldRepository.generateModel(MOCKED_PRIVATE_WORLD)).toEqual(new PrivateWorldModel(MOCKED_PRIVATE_WORLD));
    });

    it('AND provided data is for "Hidden Cave", must return "HiddenCaveWorldModel"', () => {
      expect(worldRepository.generateModel(MOCKED_HIDDEN_CAVE_WORLD)).toEqual(new HiddenCaveWorldModel(MOCKED_HIDDEN_CAVE_WORLD));
    });

    it('AND provided data is for "Holiday World", must return "HolidayWorldModel"', () => {
      expect(worldRepository.generateModel(MOCKED_HOLIDAY_WORLD)).toEqual(new HolidayWorldModel(MOCKED_HOLIDAY_WORLD));
    });

    it('AND provided data is for "Return With Potion World", must return "ReturnWithPotionWorldModel"', () => {
      expect(worldRepository.generateModel(MOCKED_RETURN_WORLD)).toEqual(new ReturnWithPotionWorldModel(MOCKED_RETURN_WORLD));
    });

    it('AND provided data is unrecognised, must return ui error', () => {
      let error;

      try {
        worldRepository.generateModel({
          ...MOCKED_RETURN_WORLD,
          // @ts-ignore
          worldType: 'test',
        });
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new UxException('wrong_world_type'));
    });
  });

  describe('WHEN "dbFindAll" is called', () => {});

  it('WHEN "getDbTableColumns" is called, MUST send query to db', () => {
    expect(executeMock).toHaveBeenCalledWith(
      'CREATE TABLE IF NOT EXISTS "world" (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,worldId TEXT,story TEXT,reference TEXT,timeline TEXT,failPrice TEXT,status TEXT,edgeId TEXT,plotId TEXT,worldType TEXT)',
    );
  });
});
