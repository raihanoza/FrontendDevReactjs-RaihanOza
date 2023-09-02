import React, { useState } from "react";

const FilterOption = ({ onFilterChange }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState("");

  const handleOptionChange = (event) => {
    const isChecked = event.target.checked;
    setSelectedOption(isChecked);
    onFilterChange(isChecked);
  };
  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
    onFilterChange({ price: event.target.value });
  };
  const handleCategoriesChange = (event) => {
    setSelectedCategories(event.target.value);
  };
  return (
    <div className="border-t-2 border-b-2 py-4 px-4 border-gray-400 mt-2 text-sm flex-row flex align-middle gap-3 w-auto">
      <p>Filter by:</p>
      <div className="border-b-2 w-auto pb-2">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-indigo-600 h-4 w-4"
            value="option1"
            checked={selectedOption}
            onChange={handleOptionChange}
          />
          <span className="ml-2">Open Now</span>
        </label>
      </div>
      <div className="border-b-2 w-auto pb-3 flex flex-row align-middle">
        <select
          className="form-select"
          value={selectedPrice}
          onChange={handlePriceChange}
        >
          <option value="">Price</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
          <option value="$$$$">$$$$</option>
          <option value="$$$$$">$$$$$</option>
        </select>
      </div>
      <div className="border-b-2 w-auto pb-3 flex flex-row align-middle">
        <select
          className="form-select"
          value={selectedCategories}
          onChange={handleCategoriesChange}
        >
          <option value="option1">Categories</option>
        </select>
      </div>
    </div>
  );
};

export default FilterOption;
