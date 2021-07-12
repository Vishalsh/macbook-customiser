import React from "react";

const withApiCallOnMount = (Component, service) => {

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        data: null,
        error: null,
      };
    }
    componentDidMount() {
      this.setState({ loading: true });
      service()
        .then((data) => {
          this.setState({ data })
        })
        .catch((error) => {
          this.setState({ error })
        })
        .finally(() => {
          this.setState({ loading: false });
        })
    }

    render() {
      const { loading, data, error } = this.state;

      return (
        <Component {...this.props} loading={loading} data={data} erro={error} />
      )
    }
  }
}

export default withApiCallOnMount;