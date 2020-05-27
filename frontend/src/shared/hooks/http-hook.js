import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use `useRef` to store data across re-render cycle
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    setIsLoading(true);
    // API supported in modern browsers
    const httpAbortCtrl = new AbortController();
    // `Current` holds the array that doesn't change across re-render cycles
    activeHttpRequests.current.push(httpAbortCtrl);

    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        // Add `signal` to link `httpAbortCtrl` to this request
        signal: httpAbortCtrl.signal
      });

      const responseData = await response.json();

      // Remove the completed abortCtrl from the array of abortControllers if a request completes (we have a response)
      activeHttpRequests.current = activeHttpRequests.current.filter(
        (reqCtrl) => reqCtrl !== httpAbortCtrl
      );

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      return responseData;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  // Cleanup function executed for the time `useEffect` runs again or when the component that uses this hook un-mounts
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
