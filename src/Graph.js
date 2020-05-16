import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryProv: props.Country,
      givenCountry: props.givenCountry,
      isLoaded: false,
      graphData: {},
    };

    this.getCountryCaseStats = this.getCountryCaseStats.bind(this);
  }

  componentDidMount() {
    this.getCountryCaseStats();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.givenCountry !== this.props.givenCountry) {
      this.setState({
        givenCountry: this.props.givenCountry,
        isLoaded: false,
        graphData: {},
      });
      this.getCountryCaseStats();
    }
  }

  getCountryCaseStats() {
    // console.log(
    //   `https://api.covid19api.com/dayone/country/${
    //     this.state.countryProv === undefined
    //       ? this.state.givenCountry.Slug
    //       : this.state.countryProv
    //   }`
    // );

    fetch(
      `https://api.covid19api.com/dayone/country/${
        this.state.countryProv === undefined
          ? this.state.givenCountry.Slug
          : this.state.countryProv
      }`
    )
      .then((res) => res.json())
      .then((resJSON) => {
        const timeStamps = resJSON.map((i) => {
          let iDate = new Date(Date.parse(i.Date)).toString();
          return iDate.slice(4, 10);
        });
        const confirmedCases = resJSON.map((i) => {
          return i.Confirmed;
        });
        const activeCases = resJSON.map((i) => {
          return i.Active;
        });
        const recoveredCases = resJSON.map((i) => {
          return i.Recovered;
        });
        const deceasedCases = resJSON.map((i) => {
          return i.Deaths;
        });
        this.setState({
          isLoaded: true,
          graphData: {
            labels: timeStamps,
            datasets: [
              {
                label: `Confirmed Cases - ${
                  confirmedCases[confirmedCases.length - 1]
                }`,
                fill: false,
                lineTension: 1,
                backgroundColor: "",
                borderColor: "white",
                borderWidth: 3.5,
                data: confirmedCases,
                pointRadius: 0,
              },
              {
                label: `Active Cases - ${activeCases[activeCases.length - 1]}`,
                fill: false,
                lineTension: 1,
                backgroundColor: "",
                borderColor: "yellow",
                borderWidth: 2,
                data: activeCases,
                pointRadius: 0,
              },
              {
                label: `Recovered Cases - ${
                  recoveredCases[recoveredCases.length - 1]
                }`,
                fill: false,
                lineTension: 1,
                backgroundColor: "",
                borderColor: "green",
                borderWidth: 2,
                data: recoveredCases,
                pointRadius: 0,
              },
              {
                label: `Deceased Cases - ${
                  deceasedCases[deceasedCases.length - 1]
                }`,
                fill: false,
                lineTension: 1,
                backgroundColor: "",
                borderColor: "red",
                borderWidth: 2,
                data: deceasedCases,
                pointRadius: 0,
              },
            ],
          },
        });
      });
  }

  render() {
    if (this.state.isLoaded === false) {
      return (
        <div className="graph-container">
          <h1>Loading</h1>
        </div>
      );
    } else
      return (
        <div className="graph-container">
          <Line
            height={300}
            data={this.state.graphData}
            options={{
              legend: {
                labels: {
                  fontColor: "#eeeeee",
                  fontFamily: "Fira Sans",
                },
              },
              title: {
                display: true,
                fontFamily: "Fira Sans",
                text: `Cases in ${
                  this.state.countryProv === undefined
                    ? this.state.givenCountry.Country
                    : this.state.countryProv.charAt(0).toUpperCase() +
                      this.state.countryProv.slice(1)
                }`,
                fontColor: "#eeeeee",

                fontSize: 20,
              },
              scales: {
                yAxes: [
                  {
                    type: "logarithmic",
                    ticks: {
                      min: 0,
                      max: 1000000,
                      callback: function (value, index, values) {
                        if (value === 1000000) return "1M";
                        if (value === 100000) return "100K";
                        if (value === 10000) return "10K";
                        if (value === 1000) return "1K";
                        if (value === 100) return "100";
                        if (value === 10) return "10";
                        if (value === 0) return "0";
                        return null;
                      },
                    },
                  },
                ],
              },
            }}
          />
        </div>
      );
  }
}

export default Graph;
