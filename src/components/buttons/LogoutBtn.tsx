import { useCommonState } from "../../hooks/useCommonState";
import { useUserDataContext } from "../../hooks/useUserData";

const LogoutBtn = () => {
  const { setUserData } = useUserDataContext();
  const { navigate } = useCommonState();

  const logout = () => {
    setUserData(null);
    localStorage.removeItem("user");
    navigate("/login");
  };
  return <button onClick={logout}>Logout</button>;
};

export default LogoutBtn;
