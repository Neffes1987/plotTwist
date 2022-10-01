import { TextDTO } from 'backend';

import { AbstractEntity } from '../../../entities/AbstractEntity/AbstractEntity';
import { AbstractRepository } from '../AbstractRepository';
import { IDataProvider, RawDataType } from '../interface';

const mockedDataProvider: IDataProvider = {
  create: jest.fn().mockResolvedValue('1234'),
  delete: jest.fn().mockResolvedValue(true),
  get: jest.fn(),
  list: jest.fn(),
  update: jest.fn().mockResolvedValue(true),
};

class Entity extends AbstractEntity {
  validate(): void {
    //
  }
}

class Repository extends AbstractRepository {
  constructor() {
    super(mockedDataProvider);
  }

  protected unSerializeToEntity(object: RawDataType): AbstractEntity {
    const entity = new Entity();

    entity.unSerializeToEntity((object as unknown) as TextDTO);

    return entity;
  }
}

describe('AbstractRepository', () => {
  const repository = new Repository();
  const entity = new Entity();

  entity.setId('1234');

  describe('WHEN "delete" is called', () => {
    it('MUST call "delete" method from dataProvider', async () => {
      await repository.delete(entity.id);

      expect(mockedDataProvider.delete).toHaveBeenCalledWith(entity.id);
    });

    it('MUST return boolean value', async () => {
      expect(await repository.delete(entity.id)).toBeTruthy();
    });
  });

  describe('WHEN "update" is called', () => {
    it('MUST call "update" method from dataProvider', async () => {
      await repository.update(entity);

      expect(mockedDataProvider.update).toHaveBeenCalledWith(entity.serialize());
    });

    it('MUST return boolean value', async () => {
      expect(await repository.update(entity)).toBeTruthy();
    });
  });

  describe('WHEN "create" is called', () => {
    it('MUST call "create" method from dataProvider', async () => {
      await repository.create(entity);

      expect(mockedDataProvider.create).toHaveBeenCalledWith(entity.serialize());
    });

    it('MUST return generated id', async () => {
      expect(await repository.create(entity)).toBeDefined();
    });
  });

  describe('WHEN "get" is called', () => {
    beforeEach(() => {
      (mockedDataProvider.get as jest.Mock).mockResolvedValue(entity);
    });

    it('MUST call "get" method from dataProvider', async () => {
      await repository.get(entity.id);

      expect(mockedDataProvider.get).toHaveBeenCalledWith(entity.id);
    });

    it('AND answer is empty, MUST return "null"', async () => {
      (mockedDataProvider.get as jest.Mock).mockResolvedValue(null);
      expect(await repository.get(entity.id)).toBeNull();
    });

    it('MUST return "entity"', async () => {
      expect(await repository.get(entity.id)).toEqual(entity);
    });
  });

  describe('WHEN "list" is called', () => {
    beforeEach(() => {
      (mockedDataProvider.list as jest.Mock).mockResolvedValue([entity]);
    });

    it('MUST call "list" method from dataProvider', async () => {
      await repository.list({ pagination: { count: 1, page: 1 } });

      expect(mockedDataProvider.list).toHaveBeenCalledWith({ pagination: { count: 1, page: 1 } });
    });

    it('AND answer is empty, MUST return empty array', async () => {
      (mockedDataProvider.list as jest.Mock).mockResolvedValue([]);

      expect(await repository.list({ pagination: { count: 1, page: 1 } })).toHaveLength(0);
    });

    it('MUST return "entity" list', async () => {
      expect(await repository.list({ pagination: { count: 1, page: 1 } })).toHaveLength(1);
    });
  });
});
