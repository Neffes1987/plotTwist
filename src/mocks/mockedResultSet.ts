import { ResultSet } from 'react-native-sqlite-storage';

export const MOCKED_RESULT_SET: ResultSet = {
  insertId: 0,
  rows: {
    item: jest.fn,
    raw: jest.fn(),
    length: 0,
  },
  rowsAffected: 0,
};
