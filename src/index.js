import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TopCountries from './topCountries';

const Main = () => {
  return (
    <div className="main-container">
      <h1 className="main-heading">COVID-19 Stats</h1>
      <div id="country-container">
        <TopCountries />
      </div>
    </div>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));