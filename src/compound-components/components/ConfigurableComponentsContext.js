import React from "react";

export const ConfigurableComponentsContext = React.createContext({
  configurableComponents: {},
  setConfigurableComponents: (configurableComponents) => {},
  loading: false,
  setLoading: (loading) => {},
  error: null,
  setError: (error) => {},
});
