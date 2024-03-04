import { Link } from "react-router-dom";
import "./RenderEvents.css";
import { Event, UserDataWithToken } from "../../../types/Types";
import EventInfo from "../../molecules/EventInfo/EventInfo";
interface RenderEventsProps {
  defaultEvents: Event[];
  events: Event[];
  userData: UserDataWithToken | null;
}

const RenderEvents: React.FC<RenderEventsProps> = ({
  defaultEvents,
  events,
  userData,
}) => {
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
        <h3>No events yet.</h3>
      )}
      {defaultEvents && defaultEvents.length > 0 && (
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
            {defaultEvents.map((event) => (
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

export default RenderEvents;
