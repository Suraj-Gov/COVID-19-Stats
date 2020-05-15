import React, { Component } from "react";

class Footer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="footer">
        <h4 className="main-subtitle">
          <a href="https://github.com/Suraj-Gov/covid-19-stats">
            Link to the repo
          </a>
        </h4>
        <h4 className="main-subtitle">More features coming soon!</h4>
      </div>
    );
  }
}

export default Footer;
