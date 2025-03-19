import { ColumnDef } from "@tanstack/react-table";

export const getDefaultColumnVisibility = (
  columns: ColumnDef<any, any>[]
): Record<string, boolean> => {
  const visibility: Record<string, boolean> = {};

  const traverse = (cols: ColumnDef<any, any>[]) => {
    cols.forEach((col) => {
      if ("id" in col) {
        // Assume visible unless meta.defaultVisibility is explicitly false.
        visibility[col.id as string] =
          col.meta?.defaultVisibility === false ? false : true;
      }
      if ("columns" in col && Array.isArray(col.columns)) {
        traverse(col.columns);
      }
    });
  };

  traverse(columns);
  return visibility;
};
