import React from "react";

const SummaryTrio = (props) => {
  return (
    <div className="summary-trio">
      <div className="confirmed">
        <p className="heading">Confirmed</p>
        <p className="total">{props.TotalConfirmed}</p>
        <p className="new">
          <span className="plus">NEW</span>
          {props.NewConfirmed}
        </p>
      </div>
      <div className="recovered">
        <p className="heading">Recovered</p>
        <p className="total">{props.TotalRecovered}</p>
        <p className="new">
          <span className="plus">NEW</span>
          {props.NewRecovered}
        </p>
      </div>
      <div className="deceased">
        <p className="heading">Deceased</p>
        <p className="total">{props.TotalDeaths}</p>
        <p className="new">
          <span className="plus">NEW</span>
          {props.NewDeaths}
        </p>
      </div>
    </div>
  );
};

export default SummaryTrio;
