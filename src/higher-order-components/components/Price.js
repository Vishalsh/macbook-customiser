import React from "react";
import { getDefaultPrice } from "../../service";
import withApiCallOnMount from "./withApiCallOnMount";

const Price = ({ addOnPrice, loading, data }) => {
  return (
    <div className="price container">
      <div className="price__content">
        <h1 className="price__value">
          Total:
          {
            loading ?
              <>{` loading...`}</>
              :
              <span data-testid="total-price">{` ₹${data?.value + addOnPrice}`}</span>
          }
        </h1>
      </div>
    </div>
  )
};

export default withApiCallOnMount(Price, getDefaultPrice);