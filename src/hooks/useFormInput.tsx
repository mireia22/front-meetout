import { useState, ChangeEvent } from "react";

export const useFormInput = <T extends Record<string, string | null>>(
  initialState: T
) => {
  const [formState, setFormState] = useState<T>(initialState);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return { formState, handleInputChange, setFormState };
};
