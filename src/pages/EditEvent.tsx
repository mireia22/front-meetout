import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useUserDataContext } from "../hooks/useUserData";
import EventForm from "../components/organisms/forms/EventForm";
import { useCommonState } from "../hooks/useCommonState";
import { useFormInput } from "../hooks/useFormInput";

const EditEvent = () => {
  const {
    formState: event,
    setFormState,
    handleInputChange,
  } = useFormInput({
    title: "",
    date: "",
    sport: "",
    difficulty: "",
    ubication: "",
  });
  const [eventImage, setEventImage] = useState<File | null>();
  const { userData } = useUserDataContext();
  const { error, setError, loading, setLoading, navigate } = useCommonState();

  const token = userData?.token;
  const { eventId } = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const editEvent = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("title", event.title);
        formData.append("date", event.date);
        formData.append("ubication", event.ubication);
        formData.append("sport", event.sport);
        formData.append("difficulty", event.difficulty);
        if (eventImage) {
          formData.append("eventImage", eventImage);
        }
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/events/${eventId}`,
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
          console.log("error", errorData.message);
          setError(errorData.message);
        }

        const updatedEvent = await response.json();
        if (!updatedEvent) {
          throw new Error("Server response is empty.");
        }

        setLoading(false);
        setFormState((prevEventData) => ({
          ...prevEventData,
          ...updatedEvent,
        }));

        navigate("/");
      } catch (err) {
        console.log(error);
      }
    },
    [event, eventImage, eventId]
  );

  const deleteEvent = useCallback(async () => {
    setError("");
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        navigate("/");
      }
      setLoading(false);
    } catch (err) {
      console.log(error);
    }
  }, [eventId]);

  return (
    <section>
      <h2>Edit:</h2>
      <EventForm
        event={event}
        onFormSubmit={editEvent}
        deleteEvent={deleteEvent}
        handleInputChange={handleInputChange}
        error={error}
        loading={loading}
        setEventImage={setEventImage}
      />
    </section>
  );
};

export default EditEvent;
