import Customiser from './components/Customiser';
import Summary from './components/Summary';
import Price from './components/Price';

import './App.css';

function App() {
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
        <div className="main__content">
          <img className="macbook-img" alt="macbook pro" src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16touch-space-select-201911?wid=1808&hei=1686&fmt=jpeg&qlt=80&.v=1572825197207" />
          <div>
            <Summary />
            <Customiser />
          </div>
        </div>
        <Price />
      </main>
    </>
  );
}

export default App;
