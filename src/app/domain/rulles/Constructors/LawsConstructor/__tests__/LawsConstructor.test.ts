import { createEntity } from '../../../../entities/createEntity';
import { WorldLawRelation } from '../../../../entities/WorldLawRelation/WorldLawRelation';
import { Repository } from '../../../../repositories/Repository/Repository';
import { LawsConstructor } from '../LawsConstructor';

const mockWorldLawRelationList = jest.fn();
const mockLawsList = jest.fn();
const mockCreate = jest.fn();
const mockGet = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();

jest.mock('../../../../repositories/RepositoryFactory/RepositoryFactory', () => ({
  createRepository: (type: string): Repository =>
    ({
      list: (arg: unknown) => {
        if (type === 'worldLawRelation') {
          return mockWorldLawRelationList(arg);
        }

        if (type === 'laws') {
          return mockLawsList(arg);
        }
      },
      create: entity => mockCreate(entity),
      update: entity => mockUpdate(entity),
      delete: id => mockDelete(id),
      get: id => mockGet(id),
    } as Repository),
}));

describe('LawsConstructor', () => {
  const constructor = new LawsConstructor();
  const lawWorldRelation = createEntity('worldLawRelation');
  const law = createEntity('laws');
  const world = createEntity('plainWorld');
  const lawId = 'lawId-1234567890';

  lawWorldRelation.setId('1234567890');
  (lawWorldRelation as WorldLawRelation).setLawId(lawId);
  (lawWorldRelation as WorldLawRelation).isBroken = true;
  law.setId(lawId);
  world.setId('world1');

  beforeEach(() => {
    mockWorldLawRelationList.mockResolvedValue([lawWorldRelation]);
    mockLawsList.mockResolvedValue([law]);
  });

  describe('WHEN "getLawsForWorlds" is called', () => {
    it('MUST get list of laws for provided worlds', async () => {
      await constructor.getLawsForWorlds([world.id]);

      expect(mockWorldLawRelationList).toHaveBeenCalledWith({
        pagination: {
          count: 100,
          page: 1,
        },
        queryParams: {
          worldId: [world.id],
        },
      });
    });

    it('MUST get list of laws', async () => {
      await constructor.getLawsForWorlds([world.id]);

      expect(mockLawsList).toHaveBeenCalledWith({
        pagination: {
          count: 100,
          page: 1,
        },
        queryParams: {
          id: [(lawWorldRelation as WorldLawRelation).lawId],
        },
      });
    });

    it('MUST return list of laws with "isBroken"', async () => {
      const laws = await constructor.getLawsForWorlds([world.id]);

      expect(laws[0].isBroken).toBeTruthy();
    });
  });

  describe('WHEN "addLawsToWorld" is called', () => {
    const lawWorldRelation = createEntity('worldLawRelation');

    (lawWorldRelation as WorldLawRelation).setLawId(lawId);
    (lawWorldRelation as WorldLawRelation).setWorldIs(world.id);
    (lawWorldRelation as WorldLawRelation).isBroken = false;

    it('MUST add new law to world relations', async () => {
      await constructor.addLawsToWorld([lawId], world.id);

      expect(mockCreate).toHaveBeenCalledWith(lawWorldRelation);
    });

    it('MUST return "true"', async () => {
      expect(await constructor.addLawsToWorld([lawId], world.id)).toBeTruthy();
    });
  });

  describe('WHEN "removeLawsFromWorld" is called', () => {
    it('MUST remove law to world relations', async () => {
      await constructor.removeLawsFromWorld([lawWorldRelation.id]);

      expect(mockDelete).toHaveBeenCalledWith(lawWorldRelation.id);
    });

    it('MUST return "true"', async () => {
      expect(await constructor.removeLawsFromWorld([lawWorldRelation.id])).toBeTruthy();
    });
  });

  describe('WHEN "updateLawStatus" is called', () => {
    const lawWorldRelation = createEntity('worldLawRelation');

    (lawWorldRelation as WorldLawRelation).setLawId(lawId);
    (lawWorldRelation as WorldLawRelation).setWorldIs(world.id);
    (lawWorldRelation as WorldLawRelation).isBroken = false;

    beforeEach(() => {
      mockGet.mockResolvedValue(lawWorldRelation);
      mockUpdate.mockResolvedValue(true);
    });

    it('MUST get relation by provided id', async () => {
      await constructor.updateLawStatus(lawWorldRelation.id, true);

      expect(mockGet).toHaveBeenCalledWith(lawWorldRelation.id);
    });

    it('MUST toggle "isBroken" flag', async () => {
      await constructor.updateLawStatus(lawWorldRelation.id, true);

      expect(mockUpdate).toHaveBeenCalledWith({ ...lawWorldRelation, isBroken: true });
    });

    it('MUST return "true"', async () => {
      expect(await constructor.updateLawStatus(lawWorldRelation.id, true)).toBeTruthy();
    });

    it('AND there is no entity with provided id, MUST return "false"', async () => {
      mockGet.mockResolvedValue(null);

      expect(await constructor.updateLawStatus(lawWorldRelation.id, true)).toBeFalsy();
    });
  });
});
