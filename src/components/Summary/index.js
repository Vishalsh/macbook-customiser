import React from "react";

const Summary = ({ configurableComponents }) => {
  return (
    <>
      {
        Object.keys(configurableComponents).map((component) => (
          <p key={`${component}_${component.serialNo}`}>{configurableComponents[component].find(c => c.selected).variant}</p>
        ))
      }
    </>
  )
}

export default Summary;
