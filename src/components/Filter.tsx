import { Column } from "@tanstack/react-table";
import React, { useMemo } from "react";
import "../index.css";

interface FilterProps {
  position: { x: number; y: number } | null;
  column: Column<any, unknown>;
  onClose: () => void;
}

const Filter: React.FC<FilterProps> = ({
  position,
  column,
  onClose,
}) => {
  const { filterVariant } = column.columnDef.meta ?? {};

  const filterOptions = useMemo(() => {
    if (filterVariant === "select") return [];
    return Array.from(column.getFacetedUniqueValues().keys()).filter(
      (option) => option !== "" && option !== "-"
    );
  }, [column.getFacetedUniqueValues(), filterVariant]);

  // Assume the filter value is an array of selected options
  const currentFilter = (column.getFilterValue() as string[]) || [];

  // Handle checkbox change
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: string
  ) => {
    let newFilter: string[];
    if (e.target.checked) {
      newFilter = [...currentFilter, option];
    } else {
      newFilter = currentFilter.filter((item) => item !== option);
    }
    // If no filters are selected, clear the filter
    column.setFilterValue(newFilter.length ? newFilter : undefined);
  };

  if (!position) return null;

  return filterVariant === "checkbox" ? (
    <div
      className="absolute bg-white border border-gray-300 shadow-md p-3 w-52 rounded-md z-50"
      style={{ top: position.y, left: position.x }}
    >
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-400 text-sm rounded-md w-full px-2 py-1 mb-2 focus:outline-none"
      />
      <div className="flex flex-col gap-1 max-h-60 overflow-auto">
        {filterOptions.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={option}
              checked={currentFilter.includes(option)}
              onChange={(e) => handleCheckboxChange(e, option)}
              className="custom-checkbox appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none"
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>
      <button
        onClick={onClose}
        className="mt-2 px-4 py-1 bg-blue-500 text-white text-xs rounded w-full"
      >
        Close
      </button>
    </div>
  ) : (
    <div></div>
  );
};

export default Filter;
