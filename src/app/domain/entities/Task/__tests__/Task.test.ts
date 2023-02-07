import { generateString } from '@mocks/functions';

import { MIDDLE_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../frontend/constants';
import { TaskDTO } from '../../../../../types/entities/task';
import { ValidationError } from '../../../../errors/ValidationError';
import { Task } from '../Task';

describe('WHEN "Task" is created', () => {
  const taskDTO: TaskDTO = {
    description: 'description',
    id: 'test-task',
    name: 'test-name',
    plotGoal: generateString(SHORT_VALUE_MAX_LENGTH),
  };

  const task = new Task();

  beforeEach(() => {
    task.unSerialize(taskDTO);
  });

  describe('AND "validate" is called', () => {
    it('AND all fields are ok, MUST exit', () => {
      let error: Nullable<ValidationError> = null;

      try {
        task.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.message).toBeUndefined();
    });

    it('AND "plotGoal" is less then min value, MUST throw error', () => {
      let error: Nullable<ValidationError> = null;

      try {
        task.plotGoal = '';
        task.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.message).toEqual('VALIDATION_ERROR');
    });

    it('AND "name" is less then min value, MUST throw error', () => {
      let error: Nullable<ValidationError> = null;

      try {
        task.name = '';
        task.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties.name).toBeDefined();
    });

    it('AND "plotGoal" is more then max value, MUST throw error', () => {
      let error: Nullable<ValidationError> = null;

      try {
        task.plotGoal = generateString(MIDDLE_VALUE_MAX_LENGTH + 1);
        task.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.message).toEqual('VALIDATION_ERROR');
    });
  });

  it('AND "plotGoal" is called, MUST return "punishment" value', () => {
    expect(task.plotGoal).toEqual(taskDTO.plotGoal);
  });

  it('AND "serialize" is called, MUST return "LawDTO"', () => {
    expect(task.serialize()).toEqual(taskDTO);
  });
});
