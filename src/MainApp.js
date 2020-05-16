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
        });
        fetch("http://ip-api.com/json")
          .then((res) => res.json())
          .then((res) => {
            const code = res.countryCode;
            const slug = this.state.countryList.filter((country) => {
              if (country.CountryCode === code) {
                return country.Slug;
              }
            });
            this.setState({
              countryProv: slug[0].Slug,
              isLoaded: true,
            });
          });
      })
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="main-panel">
          <h1>
            {this.state.error != null
              ? `🙄 ${this.state.error.message}. Try reloading.`
              : "LOADING"}
          </h1>
        </div>
      );
    } else
      return (
        <div className="main-panel">
          <h3>
            (You are in{" "}
            {this.state.countryProv.charAt(0).toUpperCase() +
              this.state.countryProv.slice(1)}
            )
          </h3>
          <div className="global-summary">
            <SummaryTrio data={this.state.globalSummary} />
            <Graph Country={this.state.countryProv} />
          </div>
          <Top16Countries
            data={this.state.countryList}
            country={this.state.countryProv}
          />
          <Dropdown data={this.state.countryList} />
        </div>
      );
  }
}

export default MainApp;
