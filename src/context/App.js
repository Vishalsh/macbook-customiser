import React, { useContext, useEffect, useMemo, useState } from 'react';

import Customiser from './components/Customiser';
import Summary from './components/Summary';
import Price from './components/Price';
import ApiStateHandler from './components/ApiStateHandler';
import { getCustomisableComponents } from '../service';
import { ConfigurableComponentsContext } from './components/ConfigurableComponentsContext';

const MainContent = () => {
  const { configurableComponents, loading, error } = useContext(ConfigurableComponentsContext);

  const getAddOnPrice = useMemo(() => {
    return Object.keys(configurableComponents).reduce((totalAddOnPrice, component) => {
      return totalAddOnPrice + configurableComponents[component].find(variant => variant.selected).addOnPrice
    }, 0);
  }, [configurableComponents]);

  return (
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
              <Customiser configurableComponents={configurableComponents} />
            </ApiStateHandler>
          </section>
        </div>
      </div>
      <Price addOnPrice={getAddOnPrice} />
    </main>
  );
}


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

  return (
    <ConfigurableComponentsContext.Provider value={{
      configurableComponents,
      setConfigurableComponents,
      loading,
      setLoading,
      error,
      setError
    }}>
      <header>
        <div className="header__content">
          <a className="header__link" href="https://www.apple.com/in/macbook-pro">
            <strong>MacBook Pro</strong>
          </a>
        </div>
      </header>
      <MainContent />
    </ConfigurableComponentsContext.Provider>
  );
}

export default App;
