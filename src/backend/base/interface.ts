export interface IListQuery {
  page?: number;
  limit?: number;
  order?: 'ASC' | 'DESC';
  range?: {
    field: string;
    values: string[];
  };
}

export type ColumnsConfigType = 'TEXT' | 'ARRAY' | 'BOOLEAN' | 'INTEGER' | 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL';

export interface IAbstractModel {
  id: string;
  name: string;
  description: string;
}

export interface IValidatorConfiguration {
  min?: number;
  max?: number;
  name: string;
  isNumber?: boolean;
}
