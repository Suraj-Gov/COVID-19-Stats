import React from "react";

const Dropdown = (props) => {
  return (
    <div className="country-list">
      <select className="country-dropdown">
        <option>Select Country</option>
        {props.CountryList.map((country) => (
          <option key={country.CountryCode} value={country.Slug}>
            {country.Country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
