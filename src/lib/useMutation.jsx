import { useState } from "react";
import { BASE_URL, getLocalStorage, TOKEN } from "../server";

const useMutation = ({ url, method }) => {
  const [value, setValue] = useState({
    data: undefined,
    isLoading: false,
    error: undefined,
  });
  const mutation = async (data) => {
    try {
      const token = getLocalStorage({ name: TOKEN });
      setValue((prev) => ({ ...prev, isLoading: true }));
      const response = await (
        await fetch(`${BASE_URL}/${url}`, {
          method: method.toUpperCase(),
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token ? token : null}`,
          },
        })
      ).json();
      if (response.message) {
        setValue((prev) => ({ ...prev, error: response.message }));
      }
      setValue((prev) => ({ ...prev, data: response }));
    } catch (error) {
      setValue((prev) => ({ ...prev, error }));
    } finally {
      setValue((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return [mutation, { ...value }];
};
export default useMutation;
