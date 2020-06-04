import React, { Component } from "react";

class CountryTrio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: props.country,
      continent: props.continent,
      population: props.population,
      language: props.language,
      //just states for the props passed down
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.country !== this.props.country) {
      this.setState({
        country: this.props.country,
        continent: this.props.continent,
        population: this.props.population,
        language: this.props.language,
      });
      //if the selected country is changed, the data is updated with the updated props
    }
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    return (
      <div className="country-trio">
        <div className="country-details">
          <div className="image-container">
            <img
              src={
                "https://www.countryflags.io/" +
                this.state.country.CountryCode +
                "/flat/64.png"
              }
              alt={this.state.country.Country}
              // here the img of the given country's flag is set
              // pretty nifty
            />
          </div>
          <p className="name">{this.state.country.Country}</p>
          <p className="continent">{this.state.continent}</p>
          <p className="language">Language: {this.state.language}</p>
          <p className="population">
            Population: {this.numberWithCommas(this.state.population)}
          </p>
          <p className="affected">
            Affected Population:{" "}
            {(
              (this.state.country.TotalConfirmed / this.state.population) *
              100
            ).toFixed(3)}
            %
          </p>
        </div>
        <div className="country-specific-stats">
          <div className="confirmed">
            <p className="heading">Confirmed</p>
            <p className="total">
              {this.numberWithCommas(this.state.country.TotalConfirmed)}
            </p>
            <p className="new">
              <span className="plus">TODAY</span>
              {this.numberWithCommas(this.state.country.NewConfirmed)}
            </p>
          </div>
          <div className="recovered">
            <p className="heading">Recovered</p>
            <p className="total">
              {this.numberWithCommas(this.state.country.TotalRecovered)}
            </p>
            <p className="new">
              <span className="plus">TODAY</span>
              {this.numberWithCommas(this.state.country.NewRecovered)}
            </p>
          </div>
          <div className="deceased">
            <p className="heading">Deceased</p>
            <p className="total">
              {this.numberWithCommas(this.state.country.TotalDeaths)}
            </p>
            <p className="new">
              <span className="plus">TODAY</span>
              {this.numberWithCommas(this.state.country.NewDeaths)}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

//this is similar to the global stats thing, but this one displays more information and is specified to the country

export default CountryTrio;
