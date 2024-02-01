import { useEffect, useState } from "react";

export const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true)
  
        try {
          const response  = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result  = await response.json();
          setData(result);
        } catch(error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
  
      fetchData();
    }, [url]);
  
    return { isLoading, data, error }
  }