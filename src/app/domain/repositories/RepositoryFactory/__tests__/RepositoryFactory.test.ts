import { LawsRepository } from '../../LawsRepository/LawsRepository';
import { PlotRepository } from '../../PlotRepository/PlotRepository';
import { RelationsRepository } from '../../RelationsRepository/RelationsRepository';
import { WorldRepository } from '../../WorldRepository/WorldRepository';
import { RepositoryFactoryType } from '../interface';
import { createRepository } from '../RepositoryFactory';

describe('RepositoryFactory', () => {
  it.each([
    ['plot', PlotRepository],
    ['world', WorldRepository],
    ['laws', LawsRepository],
    ['relation', RelationsRepository],
  ])('WHEN "createRepository" is called with %p, MUST return instance of repository for provided key', (type, expected) => {
    const repository = createRepository(type as RepositoryFactoryType);

    expect(repository instanceof expected).toBeTruthy();
  });
});
