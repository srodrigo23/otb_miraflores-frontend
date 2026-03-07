import { useState } from "react";

const useFetchData = (url: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const execute = async (options?: RequestInit) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      setData(json);
      return json;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, execute };
};

export default useFetchData;