import React, { useMemo, useContext } from "react";
import { getDefaultPrice } from "../../service";
import useApiCallOnMount from "./useApiCallOnMount";
import ApiStateHandler from "./ApiStateHandler";
import { ConfigurableComponentsContext } from './ConfigurableComponentsContext';

const Price = () => {
  const [loading, data, error] = useApiCallOnMount(getDefaultPrice);
  const { configurableComponents } = useContext(ConfigurableComponentsContext);

  const getAddOnPrice = useMemo(() => {
    return Object.keys(configurableComponents).reduce((totalAddOnPrice, component) => {
      return totalAddOnPrice + configurableComponents[component].find(variant => variant.selected).addOnPrice
    }, 0);
  }, [configurableComponents]);

  return (
    <div className="price container">
      <div className="price__content">
        <h1 className="price__value">
          Total:
          <ApiStateHandler loading={loading} error={error}>
            <span data-testid="total-price">{` ₹${data?.value + getAddOnPrice}`}</span>
          </ApiStateHandler>
        </h1>
      </div>
    </div>
  )
}

export default Price;