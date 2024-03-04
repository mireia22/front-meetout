import { Link } from "react-router-dom";
import UserForm from "../components/organisms/forms/UserForm";
import { useState } from "react";
import { useCommonState } from "../hooks/useCommonState";
import { useFormInput } from "../hooks/useFormInput";
import { useUserDataContext } from "../hooks/useUserData";
interface LocalUserData {
  [key: string]: string | null;
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { setUserData } = useUserDataContext();
  const { formState: localUserData, handleInputChange } =
    useFormInput<LocalUserData>({
      name: "",
      email: "",
      password: "",
    });
  const [avatar, setAvatar] = useState<File | null>(null);
  const { error, setError, loading, setLoading, navigate } = useCommonState();

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(localUserData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value as string);
        }
      });

      if (avatar !== null) {
        formData.append("avatar", avatar);
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        const { token, user } = await response.json();
        localStorage.setItem("token", token);
        setUserData((prevUserData) => ({
          ...prevUserData,
          user,
          token,
        }));
        navigate("/");
      }
      setLoading(false);
    } catch (err) {
      console.log(error);
    }
  };
  return (
    <section>
      <h2>Register:</h2>
      <UserForm
        onFormSubmit={registerUser}
        error={error}
        userData={localUserData}
        setFileInput={(file: File | null) => setAvatar(file)}
        handleInputChange={handleInputChange}
        loading={loading}
        buttonText="Register"
      />
      <small>
        Already have an account?
        <Link to="/login" className="login">
          Login
        </Link>
      </small>
    </section>
  );
};

export default Register;
