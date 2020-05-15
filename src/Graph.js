import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detectedCountryLatitude: null,
      detectedCountryLongitude: null,
      countryProv: props.Country,
      isLoaded: false,
      graphData: {},
    };

    this.getCountryCaseStats = this.getCountryCaseStats.bind(this);
  }

  componentDidMount() {
    this.getCountryCaseStats();
  }

  getCountryCaseStats() {
    fetch(
      `https://api.covid19api.com/dayone/country/${this.state.countryProv}/status/confirmed`
    )
      .then((res) => res.json())
      .then((resJSON) => {
        const timeStamps = resJSON.map((i) => {
          let iDate = new Date(Date.parse(i.Date)).toString();
          return iDate.slice(4, 10);
        });
        const cases = resJSON.map((i) => {
          return i.Cases;
        });
        this.setState({
          isLoaded: true,
          graphData: {
            labels: timeStamps,
            datasets: [
              {
                label: `Confirmed Cases - ${cases[cases.length - 1]}`,
                fill: false,
                lineTension: 1,
                backgroundColor: "",
                borderColor: "#3e95cd",
                borderWidth: 3.5,
                data: cases,
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
        <div>
          <h1>Loading</h1>
        </div>
      );
    } else if (this.state.isLoaded === true)
      return (
        <div className="graph-container">
          <Line
            height={300}
            data={this.state.graphData}
            options={{
              title: {
                display: true,
                fontFamily: "Fira Sans",
                text: "Cases in your country",
                fontSize: 20,
              },
            }}
          />
        </div>
      );
  }
}

export default Graph;