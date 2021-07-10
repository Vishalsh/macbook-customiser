import React from "react";

import './index.css';

class Price extends React.Component {
  render() {
    return (
      <div className="price container">
        <div className="price__content">
          <h1 className="price__value">Total: </h1>
        </div>
      </div>
    )
  }
}

export default Price;