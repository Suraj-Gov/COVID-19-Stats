import React, { Component } from "react";

class Top16Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: props.data,
      top16Countries: null,
      detectedCountry: props.country,
    };
    this.calcTop16Countries = this.calcTop16Countries.bind(this);
  }

  componentDidMount() {
    this.calcTop16Countries();
  }

  calcTop16Countries() {
    let orderedCountries = this.state.countryList;
    orderedCountries.sort((a, b) => {
      if (a.TotalConfirmed > b.TotalConfirmed) {
        return -1;
      } else return 1;
    });
    const top16Countries = orderedCountries.slice(0, 16);
    top16Countries.map((country) => {
      switch (country.Country) {
        case "Iran, Islamic Republic of":
          country.Country = "Iran";
          break;
        case "United States of America":
          country.Country = "USA";
          break;
        case "Holy See (Vatican City State)":
          country.Country = "Vatican City";
          break;
        case "Macedonia, Republic of":
          country.Country = "Macedonia";
          break;
        case "Taiwan, Republic of China":
          country.Country = "Taiwan";
          break;
        case "Tanzania, United Republic of":
          country.Country = "Tanzania";
          break;
        case "Venezuela (Bolivarian Republic)":
          country.Country = "Venezuela";
          break;
      }
      return country;
    });
    this.state.countryList.map((country) => {
      switch (country.Country) {
        case "Iran, Islamic Republic of":
          country.Country = "Iran";
          break;
        case "United States of America":
          country.Country = "USA";
          break;
        case "Holy See (Vatican City State)":
          country.Country = "Vatican City";
          break;
        case "Macedonia, Republic of":
          country.Country = "Macedonia";
          break;
        case "Taiwan, Republic of China":
          country.Country = "Taiwan";
          break;
        case "Tanzania, United Republic of":
          country.Country = "Tanzania";
          break;
        case "Venezuela (Bolivarian Republic)":
          country.Country = "Venezuela";
          break;
      }
      return country;
    });
    this.setState({
      top16Countries: top16Countries,
    });
  }

  render() {
    if (this.state.top16Countries == null) {
      return <h1>Calculating...</h1>;
    } else {
      return (
        <div className="top-16-countries-list">
          <h1>Top Countries Affected</h1>
          {this.state.top16Countries.map((country) => {
            return (
              <ul key={country.Country}>
                <div>
                  <span className="country-name">
                    {this.state.detectedCountry === country.CountryCode
                      ? `📍  `
                      : ""}
                    {country.Country}
                  </span>
                  <span className="case-count">
                    {this.state.detectedCountry === country.CountryCode
                      ? `👉   `
                      : ""}
                    {country.TotalConfirmed} cases
                  </span>
                </div>
              </ul>
            );
          })}
        </div>
      );
    }
  }
}

export default Top16Countries;
