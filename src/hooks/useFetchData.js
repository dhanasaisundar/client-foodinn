import { useState, useEffect } from "react";

function useFetchData(apiFunction) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const responseData = await apiFunction();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [apiFunction]);

  return [data, isLoading];
}

export default useFetchData;
