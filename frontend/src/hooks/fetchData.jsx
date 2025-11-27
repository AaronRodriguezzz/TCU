import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url, page = null, limit = null, deps = []) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if(!url) return 
    
    const fetchData = async () => {
      try {

        setLoading(true);
        const result = await axios.get(`http://localhost:4001/api${url}`, { params: { page, limit } });        
        
        if (isMounted) setResponse(result?.data || []);

      } catch (err) {
        if (isMounted) setError(err.message || "Failed to fetch");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false; // cleanup
    };
  }, [url, page, limit, ...deps]);

  return { response, loading, error, setResponse };
};