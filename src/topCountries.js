import React from "react";
import Country from "./Country";

const topCountries = [
  "united-states",
  "spain",
  "italy",
  "france",
  "germany",
  "united-kingdom",
  "turkey",
  "iran",
  "china",
  "russia",
  "brazil",
  "canada",
  "belgium",
  "netherlands",
  "switzerland",
  "peru",
  "india",
];

const TopCountryList = () => {
  const list = [];
  for (let i = 0; i < topCountries.length; i++) {
    list.push(<Country country={topCountries[i]} key={i} />);
  }
  return <div id="country-container">{list}</div>;
};

export default TopCountryList;
