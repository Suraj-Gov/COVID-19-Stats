import React, { Component } from "react";

class Header extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="top-header">
        <h1 className="main-heading">COVID-19 Stats</h1>
        <h4 className="main-subtitle">Realtime Stats</h4>
      </div>
    );
  }
}

//self explainatory header component

export default Header;
