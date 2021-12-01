import React from "react";

const apiStatus = {
  loading: 'loading',
  complete: 'complete',
  errored: 'errored'
}

const withApiCallOnMount = (Component, service) => {

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        status: apiStatus.loading,
        data: null,
      };
    }
    componentDidMount() {
      service()
        .then((data) => {
          this.setState({ data, status: apiStatus.complete })
        })
        .catch(() => {
          this.setState({ status: apiStatus.errored });
        })
    }

    render() {
      const { status, data } = this.state;

      return (
        <Component {...this.props} loading={status === apiStatus.loading} data={data} error={status === apiStatus.error} />
      )
    }
  }
}

export default withApiCallOnMount;