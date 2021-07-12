import React from "react";
import { getDefaultPrice } from "../../service";
import ApiStateHandler from "./ApiStateHandler";
import withApiCallOnMount from "./withApiCallOnMount";

const Price = ({ addOnPrice, loading, data, error }) => {
  return (
    <div className="price container">
      <div className="price__content">
        <h1 className="price__value">
          Total:
          <ApiStateHandler loading={loading} error={error}>
            <span data-testid="total-price">{` ₹${data?.value + addOnPrice}`}</span>
          </ApiStateHandler>
        </h1>
      </div>
    </div>
  )
};

export default withApiCallOnMount(Price, getDefaultPrice);