import React, { Component } from "react";
// import CountryTrio from "./CountryTrio";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: null,
      countryList: props.data,
    };
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  handleCountryChange(event) {
    const { value: key } = event.target;
    this.setState({
      selectedCountry: key,
    });
  }

  render() {
    return (
      <div className="country-list">
        <select
          className="country-dropdown"
          onChange={(event) => this.handleCountryChange(event)}
        >
          <option>Select Country</option>
          {this.state.countryList.map((country) => (
            <option key={country.CountryCode} value={country.Slug}>
              {country.Country}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default Dropdown;
