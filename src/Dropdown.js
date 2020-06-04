import React, { Component } from "react";
import CountryTrio from "./CountryTrio";
import Graph from "./Graph";
//graph is used here, to show the selected country

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: props.data,
      //the countryList for the names of the countries
      continent: null,
      //the selected country's continent
      population: null,
      //the selected country's population
      subregion: null,
      //the selected country's subregion
      language: null,
      //the selected country's language
      selectedCountry: null,
      //the country selected from the dropdown
    };
    this.handleCountryChange = this.handleCountryChange.bind(this);
    //just a binder
  }

  componentDidUpdate() {
    this.state.countryList.sort((a, b) => {
      if (a.Country > b.Country) {
        return 1;
      } else return -1;
    });
  }
  //this wouldn't need to be here, but it need to because of a bug which I couldn't remove
  //the first time the page loads, the dropdown is in a alphabetic order
  //the user can normally select the country they require
  //but if the user wants to select a different country,
  //the dropdown contents are sorted based on the confirmed count of countries
  //to counter this, if the countryList is sorted abnormally, this sorts it alphabetically
  //it's a hack, but I can't trace the bug for now.

  handleCountryChange(event) {
    const { value } = event.target;
    //if the user selects a country, the event is triggered,
    //the event value is extracted
    if (value === "no-select") {
      //if the value is just a unselect, it sets all states to null, and then removes the graph and countryTrio
      this.setState({
        continent: null,
        population: null,
        subregion: null,
        selectedCountry: null,
        language: null,
      });
    } else {
      //if the country is a different selected country, then the value of the new select is taken
      //the value is a slug of the country
      //it's used to get the details of the country
      let selectedCountry = this.state.countryList.filter((country) => {
        if (country.Slug === value) {
          return country;
        }
      });
      selectedCountry = selectedCountry[0];
      //as I said, it returns a single element array xD
      fetch(
        `https://restcountries.eu/rest/v2/alpha/${selectedCountry.CountryCode}`
      )
        .then((res) => res.json())
        .then((resJSON) => {
          //this fetches the selected country's details from an api
          this.setState({
            continent: resJSON.region,
            population: resJSON.population,
            subregion: resJSON.subregion,
            language: resJSON.languages[0].name,
            selectedCountry: selectedCountry,
          });
        });
      //details are set here
    }
  }

  render() {
    return (
      <div className="country-list">
        <select
          className="country-dropdown"
          onChange={(event) => this.handleCountryChange(event)}
          onBlur={(event) => this.handleCountryChange(event)}
        >
          <option value="no-select">Select Country</option>
          {/* this is valued as no-select to allow the user to unselect their country choice */}
          {this.state.countryList.map((country) => (
            <option key={country.CountryCode} value={country.Slug}>
              {country.Country}
            </option>
          ))}
          {/* the country names are mapped to a option tag and then fed here as an array in the select tag */}
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
            {/* a countryTrio is set here with the selected country props */}
            <Graph givenCountry={this.state.selectedCountry} />
            {/* the graph for the selected country is set here */}
          </div>
        ) : null}
        <h3>
          {this.state.selectedCountry == null
            ? "Select a country to view it's stats"
            : ""}
        </h3>
      </div>
      // if there's no country selected, then it has a text saying the user to use the dropdown
    );
  }
}

export default Dropdown;
