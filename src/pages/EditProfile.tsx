import { useState } from "react";
import { useUserDataContext } from "../hooks/useUserData";
import { useCommonState } from "../hooks/useCommonState";
import UserForm from "../components/organisms/forms/UserForm";
import { useFormInput } from "../hooks/useFormInput";

const EditProfile = () => {
  const {
    formState: localUserData,
    setFormState,
    handleInputChange,
  } = useFormInput({
    title: "",
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState<File | null>(null);

  const { error, setError, loading, setLoading, navigate } = useCommonState();
  const { userData } = useUserDataContext();
  const token = userData?.token;

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
      setFormState(updatedUser);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Edit Profile:</h2>
      <UserForm
        loading={loading}
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
