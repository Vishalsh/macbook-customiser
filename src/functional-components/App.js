import React, { useState, useEffect } from 'react';

import Customiser from './components/Customiser';
import Summary from './components/Summary';
import Price from './components/Price';

import { getCustomisableComponents } from '../service';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [configurableComponents, setConfigurableComponents] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCustomisableComponents()
      .then((data) => {
        setConfigurableComponents(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  const setSelectedVariant = (component, variantSerialNo) => {
    setConfigurableComponents({
      ...configurableComponents,
      [component]: configurableComponents[component].map(variant => {
        return {
          ...variant,
          selected: variant.serialNo === variantSerialNo
        }
      })
    });
  }

  const getAddOnPrice = () => {
    return Object.keys(configurableComponents).reduce((totalAddOnPrice, component) => {
      return totalAddOnPrice + configurableComponents[component].find(variant => variant.selected).addOnPrice
    }, 0);
  }

  return (
    <>
      <header>
        <div className="header__content">
          <a className="header__link" href="https://www.apple.com/in/macbook-pro">
            <strong>MacBook Pro</strong>
          </a>
        </div>
      </header>
      <main>
        <div className="main__container">
          <div className="main__content">
            <section>
              <img className="macbook-img" alt="macbook pro" src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16touch-space-select-201911?wid=1808&hei=1686&fmt=jpeg&qlt=80&.v=1572825197207" />
            </section>
            <section className="configuration">
              {
                loading ?
                  <h1>loading...</h1>
                  :
                  error ?
                    <h1>Something went wrong. Please try again later</h1>
                    :
                    <>
                      <h1 className="mt-0">Customise your 16‑inch MacBook Pro - Space Grey</h1>
                      <Summary configurableComponents={configurableComponents} />
                      <Customiser configurableComponents={configurableComponents} onSelectVariant={setSelectedVariant} />
                    </>
              }
            </section>
          </div>
        </div>
        <Price addOnPrice={getAddOnPrice()} />
      </main>
    </>
  );
}

export default App;
