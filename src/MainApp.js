import React, { Component } from "react";
import SummaryTrio from "./SummaryTrio";
import Dropdown from "./Dropdown";
import Top16Countries from "./Top16Countries";
import Graph from "./Graph";

class MainApp extends Component {
  constructor() {
    super();
    this.state = {
      globalSummary: null,
      SUMMARY_URL: "https://api.covid19api.com/summary",
      countryList: null,
      isLoaded: false,
      error: null,
      countryProv: "",
    };
  }

  componentDidMount() {
    this.fetchGlobalSummary();
  }

  fetchGlobalSummary() {
    fetch(this.state.SUMMARY_URL)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then((resJSON) => {
        this.setState({
          globalSummary: resJSON.Global,
          countryList: resJSON.Countries,
          isLoaded: true,
        });
      })
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
    fetch("http://ip-api.com/json")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          countryProv: res.countryCode,
        });
      });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="main-panel">
          <h1>
            {this.state.error != null
              ? `${this.state.error.message}. Try reloading.`
              : "LOADING"}
          </h1>
        </div>
      );
    } else
      return (
        <div className="main-panel">
          <div className="global-summary">
            <SummaryTrio data={this.state.globalSummary} />
            <Graph Country={this.state.countryProv} />
          </div>
          <Top16Countries data={this.state.countryList} />
          {/* <Dropdown data={this.state.countryList} /> */}
        </div>
      );
  }
}

export default MainApp;
