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
      //global object from the json
      SUMMARY_URL: "https://api.covid19api.com/summary",
      //the summary url
      countryList: null,
      //extracted countryList from the json, has both the country name and the stats
      isLoaded: false,
      //initially set to false, is set to true when page is completely loaded
      error: null,
      //error encountered when fetching
      countryProv: "",
      //current country the user is located
    };
    this.fetchGlobalSummary = this.fetchGlobalSummary.bind(this);
    this.locationFailed = this.locationFailed.bind(this);
    this.setLocation = this.setLocation.bind(this);
    //just binders so that these functions can change states
  }

  componentDidMount() {
    this.fetchGlobalSummary();
  }
  //when first mounted, fetch the data

  fetchGlobalSummary() {
    fetch(this.state.SUMMARY_URL)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          throw Error(res.statusText);
          //throws an error for us to catch it
        }
      })
      .then((resJSON) => {
        this.setState({
          globalSummary: resJSON.Global,
          countryList: resJSON.Countries,
          //the global and countryList states are set here from the json
        });
        window.navigator.geolocation.getCurrentPosition(
          this.setLocation, //position is passed here implicitly
          this.locationFailed
        );
        //after setting the required states, the browser asks the user's location permission
      })
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
    //if any error is thrown, this sets the error state
  }

  setLocation(position) {
    const { latitude, longitude } = position.coords;
    //extracting the lats and longs from the given position
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?key=ceca709d7d3449c1a51ed2a6f62e7daf&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`
    )
      //given coords are sent to the api and it returns a json
      .then((res) => res.json())
      .then((res) => {
        const code = res.results[0].components.country_code.toUpperCase();
        //country's iso2 code is extracted
        const slug = this.state.countryList.filter((country) => {
          if (country.CountryCode === code) {
            return country.Slug;
          }
        });
        //from the country code returned from the api, the slug is found.
        //the countryList is used to find the slug, then it's returned.
        this.setState({
          countryProv: slug[0].Slug,
          //the weird thing is, the returned slug is in an array, with only the slug, and nothing else
          //so we extract the slug and set it to countryProv, which is the current location of user
          isLoaded: true,
          //when everything is loaded
        });
      });
  }

  locationFailed() {
    this.setState({
      countryProv: "india",
      isLoaded: true,
    });
  }
  //if the user denies the location permission, the countryProv is set to INDIA by default
  //because the majority of my userbase is from INDIA
  //and it sets the loaded state to true, to load the page

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="main-panel">
          <h1>
            {this.state.error != null
              ? `🙄 ${this.state.error.message}. Try reloading.`
              : "LOADING"}
          </h1>
          {/* if the page is not yet loaded, then it shows LOADING
              if the page encounters an error, it's displayed here
              if everything goes alright, this div vanishes and shows the main content */}
        </div>
      );
    } else
      return (
        <div className="main-panel">
          <div className="global-summary">
            <SummaryTrio data={this.state.globalSummary} />
            {/* this is for the summary trio for global summary
                takes in the global summary object */}
            <Graph Country={this.state.countryProv} />
            {/* the graph for current location
                takes in just the countryProv (name) */}
          </div>
          <Top16Countries
            data={this.state.countryList}
            country={this.state.countryProv}
          />
          {/* here the countryList and the current country is passed,
              in the list, the current country is shown with a pin,
              the countryList is used to rank the top countries */}
          <Dropdown data={this.state.countryList} />
          {/* just takes in the countryList and then makes a dropdown from it */}
        </div>
      );
  }
}

export default MainApp;
