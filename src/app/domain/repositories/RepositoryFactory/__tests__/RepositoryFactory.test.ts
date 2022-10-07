import { Repository } from '../../Repository/Repository';
import { WorldRepository } from '../../WorldRepository/WorldRepository';
import { RepositoryFactoryType } from '../interface';
import { createRepository } from '../RepositoryFactory';

describe('RepositoryFactory', () => {
  it.each([
    ['plot', Repository],
    ['world', WorldRepository],
    ['laws', Repository],
    ['worldLawRelation', Repository],
  ])('WHEN "createRepository" is called with %p, MUST return instance of repository for provided key', (type, expected) => {
    const repository = createRepository(type as RepositoryFactoryType);

    expect(repository instanceof expected).toBeTruthy();
  });
});
