import { PlainWorld } from '../../World/PlainWorld/PlainWorld';
import { Plot } from '../Plot';

describe('Plot', () => {
  it('WHEN "setStatus" is called, MUST update status value', () => {
    const plot = new Plot();

    plot.setStatus('released');

    expect(plot.status).toEqual('released');
  });

  it('WHEN "setWorlds" is called, MUST update worlds value', () => {
    const plot = new Plot();

    plot.setWorlds([new PlainWorld()]);

    expect(plot.worlds).toHaveLength(1);
  });

  it('WHEN "serialize" is called, MUST return worlds fields as a plain object', () => {
    const plot = new Plot();

    plot.setId('test');
    plot.setName('name');
    plot.setDescription('description');
    plot.setStatus('released');
    plot.setWorlds([]);

    expect(plot.serialize()).toEqual({
      id: 'test',
      name: 'name',
      description: 'description',
      status: 'released',
      worlds: [],
    });
  });

  it('WHEN "unSerializeToEntity" is called, MUST fill worlds fields by provided plain object', () => {
    const plot = new Plot();

    plot.unSerializeToEntity({
      id: 'test',
      name: 'name',
      description: 'description',
      status: 'released',
      worlds: [],
    });

    expect(plot.id).toEqual('test');
    expect(plot.name).toEqual('name');
    expect(plot.description).toEqual('description');
    expect(plot.status).toEqual('released');
    expect(plot.worlds).toEqual([]);
  });
});
