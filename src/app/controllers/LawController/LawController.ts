import { LawDTO } from 'backend';

import { Law } from '../../domain/entities/Law/lawModel';
import { LawsConstructor } from '../../domain/rulles/Constructors/LawsConstructor/LawsConstructor';
import { AbstractController } from '../AbstractController/AbstractController';

export class LawController extends AbstractController<LawDTO, LawDTO> {
  constructor() {
    super(new LawsConstructor());
  }

  convertDTOtoEntity(dto: Omit<LawDTO, 'id'>): Law {
    const law = new Law();

    law.unSerializeToEntity(dto as LawDTO);
    law.validate();

    return law;
  }
}
