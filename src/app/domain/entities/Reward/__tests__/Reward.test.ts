import { ValidationError } from '../../../../errors/ValidationError';
import { Reward } from '../Reward';

describe('WHEN "Law" is created', () => {
  const rewardDto: RewardDto = {
    description: 'description',
    id: 'test-reward',
    name: 'test-name',
  };

  const reward = new Reward();

  beforeEach(() => {
    reward.unSerialize(rewardDto);
  });

  describe('AND "validate" is called', () => {
    it('AND all fields are ok, MUST exit', () => {
      let error: Nullable<ValidationError> = null;

      try {
        reward.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.message).toBeUndefined();
    });

    it('AND "name" is less then min value, MUST throw error', () => {
      let error: Nullable<ValidationError> = null;

      try {
        reward.name = '';
        reward.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties.name).toBeDefined();
    });
  });
  it('AND "serialize" is called, MUST return "RewardDTO"', () => {
    expect(reward.serialize()).toEqual(rewardDto);
  });
});
