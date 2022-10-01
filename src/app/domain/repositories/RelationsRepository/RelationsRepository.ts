import { AbstractEntity } from '../../entities/AbstractEntity/AbstractEntity';
import { RelationDTO } from '../../entities/interface';
import { Relation } from '../../entities/Relation/Relation';
import { AbstractRepository } from '../AbstractRepository/AbstractRepository';
import { IDataProvider, RawDataType } from '../AbstractRepository/interface';

export class RelationsRepository extends AbstractRepository {
  constructor(dataProvider: IDataProvider) {
    super(dataProvider);
  }

  protected unSerializeToEntity(object: RawDataType): AbstractEntity {
    const relation = new Relation();

    relation.unSerialize((object as unknown) as RelationDTO);

    return relation;
  }
}
