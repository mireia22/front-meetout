import { useEffect } from "react";
import { useUserDataContext } from "../../../hooks/useUserData";
import { useParams } from "react-router-dom";
import { useCommonState } from "../../../hooks/useCommonState";
import Loader from "../../atoms/Loader";
import { useFormInput } from "../../../hooks/useFormInput";

const InscriptionForm = () => {
  const { userData } = useUserDataContext();
  const { eventId } = useParams();
  const { formState: asistantData, handleInputChange } = useFormInput({
    name: "",
    email: "",
  });
  console.log("current user", userData);
  const token = userData?.token;
  const { error, setError, loading, setLoading, navigate } = useCommonState();

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
    <form onSubmit={makeInscription}>
      <article>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={asistantData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={asistantData.email}
            onChange={handleInputChange}
          />
        </div>
      </article>

      {error && <p>🚫 {error}</p>}
      <button>{loading ? <Loader /> : "Inscribe"}</button>
    </form>
  );
};

export default InscriptionForm;
