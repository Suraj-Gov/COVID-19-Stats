import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import "./normalize.css";
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
        <MainApp />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
