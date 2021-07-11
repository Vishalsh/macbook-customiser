import React from "react";
import { Component } from "./Component";

const Customiser = ({ configurableComponents }) => {
  return (
    <>
      {
        Object.keys(configurableComponents).map((component) => {
          return (
            <Component key={component} name={component} variants={configurableComponents[component]} />
          )
        })
      }
    </>
  )
}

export default Customiser;
