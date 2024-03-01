import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useEventDataContext } from "../hooks/useEventData";
import EventInfo from "./EventInfo";
import exampleEvents from "../constants/seed";
import { Link } from "react-router-dom";
import { useUserDataContext } from "../hooks/useUserData";

const AllEvents: React.FC = () => {
  const { events, setEvents } = useEventDataContext();
  const [exEvents, setExEvents] = useState(exampleEvents);
  const [loading, setLoading] = useState(false);
  const { userData } = useUserDataContext();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events`);
        const fetchedEvents = await response.json();

        if (fetchedEvents.length === 0) {
          setExEvents(exampleEvents);
        } else {
          setEvents(fetchedEvents);
          setExEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      setLoading(false);
    };
    fetchEvents();
  }, [setEvents]);

  if (loading) {
    return <Loader />;
  }

  return (
    <article>
      {events && events.length > 0 ? (
        <ul className="all-events">
          {events.map((event) => (
            <li key={event._id}>
              <EventInfo event={event} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="example-div">
          <h3>These are fake events.</h3>
          <p>
            If you want to experience the full functionality and see real
            events, we encourage you to join and create your own events.
          </p>
          {userData?.token ? (
            <Link to="/create-event" className="welcome-link">
              Create Event
            </Link>
          ) : (
            <Link to="/register" className="welcome-link">
              Click here to register
            </Link>
          )}
          <ul className="all-events">
            {exampleEvents.map((event) => (
              <li key={event._id} className="example-events">
                <EventInfo event={event} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};

export default AllEvents;
