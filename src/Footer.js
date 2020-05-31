import React, { Component } from "react";

class Footer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="footer">
        <p className="main-subtitle">
          <a href="https://github.com/Suraj-Gov/covid-19-stats/tree/master">
            Link to the repo
          </a>
        </p>
      </div>
    );
  }
}

//self explainatory footer component

export default Footer;
