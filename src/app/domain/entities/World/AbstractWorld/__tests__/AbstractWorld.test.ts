import { WorldDTO } from 'backend';
import { generateString } from '@mocks/functions';

import { BIG_VALUE_MAX_LENGTH, MIDDLE_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../../constants';
import { ValidationError } from '../../../../../errors/ValidationError';
import { Law } from '../../../Law/Law';
import { AbstractWorld } from '../AbstractWorld';

class TestWorld extends AbstractWorld {
  constructor() {
    super('plainWorld');
  }
}

describe('WHEN "AbstractWorld" is created', () => {
  const serializedWorld: WorldDTO = {
    description: 'description',
    failPrice: generateString(257),
    id: 'id',
    laws: [],
    name: generateString(7),
    plotId: 'plotId',
    reference: generateString(257),
    status: 'release',
    story: generateString(257),
    timeline: generateString(257),
    type: 'plainWorld',
    waterholes: [],
  };

  it('AND "setStory" is called, MUST update "story" for world', () => {
    const world = new TestWorld();

    world.setStory('test-story');

    expect(world.story).toEqual('test-story');
  });

  it('AND "setStatus" is called, MUST update "status" for world', () => {
    const world = new TestWorld();

    world.setStatus('release');

    expect(world.status).toEqual('release');
  });

  it('AND "setReference" is called, MUST update "reference" for world', () => {
    const world = new TestWorld();

    world.setReference('reference');

    expect(world.reference).toEqual('reference');
  });

  it('AND "setTimeline" is called, MUST update "timeline" for world', () => {
    const world = new TestWorld();

    world.setTimeline('timeline');

    expect(world.timeline).toEqual('timeline');
  });

  it('AND "setFailPrice" is called, MUST update "failPrice" for world', () => {
    const world = new TestWorld();

    world.setFailPrice('failPrice');

    expect(world.failPrice).toEqual('failPrice');
  });

  it('AND "setPlotId" is called, MUST update "plotId" for world', () => {
    const world = new TestWorld();

    world.setPlotId('plotId');

    expect(world.plotId).toEqual('plotId');
  });

  it('AND "setLaws" is called, MUST update "laws" for world', () => {
    const world = new TestWorld();
    const law = new Law();

    world.setLaws([law]);

    expect(world.laws).toEqual([law]);
  });

  it.skip('AND "setChallenges" is called, MUST update "challenges" for world', () => {
    // const world = new TestWorld();
  });

  it.skip('AND "setWaterholes" is called, MUST update "waterholes" for world', () => {
    // const world = new TestWorld();
  });

  it('AND "serialize" is called, MUST return serialized object', () => {
    const world = new TestWorld();

    world.unSerializeToEntity(serializedWorld);

    expect(world.serialize()).toEqual(serializedWorld);
  });

  describe('AND "validate" is called', () => {
    it('AND all data is ok, MUST return', () => {
      const world = new TestWorld();

      world.unSerializeToEntity(serializedWorld);

      let error: Nullable<Error> = null;

      try {
        world.validate();
      } catch (e) {
        error = e;
      }

      expect(error).toBeNull();
    });

    it.each([
      ['failPrice', SHORT_VALUE_MAX_LENGTH - 1],
      ['failPrice', MIDDLE_VALUE_MAX_LENGTH + 1],
      ['name', 0],
      ['reference', SHORT_VALUE_MAX_LENGTH - 1],
      ['reference', MIDDLE_VALUE_MAX_LENGTH + 1],
      ['story', SHORT_VALUE_MAX_LENGTH - 1],
      ['story', BIG_VALUE_MAX_LENGTH + 1],
      ['timeline', SHORT_VALUE_MAX_LENGTH - 1],
      ['timeline', MIDDLE_VALUE_MAX_LENGTH + 1],
    ])('AND check of %p field is failed, MUST throw "ValidationError"', (property: string, range: number) => {
      const testSet = {
        ...serializedWorld,
        [property]: generateString(range),
      };

      const world = new TestWorld();

      world.unSerializeToEntity(testSet);

      let error: Nullable<ValidationError> = null;

      try {
        world.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties[property]).toHaveLength(1);
    });
  });
});
