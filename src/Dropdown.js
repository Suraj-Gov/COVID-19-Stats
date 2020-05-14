import React, { useState, useEffect } from "react";
import SummaryTrio from "./SummaryTrio";

const Dropdown = (props) => {
  const [country, setCountry] = useState("");

  return (
    <div className="country-list">
      <select
        className="country-dropdown"
        onChange={(e) => setCountry(e.target.value)}
      >
        <option>Select Country</option>
        {props.CountryList.map((country) => (
          <option key={country.CountryCode} value={country.Slug}>
            {country.Country}
          </option>
        ))}
      </select>
      <h1>{country}</h1>
    </div>
  );
};

export default Dropdown;
