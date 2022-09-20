import { RepositoryFactory } from '../../../repositories/RepositoryFactory/RepositoryFactory';
import { AbstractConstructor } from '../AbstractConstructor/AbstractConstructor';

export class LawsConstructor extends AbstractConstructor {
  constructor() {
    super(new RepositoryFactory().createRepository('laws'));
  }
}
