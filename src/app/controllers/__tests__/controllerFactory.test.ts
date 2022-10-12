import { Controller } from '../Controller/Controller';
import { controllerFactory } from '../controllerFactory';
import { ControllerType } from '../interface';
import { LawController } from '../LawController/LawController';

describe('WHEN "controllerFactory" is called', () => {
  it.each([
    ['plot', Controller],
    ['law', LawController],
    ['world', Controller],
  ])('AND %p is provided, MUST return %p controller', (type, result) => {
    expect(controllerFactory(type as ControllerType) instanceof result).toBeTruthy();
  });
});
