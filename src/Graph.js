import React, { Component } from "react";
import { Line } from "react-chartjs-2";
//this uses the chartjs module
//it's cool

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryProv: props.Country,
      //this is the country given from the current user location
      givenCountry: props.givenCountry,
      //this is the country given from the dropdown
      isLoaded: false,
      //state for data status
      graphData: {},
    };

    this.getCountryCaseStats = this.getCountryCaseStats.bind(this);
    //just binding the function
  }

  componentDidMount() {
    this.getCountryCaseStats();
  }
  //once the component is mounted, get the cases for the country set

  componentDidUpdate(prevProps, prevState) {
    if (prevState.givenCountry !== this.props.givenCountry) {
      //if the country prop is changed for the dropdown given country, then this code block runs
      this.setState({
        givenCountry: this.props.givenCountry,
        //the new dropdown country is set here
        isLoaded: false,
        //the loaded status is falsified, because the graph data is changed
        graphData: {},
        //graph data is set to empty
        countryProv: undefined,
        //the countryProv from the user location is set to undefined
      });
      this.getCountryCaseStats();
      //fetch the country details for the new selected country
    }
  }

  getCountryCaseStats() {
    fetch(
      `https://api.covid19api.com/total/dayone/country/${
        this.state.countryProv === undefined
          ? this.state.givenCountry.Slug
          : this.state.countryProv
      }`
    )
      //here it checks if the given country is the located country or the dropdown country,
      //and then fetches the json for the defined country
      .then((res) => res.json())
      .then((resJSON) => {
        const timeStamps = resJSON.map((i) => {
          let iDate = new Date(Date.parse(i.Date)).toString();
          return iDate.slice(4, 10);
        });
        //timestamps are taken from the country's data,
        //its converted to Date object, then stringified,
        //the stringified date is sent to the array,
        //the array date elements are in the form of month_date,
        //so to do this, the date string is just sliced
        const confirmedCases = resJSON.map((i) => {
          return i.Confirmed;
        });
        //confirmed cases are just mapped on to an array
        const activeCases = resJSON.map((i) => {
          return i.Active;
        });
        //acitve cases are just mapped on to an array
        const recoveredCases = resJSON.map((i) => {
          return i.Recovered;
        });
        //recovered cases are just mapped on to an array
        const deceasedCases = resJSON.map((i) => {
          return i.Deaths;
        });
        //deceased cases are just mapped on to an array
        this.setState({
          isLoaded: true,
          //after all the data is retrieved from the json, the loading state is set to true
          graphData: {
            labels: timeStamps,
            //the x axis labels
            datasets: [
              {
                label: `Confirmed Cases`,
                fill: false,
                lineTension: 1,
                backgroundColor: "",
                borderColor: "white",
                borderWidth: 3.5,
                data: confirmedCases,
                pointRadius: 0,
              },
              {
                label: `Active Cases`,
                fill: false,
                lineTension: 1,
                backgroundColor: "",
                borderColor: "yellow",
                borderWidth: 2,
                data: activeCases,
                pointRadius: 0,
              },
              {
                label: `Recovered Cases`,
                fill: false,
                lineTension: 1,
                backgroundColor: "",
                borderColor: "green",
                borderWidth: 2,
                data: recoveredCases,
                pointRadius: 0,
              },
              {
                label: `Deceased Cases`,
                fill: false,
                lineTension: 1,
                backgroundColor: "",
                borderColor: "red",
                borderWidth: 2,
                data: deceasedCases,
                pointRadius: 0,
              },
              //the graph lines are drawn here, with the standard labels and the colors for the lines
              //no fill colors, borderwidth is set to a small value, except for confirmed cases which is 3.5 for it
              //no points on the lines because it doesn't look good
            ],
          },
        });
      });
  }

  maxYSize(data) {
    const max = data[data.length - 1];
    for (let i = 1; i < max; i = i * 10) {
      if (i < max && max < i * 10) {
        console.log(i);
        return i * 10;
      }
    }
  }

  render() {
    if (this.state.isLoaded === false) {
      return (
        <div className="graph-container">
          <h1>Loading</h1>
        </div>
      );
    } else if (this.state.graphData.datasets[0].data == []) {
      return (
        <div className="graph-container">
          <h1>Whoops! No data found</h1>
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
                //the located country is set or the selected country is set
                fontColor: "#eeeeee",

                fontSize: 20,
              },
              scales: {
                yAxes: [
                  {
                    type: "logarithmic",
                    ticks: {
                      min: 0,
                      max: this.maxYSize(this.state.graphData.datasets[0].data),
                      callback: function (value) {
                        if (value === 10000000) return "10M";
                        if (value === 1000000) return "1M";
                        if (value === 100000) return "100K";
                        if (value === 10000) return "10K";
                        if (value === 1000) return "1K";
                        if (value === 100) return "100";
                        if (value === 10) return "10";
                        if (value === 0) return "0";
                        return null;
                        //y axis value ticks for log graph type
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

//the sizing of the graph component is a bit tough to understand and implement for both mobiles and desktops

export default Graph;
