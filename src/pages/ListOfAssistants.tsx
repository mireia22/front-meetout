import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Asistant } from "../types/Types";
import { useCommonState } from "../hooks/useCommonState";
import { useUserDataContext } from "../hooks/useUserData";
import Loader from "../components/atoms/Loader/Loader";
import EventAssistants from "../components/molecules/EventAssistants/EventAssistants";

const ListOfAssistants = () => {
  const { userData } = useUserDataContext();
  const { eventId } = useParams();
  const [asistants, setAssistants] = useState<Asistant[]>([]);
  const { error, setError, loading, setLoading } = useCommonState();

  const fetchAssistants = async () => {
    setError("");
    try {
      setLoading(true);

      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/events/${eventId?.toString()}/asistants`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("error", errorData.message);
        setError(errorData.message);
        return;
      }

      const fetchedData = await response.json();
      console.log("fetched data", fetchedData);

      if (fetchedData.message === "Success") {
        setAssistants(fetchedData.asistants);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssistants();
  }, []);

  if (loading) {
    return <Loader position="page" />;
  }
  return (
    <EventAssistants
      asistants={asistants}
      user={userData?.user}
      error={error}
    />
  );
};

export default ListOfAssistants;
