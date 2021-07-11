import React from 'react';

import Customiser from './components/Customiser';
import Summary from './components/Summary';
import Price from './components/Price';

import { getCustomisableComponents } from '../service';

const initialState = {
  loading: false,
  configurableComponents: {},
  error: null
}

class App extends React.Component {
  state = initialState;

  componentDidMount() {
    this.setState({ loading: true });
    getCustomisableComponents()
      .then((data) => {
        this.setState({ configurableComponents: data })
      })
      .catch((error) => {
        this.setState(error)
      })
      .finally(() => {
        this.setState({ loading: false });
      })
  }

  setSelectedVariant = (component, variantSerialNo) => {
    this.setState({
      configurableComponents: {
        ...this.state.configurableComponents,
        [component]: this.state.configurableComponents[component].map(variant => {
          return {
            ...variant,
            selected: variant.serialNo === variantSerialNo
          }
        })
      }
    });
  }

  getAddOnPrice = () => {
    const { configurableComponents } = this.state;

    return Object.keys(configurableComponents).reduce((totalAddOnPrice, component) => {
      return totalAddOnPrice + configurableComponents[component].find(variant => variant.selected).addOnPrice
    }, 0);
  }

  render() {
    const { loading, configurableComponents } = this.state;

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
                    <>
                      <h1 className="mt-0">Customise your 16‑inch MacBook Pro - Space Grey</h1>
                      <Summary configurableComponents={configurableComponents} />
                      <Customiser configurableComponents={configurableComponents} onSelectVariant={this.setSelectedVariant} />
                    </>
                }
              </section>
            </div>
          </div>
          <Price addOnPrice={this.getAddOnPrice()} />
        </main>
      </>
    );
  }
}

export default App;
