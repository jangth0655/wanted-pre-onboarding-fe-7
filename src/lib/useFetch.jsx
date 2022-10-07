import { useEffect, useState } from "react";
import { BASE_URL, getLocalStorage, TOKEN } from "../server";

const useFetch = ({ url }) => {
  const [response, setResponse] = useState({
    data: [],
    isLoading: false,
    error: "",
  });

  const fetchTodoList = async (url) => {
    const token = getLocalStorage({ name: TOKEN });
    try {
      setResponse((prev) => ({ ...prev, isLoading: true }));
      const results = await (
        await fetch(`${BASE_URL}/${url}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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
