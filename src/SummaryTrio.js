import React, { Component } from "react";

class SummaryTrio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalStats: props.data,
    };
    //only needs the globalStats
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  render() {
    return (
      <div className="summary-trio">
        <div className="confirmed">
          <p className="heading">Confirmed</p>
          <p className="total">
            {this.numberWithCommas(this.state.globalStats.TotalConfirmed)}
          </p>
          <p className="new">
            <span className="plus">TODAY</span>
            {this.numberWithCommas(this.state.globalStats.NewConfirmed)}
          </p>
        </div>
        <div className="recovered">
          <p className="heading">Recovered</p>
          <p className="total">
            {this.numberWithCommas(this.state.globalStats.TotalRecovered)}
          </p>
          <p className="new">
            <span className="plus">TODAY</span>
            {this.numberWithCommas(this.state.globalStats.NewRecovered)}
          </p>
        </div>
        <div className="deceased">
          <p className="heading">Deceased</p>
          <p className="total">
            {this.numberWithCommas(this.state.globalStats.TotalDeaths)}
          </p>
          <p className="new">
            <span className="plus">TODAY</span>
            {this.numberWithCommas(this.state.globalStats.NewDeaths)}
          </p>
        </div>
      </div>
    );
  }
}

//it just takes in the data from the globalStats state passed from the parent component

export default SummaryTrio;
