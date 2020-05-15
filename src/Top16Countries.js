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
    const orderedCountries = this.state.countryList.sort((a, b) => {
      if (a.TotalConfirmed > b.TotalConfirmed) {
        return -1;
      } else return 1;
    });
    const top16Countries = orderedCountries.slice(0, 16);
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
                      ? `👉  `
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