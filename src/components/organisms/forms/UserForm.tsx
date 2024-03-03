import React from "react";
import { UserData } from "../../../types/Types";
import InputFile from "../../atoms/InputFile";
import Loader from "../../atoms/Loader";

interface UserFormProps {
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  loading?: boolean;
  userData?: UserData;
  setFileInput?: (file: File | null) => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  buttonText?: string;
}

const UserForm: React.FC<UserFormProps> = ({
  onFormSubmit,
  error,
  userData,
  setFileInput,
  handleInputChange,
  buttonText,
  loading,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <article>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={userData?.name || ""}
            onChange={handleInputChange}
          />
        </div>

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
        {setFileInput && (
          <div>
            <InputFile
              onChange={(file: File | null) => setFileInput(file)}
              inputName={"Choose Avatar 📂"}
            />
          </div>
        )}
      </article>
      {error && <p>🚫 {error}</p>}
      <button type="submit">{loading ? <Loader /> : buttonText}</button>
    </form>
  );
};

export default UserForm;
