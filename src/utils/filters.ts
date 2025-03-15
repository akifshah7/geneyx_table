import { Row } from "@tanstack/react-table";
import {
  FilterObject,
  FilterOperatorNumbers,
  FilterOperatorText,
} from "../geneyx-table";

export const filterFunctionForText = (
  row: Row<any>,
  columnId: string,
  filterValue: string | FilterObject
): boolean => {
  // Get the cell value and convert it to a normalized (trimmed, lowercase) string.
  const cellValue = row.getValue(columnId);
  const cellText = cellValue ? String(cellValue).trim().toLowerCase() : "";
  console.log(filterValue);

  // Normalize the filter value.
  let filterText = "";
  let operator: FilterOperatorText = "contains";
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

export const filterFunctionForNumbers = (
  row: Row<any>,
  columnId: string,
  filterValue: number | FilterObject | string
): boolean => {
  const cellValue = row.getValue(columnId);
  const cellNumber = cellValue ? Number(String(cellValue).trim()) : NaN;

  let numericFilterValue: number;
  let operator: FilterOperatorNumbers = "equals"; // default operator

  if (typeof filterValue === "object" && filterValue !== null) {
    const trimmed = filterValue.value.toString().trim();
    if (trimmed === "") {
      // If the filter input is empty, show all rows.
      return true;
    }
    numericFilterValue = Number(trimmed);
    operator = filterValue.operator as FilterOperatorNumbers;
  } else {
    // If filterValue is a string or number, convert it to a number.
    numericFilterValue = Number(String(filterValue).trim());
  }

  // If numericFilterValue is not a valid number, show all rows.
  if (isNaN(numericFilterValue)) {
    return true;
  }

  console.log(operator);

  // Apply filtering logic based on the operator.
  switch (operator) {
    case "equals":
      return cellNumber === numericFilterValue;
    case "greaterThan":
      return cellNumber > numericFilterValue;
    case "lessThan":
      return cellNumber < numericFilterValue;
    default:
      return false;
  }
};

