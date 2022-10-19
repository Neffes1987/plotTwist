import { StatusEnum } from '../../../../../../constants/status.enum';
import { WorldEnum } from '../../../../../../constants/world.enum';
import { CrossWorldPlotDTO } from '../../../../../../types/entities/cross';
import { CrossWorldPlot } from '../CrossWorldPlot';

describe('WHEN "WorldLawRelation" is created', () => {
  const relationDTO: CrossWorldPlotDTO = {
    type: WorldEnum.PlainWorld,
    id: 'Id',
    plotId: 'plotid',
    worldId: 'worldId',
    status: StatusEnum.Draft,
  };

  it('AND "serialize" is called, MUST generate raw object from instance fields', () => {
    const relation = new CrossWorldPlot('');

    relation.unSerialize(relationDTO);
    relation.id = relationDTO.id;

    expect(relation.serialize()).toEqual(relationDTO);
  });

  it('AND "setId" is called, MUST update "id" field', () => {
    const relation = new CrossWorldPlot('');

    relation.unSerialize(relationDTO);
    relation.id = relationDTO.id;

    expect(relation.id).toEqual(relationDTO.id);
  });

  it('AND "unSerialize" is called, MUST generate raw object from instance fields', () => {
    const relation = new CrossWorldPlot('');

    relation.unSerialize(relationDTO);

    expect(relation.serialize()).toEqual(relationDTO);
  });
});
