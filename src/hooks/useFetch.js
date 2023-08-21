import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, keyData) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(`${url}${keyData}`);
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
    } 
  };

  useEffect(() => {
    getData();
  }, [url, keyData]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetch;
