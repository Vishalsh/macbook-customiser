import React, { useContext } from "react";
import { ConfigurableComponentsContext } from './ConfigurableComponentsContext';

const Variant = React.memo(({ variant, addOnPrice }) => {
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
})

export const Component = ({ name, variants }) => {
  const { configurableComponents, setConfigurableComponents } = useContext(ConfigurableComponentsContext);

  const onSelect = (serialNo) => () => {
    setConfigurableComponents({
      ...configurableComponents,
      [name]: configurableComponents[name].map(variant => {
        return {
          ...variant,
          selected: variant.serialNo === serialNo
        }
      })
    });
  }

  return (
    <div className="component">
      <h3 className="component__name">{name}</h3>
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

const Customiser = () => {
  const { configurableComponents } = useContext(ConfigurableComponentsContext);

  return (
    <>
      {
        Object.keys(configurableComponents).map((component) => {
          return (
            <Component
              key={component}
              name={component}
              variants={configurableComponents[component]}
            />
          )
        })
      }
    </>
  )
}

export default Customiser;
