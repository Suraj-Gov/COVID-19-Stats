import React from "react";
import ReactDOM from "react-dom";
// import "./normalize.css";

import "./index.css";

import Header from "./Header";
import MainApp from "./MainApp";
import Footer from "./Footer";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="main-container">
        <Header />
        {/* the upper header element */}
        <MainApp />
        {/* the main guts of the webapp */}
        <Footer />
        {/* just a normal footer, linking to the repo */}
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
