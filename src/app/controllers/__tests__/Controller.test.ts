import { TextDTO } from 'backend';

import { createEntity } from '../../domain/entities/createEntity';
import { AbstractConstructor } from '../../domain/rulles/Constructors/AbstractConstructor/AbstractConstructor';
import { Controller } from '../Controller/Controller';

describe('WHEN "Controller" is created', () => {
  const builder = {
    create: jest.fn(),
    delete: jest.fn(),
    get: jest.fn(),
    list: jest.fn(),
    update: jest.fn(),
  };

  const converter = {
    toEntity: jest.fn(),
  };

  const dto = { id: 'testId', description: 'description', name: 'test_name' } as TextDTO;

  const testController = new Controller((builder as unknown) as AbstractConstructor, converter);
  const testPlotEntity = createEntity('plot');

  testPlotEntity.unSerializeToEntity(dto);

  beforeEach(() => {
    converter.toEntity.mockReturnValue(testPlotEntity);
    builder.list.mockResolvedValue([testPlotEntity]);
  });

  it('AND "create" is called, MUST call "create" from builder', async () => {
    await testController.create(dto);

    expect(builder.create).toHaveBeenCalledWith(testPlotEntity);
  });

  it('AND "delete" is called, MUST call "delete" from builder', async () => {
    await testController.delete(dto.id);

    expect(builder.delete).toHaveBeenCalledWith(dto.id);
  });

  it('AND "get" is called, MUST call "get" from builder', async () => {
    await testController.get(dto.id);

    expect(builder.get).toHaveBeenCalledWith(dto.id);
  });

  it('AND "list" is called, MUST call "list" from builder', async () => {
    await testController.list({
      pagination: {
        count: 1,
        page: 1,
      },
    });

    expect(builder.list).toHaveBeenCalledWith({
      pagination: {
        count: 1,
        page: 1,
      },
    });
  });

  it('AND "update" is called, MUST call "update" from builder', async () => {
    await testController.update(dto);
  });
});
