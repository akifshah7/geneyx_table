/* eslint-disable @typescript-eslint/no-unused-vars */
import { RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'checkbox' | 'text';
  }
}

export type ColumnFiltersState = ColumnFilter[];
export interface ColumnFilter {
    id: string;
    value: unknown;
}

export type FilterOperator =
  | "startsWith"
  | "endsWith"
  | "equals"
  | "contains"
  | "notContains";

export type FilterObject = {
  operator: FilterOperator;
  value: string;
};
