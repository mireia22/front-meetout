import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Asistant } from "../types/Types";

const ListOfAssistants = () => {
  const [loading, setIsLoading] = useState(false);
  const { eventId } = useParams();
  const [asistants, setAssistants] = useState<Asistant[]>([]);
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    setError("");
    try {
      setIsLoading(true);

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
        setEvent(fetchedData.eventTitle);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const countAsistants = (asistants: Asistant[]) => {
    return asistants ? asistants.length : 0;
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <article>
      <ul className="asistants-list">
        {asistants ? (
          <>
            <h4>
              Asistants {event}: {countAsistants(asistants)}
            </h4>
            {asistants.map((assistant) => (
              <li key={assistant._id} className="asistant">
                {assistant.name}
              </li>
            ))}
          </>
        ) : (
          error && <p>🚫{error}</p>
        )}
      </ul>
    </article>
  );
};

export default ListOfAssistants;
