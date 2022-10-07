import { Controller } from '../Controller/Controller';
import { controllerFactory } from '../controllerFactory';
import { ControllerType } from '../interface';
import { WorldController } from '../WorldController/WorldController';

describe('WHEN "controllerFactory" is called', () => {
  it.each([
    ['plot', Controller],
    ['law', Controller],
    ['world', WorldController],
  ])('AND %p is provided, MUST return %p controller', (type, result) => {
    expect(controllerFactory(type as ControllerType) instanceof result).toBeTruthy();
  });
});
