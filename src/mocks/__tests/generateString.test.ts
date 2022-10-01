import { generateString } from '../generateString';

describe('WHEN "generateString" is called', () => {
  it.each([[1], [5], [10], [100], [120], [200], [256]])('AND range is equal %p, MUST return string for provided range', (range: number) => {
    expect(generateString(range)).toHaveLength(range);
  });
});
