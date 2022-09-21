import { LawDTO } from 'backend';

import { Law } from '../../entities/Law/Law';
import { AbstractRepository } from '../AbstractRepository/AbstractRepository';
import { IDataProvider, RawDataType } from '../AbstractRepository/interface';

export class LawsRepository extends AbstractRepository {
  constructor(dataProvider: IDataProvider) {
    super(dataProvider);
  }

  protected unSerializeToEntity(data: RawDataType): Law {
    const law = new Law();

    law.unSerializeToEntity((data as unknown) as LawDTO);

    return law;
  }
}
