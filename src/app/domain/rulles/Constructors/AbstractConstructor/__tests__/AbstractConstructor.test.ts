import { DataProviderFactory } from '../../../../../dataStoreProvider/DataProviderFactory/DataProviderFactory';
import { AbstractEntity } from '../../../../entities/AbstractEntity/AbstractEntity';
import { Plot } from '../../../../entities/Plot/Plot';
import { ListParams } from '../../../../interface';
import { Repository } from '../../../../repositories/Repository/Repository';
import { AbstractConstructor } from '../AbstractConstructor';

const mocks = {
  create: jest.fn(),
  update: jest.fn(),
  get: jest.fn(),
  list: jest.fn(),
  delete: jest.fn(),
};

class TestRepository extends Repository {
  constructor() {
    super(new DataProviderFactory('any').createDataProvider('store'));
  }

  async create(entity: AbstractEntity): Promise<string> {
    return Promise.resolve(mocks.create(entity));
  }

  async update(entity: AbstractEntity): Promise<boolean> {
    return Promise.resolve(mocks.update(entity));
  }

  async delete(entityId: string): Promise<boolean> {
    return Promise.resolve(mocks.delete(entityId));
  }

  async list(params: ListParams): Promise<AbstractEntity[]> {
    return Promise.resolve(mocks.list(params));
  }

  async get(entityId: string): Promise<Nullable<AbstractEntity>> {
    return Promise.resolve(mocks.get(entityId));
  }

  protected unSerializeToEntity(): AbstractEntity {
    return new Plot();
  }
}

class AbstractConstructorTest extends AbstractConstructor {
  constructor() {
    super(new TestRepository());
  }
}

describe('AbstractConstructor', () => {
  const constructor = new AbstractConstructorTest();

  it('WHEN "list" is called, MUST call the same method from repository', async () => {
    await constructor.list({ pagination: { count: 1, page: 1 } });

    expect(mocks.list).toHaveBeenCalledWith({ pagination: { count: 1, page: 1 } });
  });

  it('WHEN "get" is called, MUST call the same method from repository', async () => {
    await constructor.get('test-id');

    expect(mocks.get).toHaveBeenCalledWith('test-id');
  });

  it('WHEN "create" is called, MUST call the same method from repository', async () => {
    const entity = new Plot();

    await constructor.create(entity);

    expect(mocks.create).toHaveBeenCalledWith(entity);
  });

  it('WHEN "update" is called, MUST call the same method from repository', async () => {
    const entity = new Plot();

    await constructor.update(entity);

    expect(mocks.update).toHaveBeenCalledWith(entity);
  });

  it('WHEN "delete" is called, MUST call the same method from repository', () => {
    constructor.delete('test-id');

    expect(mocks.delete).toHaveBeenCalledWith('test-id');
  });
});
