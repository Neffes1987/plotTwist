import { StatusEnum } from '../../../../../../constants/status.enum';
import { WorldEnum } from '../../../../../../constants/world.enum';
import { CrossWorldPlotDTO } from '../../../../../../types/entities/cross';
import { CrossWorldPlot } from '../CrossWorldPlot';

const mockList = jest.fn();
const mockConstructor = jest.fn();

class MockTestGateway {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  // @ts-ignore
  list(...args) {
    mockList(...args);
  }
}

jest.mock('../../../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway', () => ({
  AsyncStoreDataGateway: (type: string) => {
    mockConstructor(type);

    return new MockTestGateway(type);
  },
}));

describe('WHEN "WorldLawRelation" is created', () => {
  const relationDTO: CrossWorldPlotDTO = {
    type: WorldEnum.PlainWorld,
    id: 'Id',
    plotId: 'plotid',
    worldId: 'worldId',
    status: StatusEnum.Draft,
  };

  it('MUST create data provider for "cross-world-plot" items', () => {
    const relation = new CrossWorldPlot();

    relation.id = relationDTO.id;

    expect(mockConstructor).toHaveBeenCalledWith('cross-world-plot');
  });

  it('AND "serialize" is called, MUST generate raw object from instance fields', () => {
    const relation = new CrossWorldPlot();

    relation.unSerialize(relationDTO);
    relation.id = relationDTO.id;

    expect(relation.serialize()).toEqual(relationDTO);
  });

  it('AND "setId" is called, MUST update "id" field', () => {
    const relation = new CrossWorldPlot();

    relation.unSerialize(relationDTO);
    relation.id = relationDTO.id;

    expect(relation.id).toEqual(relationDTO.id);
  });

  it('AND "unSerialize" is called, MUST generate raw object from instance fields', () => {
    const relation = new CrossWorldPlot();

    relation.unSerialize(relationDTO);

    expect(relation.serialize()).toEqual(relationDTO);
  });

  it('AND "getWorldListByPlotId" is called, MUST call "list" from gateway', () => {
    const relation = new CrossWorldPlot();

    relation.getWorldListByPlotId('plotId');

    expect(mockList).toHaveBeenCalledWith({ query: { plotId: 'plotId' } });
  });
});
