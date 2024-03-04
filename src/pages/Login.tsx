import { Link } from "react-router-dom";
import LoginForm from "../components/organisms/forms/LoginForm";
import { useFormInput } from "../hooks/useFormInput";
import { useCommonState } from "../hooks/useCommonState";
import { useUserDataContext } from "../hooks/useUserData";

const Login: React.FC = () => {
  const { setUserData } = useUserDataContext();
  const { formState: formUserData, handleInputChange } = useFormInput({
    email: "",
    password: "",
  });
  const { error, setError, loading, setLoading, navigate } = useCommonState();

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify(formUserData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        const loggedUser = await response.json();
        setUserData((prevUserData) => ({
          ...prevUserData,
          user: loggedUser.user,
          token: loggedUser.token,
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
      <h2>Login:</h2>
      <LoginForm
        onFormSubmit={loginUser}
        error={error}
        userData={formUserData}
        handleInputChange={handleInputChange}
        loading={loading}
      />
      <small>
        Don't you have an account?
        <Link to="/register" className="register">
          Register
        </Link>
      </small>
    </section>
  );
};

export default Login;
