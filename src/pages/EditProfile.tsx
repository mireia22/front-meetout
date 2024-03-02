import { useState } from "react";
import Loader from "../components/Loader";
import UserForm from "../components/forms/UserForm";
import { useUserDataContext } from "../hooks/useUserData";
import { UserData } from "../types/Types";
import { useCommonState } from "../hooks/useCommonState";

const EditProfile = () => {
  const [localUserData, setLocalUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const { error, setError, loading, setLoading, navigate } = useCommonState();
  const { userData } = useUserDataContext();
  const token = userData?.token;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLocalUserData((prevState) => {
      const newValue = e.target.value !== null ? e.target.value : "";
      return { ...prevState, [e.target.name]: newValue };
    });
  };

  const editUser = async (e: React.FormEvent<HTMLFormElement>) => {
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
        `${import.meta.env.VITE_BASE_URL}/users/edit`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        setLoading(false);
        return;
      }

      const updatedUser = await response.json();

      if (!updatedUser) {
        throw new Error("Server response is empty.");
      }

      setLoading(false);
      setLocalUserData(updatedUser);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <section>
      <h2>Edit Profile:</h2>
      <UserForm
        onFormSubmit={editUser}
        error={error}
        userData={localUserData}
        setFileInput={(file: File | null) => setAvatar(file)}
        handleInputChange={handleInputChange}
        buttonText="Edit"
      />
    </section>
  );
};

export default EditProfile;
