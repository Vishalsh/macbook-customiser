import React from "react";

class Variant extends React.PureComponent {
  render() {
    const { variant, addOnPrice } = this.props;

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
}

export const Component = ({ name, variants, onSelectVariant }) => {
  const onSelect = (serialNo) => () => {
    onSelectVariant(name, serialNo);
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
