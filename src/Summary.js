import React, { useState, useEffect } from "react";
// import SummaryChart from "./SummaryChart";
const SUMMARY_URL = "https://api.covid19api.com/summary";

const Summary = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [summaryStats, setSummaryStats] = useState([]);
  const [allCountryStats, setAllCountryStats] = useState([]);
  const todayDate = new Date();

  useEffect(() => {
    fetch(SUMMARY_URL)
      .then((res) => res.json()) //received json
      .then((receivedJSON) => {
        setIsLoaded(true);
        setSummaryStats(receivedJSON.Global);
        setAllCountryStats(receivedJSON.Countries);
      });
  }, []);

  //return code goes here

  if (!isLoaded)
    return (
      <div className="summary-container">
        <h1>Loading</h1>
      </div>
    );
  else
    return (
      <div className="summary-container">
        <p className="date">{`${todayDate.getDate()}/${
          todayDate.getMonth() + 1
        }/${todayDate.getFullYear()}`}</p>
        <div className="confirmed">
          <p className="total">Confirmed: {summaryStats.TotalConfirmed}</p>
          <p className="new">+{summaryStats.NewConfirmed}</p>
        </div>
        <div className="recovered">
          <p className="total">Recovered: {summaryStats.TotalRecovered}</p>
          <p className="new">+{summaryStats.NewRecovered}</p>
        </div>
        <div className="deceased">
          <p className="total">Deceased: {summaryStats.TotalDeaths}</p>
          <p className="new">+{summaryStats.NewDeaths}</p>
        </div>
        <div className="countryList">
          <select className="country-dropdown">
            <option>Select Country</option>
            {allCountryStats.map((country) => (
              <option key={country.CountryCode} value={country.Slug}>
                {country.Country}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
};

export default Summary;
