import React from "react";
import { LoginFormUserData } from "../../../types/Types";
import Loader from "../../atoms/Loader/Loader";

interface LoginFormProps {
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  loading?: boolean;
  userData?: LoginFormUserData;
  setFileInput?: (file: File | null) => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  buttonText?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onFormSubmit,
  error,
  userData,
  handleInputChange,
  loading,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <article>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData?.email || ""}
            onChange={handleInputChange}
          />
        </div>
      </article>
      <article>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData?.password || ""}
            onChange={handleInputChange}
          />
        </div>
      </article>
      {error && <p>🚫 {error}</p>}
      <button type="submit">{loading ? <Loader /> : "Login"}</button>
    </form>
  );
};

export default LoginForm;
