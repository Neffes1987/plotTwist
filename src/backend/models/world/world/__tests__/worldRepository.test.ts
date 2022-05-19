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
  const world = new PlainWorldModel(MOCKED_WORLD);

  Object.defineProperty(worldRepository, '_errorLog', {
    writable: true,
    value: errorLogMock,
  });

  beforeEach(() => {
    executeMock.mockResolvedValue([MOCKED_RESULT_SET]);
    addErrorMock.mockReturnValue();
  });

  describe('WHEN "removeAllByPlotId" is called', () => {
    it('MUST send query to db', async () => {
      await worldRepository.removeAllByPlotId(world.plotId);

      expect(executeMock).toHaveBeenCalledWith(worldRepository.generateDeleteQuery(`plotId='${world.plotId}'`));
    });

    describe('AND db returns error', () => {
      beforeEach(() => {
        executeMock.mockRejectedValue(new Error('db_error'));
      });

      it('MUST throw ui error', async () => {
        let error;

        try {
          await worldRepository.removeAllByPlotId(world.plotId);
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(new UxException('can_not_delete_worlds_by_plot_id'));
      });

      it('MUST log internal error', async () => {
        try {
          await worldRepository.removeAllByPlotId(world.plotId);
        } catch (e) {
          // no need for test
        }

        expect(addErrorMock).toHaveBeenCalledWith(new Error('db_error'));
      });
    });

    it('MUST returns true', async () => {
      expect(await worldRepository.removeAllByPlotId(world.plotId)).toBeTruthy();
    });
  });

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

  it('WHEN "getDbTableColumns" is called, MUST send query to db', () => {
    const columns: string[] = ['primaryKey INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL'];
    const config = worldRepository.getDbTableColumns();

    Object.keys(config).forEach((columnName: string) => {
      const columnSettings = config[columnName];

      columns.push(`${columnName} ${columnSettings}`);
    });

    expect(executeMock).toHaveBeenCalledWith(`CREATE TABLE IF NOT EXISTS "world" (${columns.toString()})`);
  });

  describe('WHEN "generateRecordByColumns" is called', () => {
    it.each([
      ['plainWorld', MOCKED_WORLD, new PlainWorldModel(MOCKED_WORLD)],
      ['privateWorld', MOCKED_PRIVATE_WORLD, new PrivateWorldModel(MOCKED_PRIVATE_WORLD)],
      ['hiddenCave', MOCKED_HIDDEN_CAVE_WORLD, new HiddenCaveWorldModel(MOCKED_HIDDEN_CAVE_WORLD)],
      ['holiday', MOCKED_HOLIDAY_WORLD, new HolidayWorldModel(MOCKED_HOLIDAY_WORLD)],
      ['returnWithPotion', MOCKED_RETURN_WORLD, new ReturnWithPotionWorldModel(MOCKED_RETURN_WORLD)],
    ])('AND provided data is for %p, MUST fill columns for provided type', (_, expected, model) => {
      const expectedAnswer = {};

      Object.keys(worldRepository.getDbTableColumns()).forEach((columnName: string) => {
        expectedAnswer[columnName] = expected[columnName] ?? 'NULL';
      });

      expect(worldRepository.generateRecordByColumns(model)).toEqual(expectedAnswer);
    });
  });

  it('WHEN "list" is called, MUST return worlds list', async () => {
    executeMock.mockResolvedValue([
      {
        insertId: 0,
        rows: {
          item: (): Record<string, string | number> => worldRepository.generateRecordByColumns(world),
          raw: jest.fn(),
          length: 1,
        },
        rowsAffected: 0,
      },
    ]);

    expect(await worldRepository.list({ plotId: world.plotId })).toEqual([world]);
  });
});
