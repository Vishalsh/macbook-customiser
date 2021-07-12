import React from "react";
import { getDefaultPrice } from "../../service";

const initialState = {
  loading: false,
  price: 0,
  error: null
}

class Price extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.setState({ loading: true });
    getDefaultPrice()
      .then((data) => {
        this.setState({ price: data.value })
      })
      .catch((error) => {
        this.setState({ error })
      })
      .finally(() => {
        this.setState({ loading: false });
      })
  }

  render() {
    const { loading, price } = this.state;
    const { addOnPrice } = this.props;

    return (
      <div className="price container">
        <div className="price__content">
          <h1 className="price__value">
            Total:
            {
              loading ?
                <>{` loading...`}</>
                :
                <span data-testid="total-price">{` ₹${price + addOnPrice}`}</span>
            }
          </h1>
        </div>
      </div>
    )
  }
}

export default Price;