import React from "react";
import { Component } from "./Component";

const Customiser = ({ configurableComponents, onSelectVariant }) => {
  return (
    <>
      {
        Object.keys(configurableComponents).map((component) => {
          return (            
            <Component
              key={component}
              name={component}
              variants={configurableComponents[component]}
              onSelectVariant={onSelectVariant}
            />
          )
        })
      }
    </>
  )
}

export default Customiser;
