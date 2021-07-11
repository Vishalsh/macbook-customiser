import React from "react";

import './index.css';

export const Component = ({ name, variants }) => {
  return (
    <div>
      <h3>{name}</h3>
      {
        variants.map((c) => (
          <div key={`${name}_${c.serialNo}`} className={`variant ${c.selected ? "variant--selected" : ""}`}>
            <p className="variant__name">
              <strong>{c.variant}</strong>
            </p>
            {
              c.addOnPrice > 0 &&
              <p>+ ₹{c.addOnPrice}</p>
            }
          </div>
        ))
      }
    </div>
  )
}
