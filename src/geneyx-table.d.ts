/* eslint-disable @typescript-eslint/no-unused-vars */
import { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "checkbox" | "text" | "number";
  }
}

export type ColumnFiltersState = ColumnFilter[];
export interface ColumnFilter {
  id: string;
  value: unknown;
}

export type FilterOperatorText =
  | "startsWith"
  | "endsWith"
  | "equals"
  | "contains"
  | "notContains";

export type FilterOperatorNumbers = "equals" | "greaterThan" | "lessThan";

export type FilterObject = {
  operator: FilterOperator;
  value: string;
};
