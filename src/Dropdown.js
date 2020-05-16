import React, { Component } from "react";
import CountryTrio from "./CountryTrio";
import Graph from "./Graph";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: props.data,
      continent: null,
      population: null,
      subregion: null,
      language: null,
      selectedCountry: null,
    };
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  componentDidUpdate() {
    this.state.countryList.sort((a, b) => {
      if (a.Country > b.Country) {
        return 1;
      } else return -1;
    });
  }

  handleCountryChange(event) {
    const { value } = event.target;
    if (value === "no-select") {
      this.setState({
        continent: null,
        population: null,
        subregion: null,
        selectedCountry: null,
        language: null,
      });
    } else {
      let selectedCountry = this.state.countryList.filter((country) => {
        if (country.Slug === value) {
          return country;
        }
      });
      selectedCountry = selectedCountry[0];
      fetch(
        `https://restcountries.eu/rest/v2/alpha/${selectedCountry.CountryCode}`
      )
        .then((res) => res.json())
        .then((resJSON) => {
          console.log();
          this.setState({
            continent: resJSON.region,
            population: resJSON.population,
            subregion: resJSON.subregion,
            language: resJSON.languages[0].name,
            selectedCountry: selectedCountry,
          });
        });
    }
  }

  render() {
    return (
      <div className="country-list">
        <select
          className="country-dropdown"
          onChange={(event) => this.handleCountryChange(event)}
        >
          <option value="no-select">Select Country</option>
          {this.state.countryList.map((country) => (
            <option key={country.CountryCode} value={country.Slug}>
              {country.Country}
            </option>
          ))}
        </select>
        {this.state.selectedCountry != null ? (
          <div className="selected-country-div">
            <CountryTrio
              country={this.state.selectedCountry}
              continent={this.state.continent}
              population={this.state.population}
              subregion={this.state.subregion}
              language={this.state.language}
            />
            <Graph givenCountry={this.state.selectedCountry} />
          </div>
        ) : null}
        <h3>
          {this.state.selectedCountry == null
            ? "Select a country to view it's stats"
            : ""}
        </h3>
      </div>
    );
  }
}

export default Dropdown;
