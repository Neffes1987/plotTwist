import { StatusEnum } from '../../../../../constants/status.enum';
import { PlotDTO } from '../../../../../types/entities/plot';
import { Plot } from '../../Plot/Plot';
import { ActiveRecord } from '../ActiveRecord';

const mockedGateway = {
  delete: jest.fn(),
  get: jest.fn(),
  list: jest.fn(),
  save: jest.fn(),
  saveInBatch: jest.fn(),
  deleteButch: jest.fn(),
};

const validateMock = jest.fn();

class TestClass extends ActiveRecord<PlotDTO> {
  name = '';
  status = StatusEnum.Draft;
  constructor() {
    super(mockedGateway);
  }

  serialize(): PlotDTO {
    return {
      id: this.id,
      status: this.status,
      name: this.name,
    };
  }

  validate(): void {
    validateMock();
  }
}

const testActiveRecord = new TestClass() as Plot;

describe('WHEN "World" is created', () => {
  const testData = {
    id: 'id',
    status: StatusEnum.Released,
    name: 'name',
  };

  beforeEach(() => {
    mockedGateway.get.mockResolvedValue({});
  });

  describe('AND "load" is called', () => {
    it('AND "id" is not provided, MUST exit', () => {
      testActiveRecord.id = '';

      testActiveRecord.load();

      expect(mockedGateway.get).not.toHaveBeenCalled();
    });

    it('MUST call "get" from gateway', () => {
      testActiveRecord.id = testData.id;

      testActiveRecord.load();

      expect(mockedGateway.get).toHaveBeenCalledWith(testData.id);
    });

    it('AND gateway does not return data, MUST exit', async () => {
      mockedGateway.get.mockResolvedValue(null);

      testActiveRecord.id = testData.id;
      testActiveRecord.unSerialize(testData);

      await testActiveRecord.load();

      expect(testActiveRecord.serialize()).toEqual(testData);
    });

    it('MUST initiate fields by returned data from gateway', async () => {
      mockedGateway.get.mockResolvedValue(testData);
      testActiveRecord.id = testData.id;

      await testActiveRecord.load();

      expect(testActiveRecord.id).toEqual(testData.id);
      expect(testActiveRecord.name).toEqual(testData.name);
      expect(testActiveRecord.status).toEqual(testData.status);
    });
  });

  describe('AND "save" is called', () => {
    it('MUST call "validation"', async () => {
      testActiveRecord.id = testData.id;
      testActiveRecord.unSerialize(testData);

      await testActiveRecord.save();

      expect(validateMock).toHaveBeenCalled();
    });

    it('MUST call "save" from gateway', async () => {
      testActiveRecord.id = testData.id;
      testActiveRecord.unSerialize(testData);

      await testActiveRecord.save();

      expect(mockedGateway.save).toHaveBeenCalledWith(testData);
    });
  });

  describe('AND "remove" is called', () => {
    it('AND "id" is not provided, MUST exit', async () => {
      testActiveRecord.id = '';

      await testActiveRecord.remove();

      expect(mockedGateway.delete).not.toHaveBeenCalled();
    });

    it('MUST call "delete" from gateway', async () => {
      testActiveRecord.id = testData.id;

      await testActiveRecord.remove();

      expect(mockedGateway.delete).toHaveBeenCalledWith(testData.id);
    });
  });
});
