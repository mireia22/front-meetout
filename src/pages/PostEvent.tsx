import { useEffect, useState } from "react";
import EventForm from "../components/organisms/forms/EventForm";
import { useUserDataContext } from "../hooks/useUserData";
import { useCommonState } from "../hooks/useCommonState";
import { useFormInput } from "../hooks/useFormInput";

const PostEvent = () => {
  const {
    formState: event,
    handleInputChange,
    setFormState,
  } = useFormInput({
    title: "",
    date: "",
    sport: "",
    difficulty: "",
    ubication: "",
  });
  const [eventImage, setEventImage] = useState<File | null>(null);
  const { userData } = useUserDataContext();
  const { error, setError, loading, setLoading, navigate } = useCommonState();

  const token = userData?.token;

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const postEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);

      const formData = new FormData();
      const { title, date, ubication, sport, difficulty } = event;
      formData.append("title", title);
      formData.append("date", date);
      formData.append("ubication", ubication);
      formData.append("sport", sport);
      formData.append("difficulty", difficulty);
      if (eventImage) {
        formData.append("eventImage", eventImage);
      }
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        const eventData = await response.json();
        setFormState(eventData);
        navigate("/");
      }
      setLoading(false);
    } catch (err) {
      console.log(error);
    }
  };
  return (
    <section>
      <h2>Create event:</h2>
      <EventForm
        onFormSubmit={postEvent}
        event={event}
        handleInputChange={handleInputChange}
        error={error}
        loading={loading}
        setEventImage={(file: File | null) => setEventImage(file)}
      />
    </section>
  );
};

export default PostEvent;
