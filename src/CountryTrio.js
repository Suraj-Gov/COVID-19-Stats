import React, { Component } from "react";

class CountryTrio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: props.country,
      continent: props.continent,
      population: props.population,
      subregion: props.subregion,
      language: props.language,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.country !== this.props.country) {
      this.setState({
        country: this.props.country,
        continent: this.props.continent,
        population: this.props.population,
        subregion: this.props.subregion,
        language: this.props.language,
      });
    }
  }

  render() {
    // if (this.state.country == null || this.state.isLoaded == false) {
    //   return <h3>Select a country to get it's summary</h3>;
    // } else {
    return (
      <div className="country-trio">
        <div className="country-details">
          <img
            src={
              "https://www.countryflags.io/" +
              this.state.country.CountryCode +
              "/flat/64.png"
            }
            alt={this.state.country.Country}
          />
          <p className="name">{this.state.country.Country}</p>
          <p className="continent">{this.state.continent}</p>
          <p className="subregion">{this.state.subregion}</p>
          <p className="language">Native Language: {this.state.language}</p>
          <p className="population">Population: {this.state.population}</p>
          <p className="affected">
            Affected Population:
            {`${this.state.country.TotalConfirmed} ${this.state.population} ${this.state.country.CountryCode}`}
            {(
              (this.state.country.TotalConfirmed / this.state.population) *
              100
            ).toFixed(7)}
            %
          </p>
        </div>
        <div className="confirmed">
          <p className="heading">Confirmed</p>
          <p className="total">{this.state.country.TotalConfirmed}</p>
          <p className="new">
            <span className="plus">TODAY</span>
            {this.state.country.NewConfirmed}
          </p>
        </div>
        <div className="recovered">
          <p className="heading">Recovered</p>
          <p className="total">{this.state.country.TotalRecovered}</p>
          <p className="new">
            <span className="plus">TODAY</span>
            {this.state.country.NewRecovered}
          </p>
        </div>
        <div className="deceased">
          <p className="heading">Deceased</p>
          <p className="total">{this.state.country.TotalDeaths}</p>
          <p className="new">
            <span className="plus">TODAY</span>
            {this.state.country.NewDeaths}
          </p>
        </div>
      </div>
    );
  }
}

export default CountryTrio;