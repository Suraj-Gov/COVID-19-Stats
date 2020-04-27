import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TopCountries from "./topCountries";

const Main = () => {
  return (
    <div className="main-container">
      <h1 className="main-heading">COVID-19 Stats</h1>
      <h4 className="main-subtitle">
        A COVID-19 stats webapp that&#39;s updated automatically.
      </h4>
      <div id="country-container">
        <TopCountries />
      </div>
      <h4 className="scroll-subtitle">🢘 countries with highest impact 🢚</h4>
      <div className="footer">
        <h4 className="main-subtitle">
          <a href="https://github.com/Suraj-Gov/covid-19-stats">
            Link to the repo
          </a>
        </h4>
        <h4 className="main-subtitle">More features coming soon!</h4>
      </div>
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
