import { useEffect, useState } from "react";
import { BASE_URL, getLocalStorage, TOKEN_NAME } from "../server";

const useFetch = ({ url }) => {
  const [response, setResponse] = useState({
    data: undefined,
    isLoading: false,
    error: undefined,
  });

  const fetchTodoList = async (url) => {
    const token = getLocalStorage({ name: TOKEN_NAME });
    try {
      setResponse((prev) => ({ ...prev, isLoading: true }));
      const results = await (
        await fetch(`${BASE_URL}/${url}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token ? token : null}`,
          },
        })
      ).json();
      if (results) setResponse((prev) => ({ ...prev, data: results }));
    } catch (error) {
      setResponse((prev) => ({ ...prev, error }));
      return;
    } finally {
      setResponse((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchTodoList(url);
  }, [url]);

  return {
    data: response.data,
    isLoading: response.isLoading,
    error: response.error,
  };
};
export default useFetch;
