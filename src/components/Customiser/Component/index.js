import React from "react";

import './index.css';

const Variant = ({ variant, addOnPrice }) => {
  return (
    <>
      <p className="variant__name">
        <strong>{variant}</strong>
      </p>
      {
        addOnPrice > 0 &&
        <p>+ ₹{addOnPrice}</p>
      }
    </>
  )
}

export const Component = ({ name, variants, onSelectVariant }) => {
  const onSelect = (serialNo) => () => {
    onSelectVariant(name, serialNo);
  }

  return (
    <div>
      <h3>{name}</h3>
      <ul>
        {
          variants.map((v) => (
            <li
              key={`${name}_${v.serialNo}`}
              className={`variant ${v.selected ? "variant--selected" : ""}`}
              data-testid={`${name}_${v.serialNo}`}
              onClick={onSelect(v.serialNo)}>
              <Variant variant={v.variant} addOnPrice={v.addOnPrice} />
            </li>
          ))
        }
      </ul>
    </div>
  )
}
