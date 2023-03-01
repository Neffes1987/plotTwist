import { generateString } from '@mocks/functions';

import { MainEdgeType } from '../../../../../constants/edge.enum';
import { SHORT_VALUE_MAX_LENGTH } from '../../../../../frontend/Screens/Tasks/constants';
import { TaskDTO } from '../../../../../types/entities/task';
import { ValidationError } from '../../../../errors/ValidationError';
import { Task } from '../Task';

describe('WHEN "Task" is created', () => {
  const taskDTO: TaskDTO = {
    edgeImpact: generateString(SHORT_VALUE_MAX_LENGTH + 1),
    type: 'edge',
    description: 'description',
    id: 'test-task',
    name: 'test-name',
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

    describe('AND "type" is "mainEdge", MUST throw error', () => {
      it('AND "mainEdgeType" is not provided, MUST throw error', () => {
        let error: Nullable<ValidationError> = null;

        try {
          task.name = '';
          task.type = 'mainEdge';
          task.mainEdgeType = undefined;
          task.validate();
        } catch (e) {
          error = e;
        }

        expect(error).toBeDefined();
      });

      it('AND "mainEdgeType" is "shadowEncounter" AND "shadowEncounterType" is not provided, MUST throw error', () => {
        let error: Nullable<ValidationError> = null;

        try {
          task.name = '';
          task.type = 'mainEdge';
          task.mainEdgeType = MainEdgeType.ShadowEncounter;
          task.shadowEncounterType = undefined;
          task.validate();
        } catch (e) {
          error = e;
        }

        expect(error).toBeDefined();
      });
    });
  });

  it('AND "serialize" is called, MUST return "taskDTO"', () => {
    expect(task.serialize()).toEqual(taskDTO);
  });
});
