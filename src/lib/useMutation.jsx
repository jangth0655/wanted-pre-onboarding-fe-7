import { useState } from "react";
import { BASE_URL } from "../server";

const useMutation = ({ url, token }) => {
  const [value, setValue] = useState({ data: "", isLoading: false, error: "" });
  const mutation = async (data) => {
    try {
      setValue((prev) => ({ ...prev, isLoading: true }));
      const response = await (
        await fetch(`${BASE_URL}/${url}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? token : null,
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
