import React, { useState, useEffect } from 'react';

import Customiser from './components/Customiser';
import Summary from './components/Summary';
import Price from './components/Price';
import ApiStateHandler from './components/ApiStateHandler';
import { getCustomisableComponents } from '../service';
import useApiCallOnMount from './components/useApiCallOnMount';

const App = () => {
  const [configurableComponents, setConfigurableComponents] = useState({});
  const [loading, data, error] = useApiCallOnMount(getCustomisableComponents);

  useEffect(() => {
    if (data !== null) {
      setConfigurableComponents(data);
    }
  }, [data]);

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
              <ApiStateHandler loading={loading} error={error}>
                <h1 className="mt-0">Customise your 16‑inch MacBook Pro - Space Grey</h1>
                <Summary configurableComponents={configurableComponents} />
                <Customiser configurableComponents={configurableComponents} onSelectVariant={setSelectedVariant} />
              </ApiStateHandler>
            </section>
          </div>
        </div>
        <Price addOnPrice={getAddOnPrice()} />
      </main>
    </>
  );
}

export default App;
