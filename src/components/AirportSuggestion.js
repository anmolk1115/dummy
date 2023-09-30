import React from "react";

const AirportSuggestionItem = ({
  name,
  country,
  onSelectItem,
  isHighlighted,
}) => {
  return (
    <li
      className={`list-group-item ${isHighlighted ? "active highlighted" : ""}`}
      onClick={onSelectItem}
    >
      <div className="row">
        <div className="text-left">
          <p
            className="mb-0 font-weight-bold line-height-1"
            data-testid="airport-name"
          >
            {name}
          </p>
          <p
            className="mb-0 font-weight-bold line-height-1"
            data-testid="airport-country"
          >
            {country}
          </p>
        </div>
      </div>
    </li>
  );
};

export default AirportSuggestionItem;
