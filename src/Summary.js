import React, { useState, useEffect } from "react";
import SummaryTrio from "./SummaryTrio";
import Dropdown from "./Dropdown";
// import SummaryChart from "./SummaryChart";
const SUMMARY_URL = "https://api.covid19api.com/summary";

const Summary = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [summaryStats, setSummaryStats] = useState([]);
  const [allCountryStats, setAllCountryStats] = useState([]);
  // const todayDate = new Date();

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
        {/* <p className="date">{`${todayDate.getDate()}/${
          todayDate.getMonth() + 1
        }/${todayDate.getFullYear()}`}</p> */}
        <SummaryTrio
          TotalConfirmed={summaryStats.TotalConfirmed}
          NewConfirmed={summaryStats.NewConfirmed}
          TotalRecovered={summaryStats.TotalRecovered}
          NewRecovered={summaryStats.NewRecovered}
          TotalDeaths={summaryStats.TotalDeaths}
          NewDeaths={summaryStats.NewDeaths}
        />
        <Dropdown CountryList={allCountryStats} />
      </div>
    );
};

export default Summary;
