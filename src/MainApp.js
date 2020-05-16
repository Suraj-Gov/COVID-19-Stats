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
    this.fetchGlobalSummary = this.fetchGlobalSummary.bind(this);
    this.locationFailed = this.locationFailed.bind(this);
    this.setLocation = this.setLocation.bind(this);
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
        window.navigator.geolocation.getCurrentPosition(
          this.setLocation,
          this.locationFailed
        );
      })
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  }

  setLocation(position) {
    const { latitude, longitude } = position.coords;
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?key=ceca709d7d3449c1a51ed2a6f62e7daf&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`
    )
      .then((res) => res.json())
      .then((res) => {
        const code = res.results[0].components.country_code.toUpperCase();
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
  }

  locationFailed() {
    this.setState({
      countryProv: "india",
      isLoaded: true,
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
