import React, { Component } from "react";

//it's named Top16Countries because I didn't find India in the top 15 list, it was the 16th place when I coded this
//now when I'm commenting this, it's at 9th place, right behind Germany.
//things are getting worse here, but the govt and the people just don't care
//they are even talking about unlocking the country
// :(

class Top16Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: props.data,
      //the countries obj from the props
      top16Countries: null,
      //the top countries is set to null, because we don't know them initially
      detectedCountry: props.country,
      //the current location of the user
    };
    this.calcTop16Countries = this.calcTop16Countries.bind(this);
    //just a binder
  }

  componentDidMount() {
    this.calcTop16Countries();
    //when component is on page, calculate the top countries
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  calcTop16Countries() {
    let orderedCountries = this.state.countryList;
    //this is just a variable to house the countryList state
    orderedCountries.sort((a, b) => {
      if (a.TotalConfirmed > b.TotalConfirmed) {
        return -1;
      } else return 1;
    });
    //sorts the countryList based on the totalConfirmed values of the country
    const top16Countries = orderedCountries;
    //was: takes the first 16 countries from the sorted array
    //now: just gives the whole countryList
    //because I added a scrollable div
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
    //this is just a formatting code
    //the api returns a country with a typo, or with a really long country name
    //so we use this to just rename those countries
    //not required, but it's just for better readability
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
    //this is just a formatting code
    //the api returns a country with a typo, or with a really long country name
    //so we use this to just rename those countries
    //not required, but it's just for better readability
    this.setState({
      top16Countries: top16Countries,
      //sets the top countries
    });
  }

  render() {
    if (this.state.top16Countries == null) {
      return <h1>Calculating...</h1>;
      // if the countries are not yet decided for the top list
    } else {
      return (
        <div className="top-16-countries-list">
          <h1>Top Countries Affected</h1>
          <div className="top-country-scroll-list">
            {this.state.top16Countries.map((country, index) => {
              return (
                <ul key={country.Country}>
                  <div
                    className={
                      this.state.detectedCountry === country.Slug
                        ? "current-location"
                        : ""
                    }
                  >
                    <span className="position">{index + 1}</span>
                    <span className="country-name">{country.Country}</span>
                    <span className="case-count">
                      {this.numberWithCommas(country.TotalConfirmed)} cases
                    </span>
                    {/* the emojis just show the user's current location, if their country is in the top list */}
                  </div>
                </ul>
              );
            })}
          </div>
          <p>Scroll to view more countries</p>
        </div>
      );
    }
  }
}

//idk why I named this Top16Countries, this is bad way of naming components / variables

export default Top16Countries;
