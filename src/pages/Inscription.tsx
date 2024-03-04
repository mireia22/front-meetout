import { useParams } from "react-router-dom";
import InscriptionForm from "../components/organisms/forms/InscriptionForm";
import { useUserDataContext } from "../hooks/useUserData";
import { useFormInput } from "../hooks/useFormInput";
import { useEffect } from "react";
import { useCommonState } from "../hooks/useCommonState";

const Inscription: React.FC = () => {
  const { userData } = useUserDataContext();
  const { eventId } = useParams();
  const { formState: asistantData, handleInputChange } = useFormInput({
    name: "",
    email: "",
  });
  console.log("current user", userData);
  const token = userData?.token;
  const { setError, setLoading, navigate, error, loading } = useCommonState();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const makeInscription = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/events/${eventId}/inscription`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(asistantData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log("error", errorData.message);
        setError(errorData.message);
      } else {
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <h2>Make inscription:</h2>
      <InscriptionForm
        handleInputChange={handleInputChange}
        handleSubmit={makeInscription}
        data={asistantData}
        error={error}
        loading={loading}
      />
    </section>
  );
};

export default Inscription;
