import React from "react";
import { getDefaultPrice } from "../../service";
import useApiCallOnMount from "./useApiCallOnMount";
import ApiStateHandler from "./ApiStateHandler";

const Price = ({ addOnPrice }) => {
  const [loading, data, error] = useApiCallOnMount(getDefaultPrice);

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
}

export default Price;