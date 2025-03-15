import { Row } from "@tanstack/react-table";
import { FilterObject, FilterOperator } from "../geneyx-table";

export const filterFunctionForText = (
  row: Row<any>,
  columnId: string,
  filterValue: string | FilterObject
): boolean => {
  // Get the cell value and convert it to a normalized (trimmed, lowercase) string.
  const cellValue = row.getValue(columnId);
  const cellText = cellValue ? String(cellValue).trim().toLowerCase() : "";

  // Normalize the filter value.
  let filterText = "";
  let operator: FilterOperator = "contains";
  if (typeof filterValue === "object" && filterValue !== null) {
    filterText = filterValue.value.trim().toLowerCase();
    operator = filterValue.operator;
  } else {
    filterText = String(filterValue).trim().toLowerCase();
  }

  if (filterText === "") {
    return true;
  }

  // Apply filtering logic based on the operator.
  switch (operator) {
    case "startsWith":
      return cellText.startsWith(filterText);
    case "endsWith":
      return cellText.endsWith(filterText);
    case "equals":
      return cellText === filterText;
    case "contains":
      return cellText.includes(filterText);
    case "notContains":
      return !cellText.includes(filterText);
    default:
      return false;
  }
};
