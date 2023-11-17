// useTransactionFilter.js
import { useState } from "react";

export const useTransactionFilter = () => {
  const [filterOptions, setFilterOptions] = useState({
    timeRange: null,
    transactionType: null,
    category: null,
    customDate: null, // Keep customDate as a string
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to apply filters
  const applyFilters = (newFilterOptions) => {
    // Set filter options
    setFilterOptions((prevFilterOptions) => ({
      ...prevFilterOptions,
      ...newFilterOptions,
    }));
  };

  return { filterOptions, setFilterOptions, applyFilters, showDatePicker, setShowDatePicker };
};
