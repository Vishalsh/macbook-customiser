import { useState, useEffect } from "react";

const useApiCallOnMount = (service) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    service()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [service]);

  return [loading, data, error];
};

export default useApiCallOnMount;