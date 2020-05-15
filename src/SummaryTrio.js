import React, { Component } from "react";

class SummaryTrio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalStats: props.data,
    };
  }
  render() {
    return (
      <div className="summary-trio">
        <div className="confirmed">
          <p className="heading">Confirmed</p>
          <p className="total">{this.state.globalStats.TotalConfirmed}</p>
          <p className="new">
            <span className="plus">TODAY</span>
            {this.state.globalStats.NewConfirmed}
          </p>
        </div>
        <div className="recovered">
          <p className="heading">Recovered</p>
          <p className="total">{this.state.globalStats.TotalRecovered}</p>
          <p className="new">
            <span className="plus">TODAY</span>
            {this.state.globalStats.NewRecovered}
          </p>
        </div>
        <div className="deceased">
          <p className="heading">Deceased</p>
          <p className="total">{this.state.globalStats.TotalDeaths}</p>
          <p className="new">
            <span className="plus">TODAY</span>
            {this.state.globalStats.NewDeaths}
          </p>
        </div>
      </div>
    );
  }
}

export default SummaryTrio;
